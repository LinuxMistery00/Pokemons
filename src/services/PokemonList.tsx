import React, { useEffect, useState } from 'react';
import styles from './styles.module.css'

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
};

function PokemonList() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // Obtém os primeiros 151 Pokémon
      .then((response) => response.json())
      .then((data) => {
        const results = data.results;
        const promises = results.map((result: { url: string }) =>
          fetch(result.url).then((response) => response.json())
        );

        Promise.all(promises)
          .then((data: Pokemon[]) => {
            setPokemonData(data);
            setIsLoading(false);
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 className={styles.Title}>Pokémons:</h1>
      <div className={styles.Pokemons}>
        {pokemonData.map((pokemon, index) => (
          <div key={index} className={styles.Pokemon}>
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className={styles.PokemonSprite}
            />
            <div className={styles.PokemonInfo}>
              <h2 className={styles.PokemonName}>{pokemon.name}</h2>
              {/* Adicione mais informações aqui conforme necessário */}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.Final}>
          <img className={styles.PokeAPIImg} src="pokeapi_256.3fa72200.png" alt="" />
      </div>
    </div>
  );
}

export default PokemonList;
