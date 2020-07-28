import React from 'react';
import './PokeDetails.scss';

const PokeDetails = ({details, isShiny}) => {
  const {sprites, name, types} = details;
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
        <p><b>Height:</b> {Math.round(parseInt(details.height)*10)/100}m       </p>
        <p><b>Weight: </b>{Math.round(parseInt(details.weight)*10)/100}kg          </p>
        <p><b>Type: </b>{pokemonType}</p>
      </figcaption>
    </figure>
  );
};

export default PokeDetails;
