import React, { useEffect, useState } from 'react';

const Game = ({answer: {name, url} } ) => {

  const [singlePokemon, setSinglePokemon] = useState({});

  useEffect(() => {
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
  console.log(singlePokemon.sprites)
  return (
    <>
      {/* <h1 styles="font-family:'Pokemon Hollow Normal';font-weight:normal;font-size:42px"> Who's That Pokemon</h1> */}
      <h1> Who's that pokemon Game</h1>
      <section>
        <input></input>
        <button>SUBMIT</button>

      <h2>{`${name}`} </h2>
      </section>
      { singlePokemon.sprites && <img src={`${singlePokemon.sprites.front_default}`} alt="pokemon"/> }
    </>
  )
}

export default Game;
