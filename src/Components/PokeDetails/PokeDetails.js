import React, {useContext} from 'react';
import {AppContext} from '../../AppContext';
import './PokeDetails.scss';
import pokeball from '../../assets/icons8-pokeball-100.png';

const PokeDetails = ({details, isShiny}) => {
  const {sprites, name, types} = details;
  const {front_default, back_default, front_shiny, back_shiny} = sprites;
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
      <div className='stats-title'>
        {allPokemon[singlePokemon.id - 1].isFavorite &&
          <img
            className='pokeball-icon'
            src={pokeball}
            alt='A Pokeball. This pokemon is favorited'
          />
        }
        <h2>{name}</h2>
      </div>
      <figcaption>
        <p>
          <b>Height:</b><br/>{Math.round(parseInt(details.height)*10)/100}m
        </p>
        <p>
          <b>Weight:</b><br/>{Math.round(parseInt(details.weight)*10)/100}kg
        </p>
        <p>
          <b>Type:</b><br/>{pokemonType}
        </p>
      </figcaption>
    </figure>
  );
};

export default PokeDetails;
