import React from 'react';
import './PokeDetails.scss';

const PokeDetails = ({details, isShiny}) => {
  const pokemonName = details.name;
  const pokemonType = details.types.map(poke => poke.type.name + '\n');
  const pokeFrontImage = details.sprites.front_default;
  const pokeBackImage = details.sprites.back_default;
  const pokeBackShiny = details.sprites.back_shiny;
  const pokeFrontShiny = details.sprites.front_shiny;
  console.log(details);
  return (
    <figure>
      <section className="img-container">
        <img
          className='pokemon-pic'
          src={isShiny ? pokeFrontShiny: pokeFrontImage}
          alt={pokemonName}
        />
        <img
          className='pokemon-pic'
          src={isShiny ? pokeBackShiny :pokeBackImage}
          alt={pokemonName}
        />
      </section>
      <h2>{pokemonName}</h2>
      <figcaption>
        <p>Height: {Math.round(parseInt(details.height)*10)/100}m</p>
        <p>Weight: {Math.round(parseInt(details.weight)*10)/100}kg</p>
        <p>Type: {pokemonType}</p>
      </figcaption>
    </figure>
  );
};

export default PokeDetails;
