import React, { useEffect, useState } from 'react';
import './App.scss';
import { getRandomPokemons } from './getRandomPokemons';
import Header from '../Header/Header';
import Game from '../Game/Game';
import Pokedex from '../Pokedex/Pokedex';
import { getAllPokemon, getSinglePokemon} from '../../ApiCalls';
import { Route } from 'react-router-dom';
import { AppContext } from '../../AppContext';

const App = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [singlePokemon, setSinglePokemon] = useState({});

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const allPokemon = await getAllPokemon();
        const modifiedPokemonInfo = allPokemon.map((pokemon, index) => {
          return ({
            ...pokemon,
            id: index + 1,
            isFavorite: false,
            hint: ''
          });
        });
        setAllPokemon(modifiedPokemonInfo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPokemon();
  }, []);

  const fetchSinglePokemon = async (url) => {
    try {
      const singlePokemon = await getSinglePokemon(url);
      setSinglePokemon(singlePokemon);
    } catch (error) {
      console.log(error);
    }
  };

  // const getRandomPokemons = () => {
  //   const pokemons = [{}, {}, {}, {}];
  //   let randomIndexes = [];
  //   while (randomIndexes.length <= 4) {
  //     let randNum = Math.floor(Math.random() * allPokemon.length);
  //     if (randomIndexes.indexOf(randNum) === -1) randomIndexes.push(randNum);
  //   }
  //   return pokemons.map((emptySlot, i) => {
  //     const randomIndex = randomIndexes[i];
  //     return allPokemon[randomIndex];
  //   });
  // };

  const togglePokemonFavoriteStatus = (pokemonId) => {
    const pokemonInfoModifier = (updatedPokemons, pokemon) => {
      if (pokemon.id !== pokemonId) {
        updatedPokemons = [...updatedPokemons, pokemon];
      } else {
        pokemon.isFavorite = !pokemon.isFavorite;
        updatedPokemons = [...updatedPokemons, pokemon];
      }
      return updatedPokemons;
    };

    const newPokemonInfo = allPokemon.reduce(pokemonInfoModifier, []);
    setAllPokemon(newPokemonInfo);
  };

  return (
    <main className="App">
      <Header />
      <AppContext.Provider
        value={{
          singlePokemon,
          setSinglePokemon,
          allPokemon,
          setAllPokemon
        }}
      >
        {allPokemon.length && <Route
          exact
          path="/game"
          render={() => (
            <Game
              getRandomPokemons={getRandomPokemons}
              fetchSinglePokemon={fetchSinglePokemon}
              allPokemon={allPokemon}
            />
          )}
        />}
        <Route path='/pokedex'
          render={() =>
            <Pokedex
              allPokemon={allPokemon}
              singlePokemon={singlePokemon}
              setSinglePokemon={setSinglePokemon}
              fetchSinglePokemon={fetchSinglePokemon}
              togglePokemonFavoriteStatus={togglePokemonFavoriteStatus}
            />}
        />
      </AppContext.Provider>
    </main>
  );
};

export default App;
