import React, { useEffect, useState } from "react";
import axios from "axios";

function Result({ selectedTypes, page, PAGE_SIZE, setPage }) {
  const [pokemons, setPokemon] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  const x = (id) => {
    if (id < 10) {
      return "00";
    } else if (id < 100) {
      return "0";
    } else {
      return "";
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
      );
      setPokemon(result.data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedTypes.length === 0) {
      setDisplayedPokemons([]);
      return;
    }

    const filteredPokemons = pokemons.filter((pokemon) =>
      selectedTypes.every((type) => pokemon.type.includes(type))
    );

    const displayedPokemons = filteredPokemons.slice(startIndex, endIndex);

    setDisplayedPokemons(displayedPokemons);
  }, [selectedTypes, pokemons, startIndex, endIndex]);

  return (
    <div>
      {displayedPokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <h1>{pokemon.name.english}</h1>
          <img
            src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${x(
              pokemon.id
            )}${pokemon.id}.png`}
            alt={pokemon.name.english}
          />
        </div>
      ))}
      {displayedPokemons.length === 0 && <p>Select a type to see the Pokemons!!</p>}
    </div>
  );
}

export default Result;
