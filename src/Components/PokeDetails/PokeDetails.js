import React, {useContext} from 'react';
import {AppContext} from '../../AppContext';
import './PokeDetails.scss';
import pokeball from '../../assets/icons8-pokeball-100.png';

const PokeDetails = ({details, isShiny}) => {
  const { sprites, name, types } = details;
  const { front_default, back_default, front_shiny, back_shiny } = sprites;
  const pokemonType = types.map(poke => poke.type.name + '\n');
  const { allPokemon, singlePokemon } = useContext(AppContext);

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
        {allPokemon[singlePokemon.id - 1].isFavorite &&
          <img
            src={pokeball}
            alt='A Pokeball. This pokemon is favorited'
          />
        }
      </figcaption>
    </figure>
  );
};

export default PokeDetails;
