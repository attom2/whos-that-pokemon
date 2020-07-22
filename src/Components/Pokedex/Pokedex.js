import React from 'react'
import { useState } from 'react'

const Pokedex = ({allPokemon}) => {
  const [pokeDetails, setPokeDetails] = useState({})
  const pokeNames = allPokemon.map(poke => {
   return  <p data-url={poke.url} onClick={(event) => displaySinglePokemon(event)}>{poke.name}</p>
  })
  
  const displaySinglePokemon = (event) => {

    fetchSinglePokemon(event.target.dataset.url)

  }


  const fetchSinglePokemon = async (url) => {
    try {
      const response = await fetch(url);
      const singlePokemon = await response.json()
      setPokeDetails(singlePokemon)
      console.log(singlePokemon)
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <section>{pokeNames}</section>
    )

  
  



}

export default Pokedex