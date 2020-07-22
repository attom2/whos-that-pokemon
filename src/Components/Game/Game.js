import React, { useEffect, useState } from 'react';
import './Game.css'

const Game = ({pokemons}) => {
  const [singlePokemon, setSinglePokemon] = useState({});

  const createOptionList = () => {
    return pokemons.map(( pokemon, index ) => {
      return (
        <li key={index}>
          {pokemon.name}
        </li>
      )
    })
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

  }, []);

  return (
    <>
      {/* <h1 styles="font-family:'Pokemon Hollow Normal';font-weight:normal;font-size:42px"> Who's That Pokemon</h1> */}
      <h1> Who's that pokemon Game</h1>
      <section>
        <input></input>
        <button>SUBMIT</button>
      {singlePokemon.sprites && (
        <>
        <h2>{`${singlePokemon.forms[0].name}`} </h2>
        <img className="single-pokemon"
          src={`${singlePokemon.sprites.front_default}`}
          alt="pokemon"
        />
        <ul className="choices">
          {createOptionList()} 
        </ul>
        </>)
        }

      </section>
    </>
  )
}

export default Game;
