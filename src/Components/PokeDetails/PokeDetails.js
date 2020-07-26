import React from 'react';
import './PokeDetails.scss';

const PokeDetails = ({details}) => {
  const pokemonName = details.name;
  const pokeFrontImage = details.sprites.front_default;
  return (
    <figure>
      <img
        className='pokemon-pic'
        src={pokeFrontImage}
        alt={pokemonName}
      />
      <figcaption>
        <h4>{pokemonName}</h4>
        <h4>Height: {Math.round(parseInt(details.height)*10)/100}m</h4>
        <h4>Weight: {Math.round(parseInt(details.weight)*10)/100}kg</h4>
      </figcaption>
    </figure>
  );
};

export default PokeDetails;
