import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import Result from "./result";
import Pagination from "./Pagination";

function Search({ selectedTypes, setSelectedTypes}) {
  const [types, setTypes] = useState([]);
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [pokemons, setPokemon] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json"
      );
      setTypes(result.data.map((type) => type.english));
    }
    fetchData();
  }, []);

    const handleChange = (event) => {
        const {value, checked} = event.target;
        if (checked) {
            setSelectedTypes([...selectedTypes, value]);
        } else {
            setSelectedTypes(selectedTypes.filter((type) => type !== value));
        }
    };

  return (
    <div>
      {types.map((type) => (
        <div key = {type}>
          <input type="checkbox" value={type} id={type} onChange={handleChange}/>
          <label htmlFor={type}>{type}</label>
        </div>
      ))}
      <Result 
        selectedTypes={selectedTypes}
        page={page}
        PAGE_SIZE={PAGE_SIZE}
        setPage={setPage}
      />
    </div>
  );
}

export default Search;
