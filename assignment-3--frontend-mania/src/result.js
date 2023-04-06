import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

function Result({ selectedTypes, page, PAGE_SIZE, setPage }) {
  const [pokemons, setPokemon] = useState([]);
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

  // filter the pokemons based on the selected types
  const filteredPokemons = useMemo(() => {
    if (selectedTypes.length === 0) {
      return [];
    }
    return pokemons.filter((pokemon) =>
      selectedTypes.every((type) => pokemon.type.includes(type))
    );
  }, [selectedTypes, pokemons]);

  // get the firstpage of the filtered pokemons
  const displayedPokemons = useMemo(() => {
    return filteredPokemons.slice(startIndex, endIndex);
  }, [filteredPokemons, startIndex, endIndex]);

  if (selectedTypes.length === 0) {
    return null;
  }

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
      <Pagination 
       page={page}
       setPage={setPage}
       PAGE_SIZE={PAGE_SIZE}
       selectedTypes={selectedTypes}
       pokemons={pokemons}
      />

    </div>
  );
}

export default Result;
