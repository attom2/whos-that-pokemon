import React, {useState} from 'react'

const PokeDetails = ({details}) => {
  const pokemonName = details.forms[0].name
  const pokeFrontImage = details.sprites.front_default
  return (
    <>
      <img src={pokeFrontImage} alt={pokemonName}/>
    </>
  )
}

export default PokeDetails;
