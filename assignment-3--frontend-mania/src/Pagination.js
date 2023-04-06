import React from "react";
import "./style.css";

function Pagination({ page, setPage, PAGE_SIZE, selectedTypes, pokemons }) {
  // Filter the pokemons based on selected types
  const filteredPokemons = selectedTypes.length > 0 
    ? pokemons.filter(pokemon => selectedTypes.every(type => pokemon.type.includes(type))) 
    : pokemons;

  // Calculate the number of pages based on the filtered pokemons
  const lastPage = Math.ceil(filteredPokemons.length / PAGE_SIZE);

  // Handle going to the next page
  const goToNextPage = () => {
    setPage((page) => Math.min(page + 1, lastPage));
  };

  // Handle going to the previous page
  const goToPreviousPage = () => {
    setPage((page) => Math.max(page - 1, 1));
  };

  // Handle changing to a specific page
  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  // Generate an array of page numbers to display as buttons
  const pageNumbers = Array.from(Array(lastPage).keys()).map((i) => i + 1);

  return (
    <div className="pagination">
      <button onClick={goToPreviousPage} disabled={page === 1}>
        {"<"}
      </button>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => changePage(pageNumber)}
          className={`pagination-item ${page === pageNumber ? "active" : null}`}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={goToNextPage} disabled={page === lastPage}>
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
