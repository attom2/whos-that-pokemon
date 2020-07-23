import React, { useEffect, useState } from 'react';
import './App.css';
import Header from '../Header/Header';
import Game from '../Game/Game';
import {getAllPokemon} from '../../ApiCalls';
import { Route } from 'react-router-dom';
import Pokedex from '../Pokedex/Pokedex';


const App = () => {
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const allPokemon = await getAllPokemon();
        setAllPokemon(allPokemon);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllPokemon();
  }, []);

  const get4RdmPokemon = () => {
    const pokemons = [{}, {}, {}, {}]
    let randomIndexes = []
    while(randomIndexes.length <= 4) {
      let randNum = Math.floor(Math.random() * allPokemon.length);
      if (randomIndexes.indexOf(randNum) === -1) randomIndexes.push(randNum);
    }
    return pokemons.map((emptySlot,i) => {
      const randomIndex = randomIndexes[i]
      return allPokemon[randomIndex];
    })
  };

  return (
    <main className="App">
      <Header />
      {allPokemon.length && <Route
        exact
        path="/game"
        render={() => (
          <Game get4RdmPokemon={get4RdmPokemon} pokemons={get4RdmPokemon()}/>
        )}
      />}
      <Route path='/pokedex' render={() => <Pokedex allPokemon={allPokemon}/>}/>
    </main>
  );
}

export default App;
