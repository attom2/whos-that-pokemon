import React, { useState } from 'react'
import PokeDetails from '../PokeDetails/PokeDetails'
import './Pokedex.scss'
import {getSinglePokemon} from '../../ApiCalls'

const Pokedex = ({allPokemon}) => {
  const [pokeDetails, setPokeDetails] = useState({})

  const createSelectMenu = () => {
    const pokeNames = allPokemon.map((poke, index) => {
     return  <option value={poke.url} key={index}>{poke.name}</option>
    })
    return (
      <select
        title="Pokemon List"
        onChange={(event) => {displaySinglePokemon(event)}}
      >
        {pokeNames}
      </select>
    )
  }

  const displaySinglePokemon = (event) => {
    fetchSinglePokemon(event.target.value)
  }


  const fetchSinglePokemon = async (url) => {
    try {
      const singlePokemon = await getSinglePokemon(url)
      setPokeDetails(singlePokemon)
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <section className="pokedex-outline">
      <section className="pokedex-screen">
        {createSelectMenu()}
        {pokeDetails.name && <PokeDetails details={pokeDetails}/> }
      </section>
      <div className="controller">
        <div className="d-pad-container">
          <div className="d-pad top"></div>
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
  )
}

export default Pokedex
