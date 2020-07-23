import React, { useState } from 'react'
import PokeDetails from '../PokeDetails/PokeDetails'
import './Pokedex.scss'

const Pokedex = ({allPokemon}) => {
  const [pokeDetails, setPokeDetails] = useState({})

  const createSelectMenu = () => {
    const pokeNames = allPokemon.map(poke => {
     return  <option value={poke.url}>{poke.name}</option>
    })
    return (
      <form className="poke-list">
        <select
          onChange={(event) => {displaySinglePokemon(event)}}>
          {pokeNames}
        </select>
      </form>
    )
  }

  const displaySinglePokemon = (event) => {
    fetchSinglePokemon(event.target.value)
  }


  const fetchSinglePokemon = async (url) => {
    try {
      const response = await fetch(url);
      const singlePokemon = await response.json()
      setPokeDetails(singlePokemon)
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <section className="pokedex-outline">
      <section className="pokedex-screen">
        {createSelectMenu()}
        {pokeDetails.forms && <PokeDetails details={pokeDetails}/> }
      </section>  
      <div class="controller">
        <div class="d-pad-container">
          <div class="d-pad top"></div>
          <div class="d-pad left"></div>
          <div class="d-pad middle"></div>
          <div class="d-pad right"></div>
          <div class="d-pad bottom"></div>
        </div>
        <div class="control-buttons">
          <div class="buttons">B</div>
          <div class="buttons">A</div>
        </div>
      </div>
    </section>
    )






}

export default Pokedex
