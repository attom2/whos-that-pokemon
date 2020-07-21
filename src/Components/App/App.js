import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header'
import Game from '../Game/Game'
import {getAllPokemon} from '../../ApiCalls'
import { Route } from 'react-router-dom';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  
  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const allPokemon = await getAllPokemon();
        console.log(allPokemon)
        setAllPokemon(allPokemon)
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllPokemon();
  }, [])

  console.log(allPokemon);
  return (
    <main className="App">
      <Header />
      <Route
        exact
        path="/game"
        render={() => (
          <Game />
        )}
      />
    </main>
  );
}

export default App;
