import React from "react";
import "./style.css";

function Pagination({ page, setPage, PAGE_SIZE, selectedTypes, pokemons }) {
  const filteredPokemons = pokemons.filter(pokemon =>
    selectedTypes.every(type => pokemon.type.includes(type))
  );
  const lastPage = Math.ceil(filteredPokemons.length / PAGE_SIZE);

  const handlePrevious = () => {
    setPage(Math.max(page - 1, 1));
  };
  const handleNext = () => {
    setPage(Math.min(page + 1, lastPage));
  };
  return (
    <div>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
}

export default Pagination;
