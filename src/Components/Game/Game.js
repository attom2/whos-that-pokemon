import React, { useEffect, useState } from 'react';
import './Game.css'
import {getSinglePokemon} from '../../ApiCalls'
import pokeSound from '../../assets/whos-that-pokemon_.mp3'
import wrongSound from '../../assets/EndCall3.mp3'


const Game = ({ get4RdmPokemon}) => {
  const [singlePokemon, setSinglePokemon] = useState({});
  const [winCounter, setWinCounter] = useState(0);
  const pokemons = get4RdmPokemon();
  const [pokemonChoices, setPokemonChoices] = useState(pokemons);
  const [bestCounter, setBestCounter] = useState(0)
  const wrongSoundObj = new Audio(wrongSound)
  const [imageClassName, setImageClassName] = useState('single-pokemon')

  const createOptionList = () => {
    return pokemonChoices.map(( pokemon, index ) => {
      return (
        <button
          name="user-button"
          onClick={(event) => {
            checkForWin(event)
            togglePokemonDisplay()
            }
          }
          id={`${pokemon.name}`}
          className="pokemon-button"
          key={index}
        >
          {pokemon.name}
        </button>
      )
    })
  }

  const checkForWin = (event) => {
    const winner = singlePokemon.name;

    if(winner === event.target.id && winCounter >= bestCounter) {
      setWinCounter(winCounter + 1)
      setBestCounter(winCounter + 1)
    } else if (winner === event.target.id) {
      setWinCounter(winCounter + 1)
    } else {
      wrongSoundObj.play()
      setWinCounter(0)
    }
  }


  const togglePokemonDisplay = () => {
    setImageClassName('single-pokemon visible')
    const turnDisplayOff = () => {
      setImageClassName('single-pokemon')
      setPokemonChoices(get4RdmPokemon())
    }
    setTimeout(turnDisplayOff, 2000)
  }

  useEffect(() => {
    const {url} = pokemonChoices[Math.floor(Math.random() * pokemonChoices.length)];

    const fetchSinglePokemon = async () => {
      try {
        const singlePokemon = await getSinglePokemon(url)
        setSinglePokemon(singlePokemon)
      } catch (error) {
        console.log(error);
      }
    }
    fetchSinglePokemon();

  }, [pokemonChoices]);

  return (
    <>
      <section className='game-section' alt="game-section">
      {singlePokemon.sprites && (
        <>
        <section className='tile-holder'>
        <div className='streak-tile'>
        <h4 className='tile-font'>Winning Streak: {`${winCounter}`}</h4>
        </div>
        <div className='best-tile'>
      <h4 className='tile-font'>Best Streak: {`${bestCounter}`}</h4>
        </div>
        </section>
        <img
          className={imageClassName}
          src={`${singlePokemon.sprites.front_default}`}
          alt="pokemon"
        />
        <section alt='user-choices' className="choices">
        <section className="choices">
            {createOptionList()}
        </section>
        </section>
        </>)
        }
        <audio src={pokeSound}
        autoPlay />
       </section>
    </>
  )
}

export default Game;
