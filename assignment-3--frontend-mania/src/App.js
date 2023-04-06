import Login from "./Login";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [pokemons, setPokemon] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
      );
      setPokemon(result.data);
    }
    fetchData();
  }, []);

  return (
   <>
    <Login />
   </>
  );
}

export default App;
