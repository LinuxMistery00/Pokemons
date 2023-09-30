import React, { useEffect, useState } from "react";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [nextPageUrl, setNextPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");

  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(nextPageUrl);
        const data = await response.json();
        setPokemonList((prevList) => [...prevList, ...data.results]);
        setNextPageUrl(data.next);
      } catch (error) {
        console.error("Erro ao buscar lista de Pokémon:", error);
      }
    };

    fetchPokemonList();
  }, [nextPageUrl]);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (selectedPokemon) {
        try {
          const response = await fetch(selectedPokemon.url);
          const data = await response.json();
          setPokemonDetails(data);
        } catch (error) {
          console.error("Erro ao buscar detalhes do Pokémon:", error);
        }
      }
    };

    fetchPokemonDetails();
  }, [selectedPokemon]);

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div>
      <h1>Lista de Pokémon</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index} onClick={() => handlePokemonClick(pokemon)}>
            {pokemon.name}
          </li>
        ))}
      </ul>
      {pokemonDetails && (
        <div className="pokemon-detail">
          <h2>{pokemonDetails.name}</h2>
          <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
          <p>ID: {pokemonDetails.id}</p>
          <p>Tipo(s): {pokemonDetails.types.map((type) => type.type.name).join(", ")}</p>
          {/* Adicione outras informações detalhadas do Pokémon conforme necessário */}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
