import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header'
import Game from '../Game/Game'
import {getAllPokemon} from '../../ApiCalls'
import { Route } from 'react-router-dom';

const App = () => {
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const allPokemon = await getAllPokemon();
        setAllPokemon(allPokemon)
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllPokemon();
  }, []);

  const get4RdmPokemon = () => {
    const pokemons = [{}, {}, {}, {}]
    return pokemons.map(emptySlot => {
      const randomIndex = Math.floor(Math.random() * allPokemon.length)
      return allPokemon[randomIndex]
    })
  };

  return (
    <main className="App">
      <Header />
      {allPokemon.length && <Route
        exact
        path="/game"
        render={() => (
          <Game pokemons={get4RdmPokemon()}/>
        )}
      />}
    </main>
  );
}

export default App;
