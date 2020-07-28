import React, { useContext, useState } from 'react';
import PokeDetails from '../PokeDetails/PokeDetails';
import './Pokedex.scss';
import { AppContext } from '../../AppContext';
import Select from 'react-select';

const Pokedex = ({fetchSinglePokemon, addUserDetails}) => {
  const { singlePokemon, setSinglePokemon, allPokemon } = useContext(AppContext);
  const [isShiny, setIsShiny] = useState(false);

  const createPokeList = () => {
    const pokeList = allPokemon.map(pokemon => {
      return {
        label: pokemon.name,
        value: pokemon.url
      };
    });
    return pokeList;
  };


  const displaySinglePokemon = selectedOption => {
    const url = selectedOption.url || selectedOption.value;
    const singlePokemon = fetchSinglePokemon(url);
    setSinglePokemon(singlePokemon);
  };

  const getRandomPokemon = () => {
    const randomIndex = Math.floor(Math.random() * allPokemon.length);
    return allPokemon[randomIndex];
  };

  return (
    <section className= "gameboy-outer">
      <section className="pokedex-outline">
        <section className="pokedex-screen block">
          <Select
            onChange={displaySinglePokemon}
            options={createPokeList()}
            isSearchable="true"
          />
          {singlePokemon.name &&
        <PokeDetails
          details={singlePokemon}
          isShiny={isShiny}
        /> }
        </section>
        <div className="controller">
          <div className="d-pad-container">
            <div className="d-pad top" onClick={() => setIsShiny(shiny => !shiny)}></div>
            <div className="d-pad left"></div>
            <div className="d-pad middle"></div>
            <div className="d-pad right"></div>
            <div className="d-pad bottom"
              onClick={() => displaySinglePokemon(getRandomPokemon())}
            >
            </div>
          </div>
          <div className="control-buttons">
            <div className="buttons"
              onClick={() => {
                const pokemonIndex = singlePokemon.id - 1;
                const favoriteState = !allPokemon[pokemonIndex].isFavorite;
                addUserDetails('isFavorite', singlePokemon.id, favoriteState);
              }}
            >
            B
            </div>
            <div className="buttons">A</div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Pokedex;
