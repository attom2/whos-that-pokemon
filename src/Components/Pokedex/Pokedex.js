import React, { useContext, useState } from 'react';
import PokeDetails from '../PokeDetails/PokeDetails';
import './Pokedex.scss';
import { AppContext } from '../../AppContext';
import Select from 'react-select';

const Pokedex = ({ allPokemon, fetchSinglePokemon}) => {
  const { singlePokemon, setSinglePokemon } = useContext(AppContext);
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
    const singlePokemon = fetchSinglePokemon(selectedOption.value);
    setSinglePokemon(singlePokemon);
  };

  return (
    <section className="pokedex-outline">
      <section className="pokedex-screen">
        <Select
          onChange={displaySinglePokemon}
          options={createPokeList()}
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
          <div className="d-pad bottom"></div>
        </div>
        <div className="control-buttons">
          <div className="buttons">B</div>
          <div className="buttons">A</div>
        </div>
      </div>
    </section>
  );
};

export default Pokedex;
