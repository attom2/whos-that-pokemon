import React from 'react';
import './PokeDetails.scss';

const PokeDetails = ({details, isShiny}) => {
  const {sprites, name, types} = details;
  console.log('details', details)
  const {front_default, back_default, front_shiny, back_shiny} = sprites;
  const pokemonType = types.map(poke => poke.type.name + '\n');
  return (
    <figure>
      <section className="img-container">
        <img
          className='pokemon-pic'
          src={isShiny ? front_shiny : front_default}
          alt={name}
        />
        <img
          className='pokemon-pic'
          src={isShiny ? back_shiny : back_default}
          alt={name}
        />
      </section>
      <h2>{name}</h2>
      <figcaption>
        <p>Height: {Math.round(parseInt(details.height)*10)/100}m</p>
        <p>Weight: {Math.round(parseInt(details.weight)*10)/100}kg</p>
        <p>Type: {pokemonType}</p>
      </figcaption>
    </figure>
  );
};

export default PokeDetails;
