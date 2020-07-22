import React, { useEffect, useState } from 'react';
import './Game.css'

const Game = ({pokemons}) => {
  const [singlePokemon, setSinglePokemon] = useState({});
  const [winCounter, setWinCounter] = useState(0);

  const createOptionList = () => {
    return pokemons.map(( pokemon, index ) => {
      return (
        <button onClick={(event) => checkForWin(event)} id={`${pokemon.name}`} className="pokemon-button" key={index}>
          {pokemon.name}
        </button>
      )
    })
  }
  const checkForWin = (event) => {
    const winner = singlePokemon.forms[0].name
    if(winner === event.target.id){
      setWinCounter(winCounter + 1)
    }
    
  }

  useEffect(() => {
    const {name, url} = pokemons[Math.floor(Math.random() * pokemons.length)]

    const fetchSinglePokemon = async () => {
      try {
        const response = await fetch(url);
        const singlePokemon = await response.json()
        setSinglePokemon(singlePokemon)
      } catch (error) {
        console.log(error);
      }
    }
    fetchSinglePokemon();

  }, [pokemons]);

  return (
    <>
      <section>
      {singlePokemon.sprites && (
        <>
        <h2>{`${singlePokemon.forms[0].name}`} </h2>
        <h4>{`${winCounter}`}</h4>
        <img className="single-pokemon"
          src={`${singlePokemon.sprites.front_default}`}
          alt="pokemon"
        />
        <section className="choices">
          {createOptionList()} 
        </section>
        </>)
        }

      </section>
    </>
  )
}

export default Game;
