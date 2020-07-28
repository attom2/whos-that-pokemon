import React, { useEffect, useState, useContext } from 'react';
import './Game.scss';
import pokeSound from '../../assets/whos-that-pokemon_.mp3';
import wrongSound from '../../assets/EndCall3.mp3';
import { AppContext } from '../../AppContext';
import rightSound from '../../assets/HollowBellNotification.mp3';



const Game = ({ getRandomPokemons, fetchSinglePokemon, allPokemon}) => {
  const [winCounter, setWinCounter] = useState(0);
  const pokemons = getRandomPokemons(allPokemon);
  const [pokemonChoices, setPokemonChoices] = useState(pokemons);
  const wrongSoundObj = new Audio(wrongSound);
  const rightSoundObj = new Audio(rightSound);
  const [imageClassName, setImageClassName] = useState('single-pokemon');
  const [isWinner, setIsWinner] = useState(false);
  const { singlePokemon, bestCounter, setBestCounter } = useContext(AppContext);

  const createOptionList = () => {
    return pokemonChoices.map(( pokemon, index ) => {
      return (
        <button
          name="user-button"
          onClick={(event) => {
            checkForWin(event);
            togglePokemonDisplay();
          }}
          id={`${pokemon.name}`}
          className="pokemon-button"
          key={index}
          data-testid="pokemon-choice-button"
        >
          {pokemon.name}
        </button>
      );
    });
  };

  const checkForWin = (event) => {
    const winner = singlePokemon.name;

    if (winner === event.target.id && winCounter >= bestCounter) {
      setWinCounter(winCounter + 1);
      setBestCounter(winCounter + 1);
      localStorage.setItem('bestStreak', `${winCounter + 1}`);
      setIsWinner(true);
      rightSoundObj.play();
    } else if (winner === event.target.id) {
      setWinCounter(winCounter + 1);
      setIsWinner(true);
      rightSoundObj.play();
    } else {
      wrongSoundObj.play();
      setWinCounter(0);
      setIsWinner(false);
    }
  };


  const togglePokemonDisplay = () => {
    setImageClassName('single-pokemon visible');
    const turnDisplayOff = () => {
      setImageClassName('single-pokemon');
      setPokemonChoices(getRandomPokemons(allPokemon));
    };
    setTimeout(turnDisplayOff, 2100);
  };

  useEffect(() => {
    const {url} = pokemonChoices[Math.floor(Math.random() * pokemonChoices.length)];
    fetchSinglePokemon(url);
  }, [pokemonChoices]);

  return (
    <>

      <section className='pokedex-outline'>
        <section className="pokedex-screen-game" alt="game-section">
          {singlePokemon.sprites && (
            <>
              <section className="tile-holder">
                <div className="streak-tile">
                  <h4 className="tile-font">Winning Streak: {`${winCounter}`}</h4>
                </div>
                <div className="best-tile">
                  <h4 className="tile-font">Best Streak: {`${bestCounter}`}</h4>
                </div>
              </section>

              <img
                className={imageClassName}
                src={`${singlePokemon.sprites.front_default}`}
                alt="pokemon"
              />
              <section className="feedback-tile">
                {isWinner && imageClassName === "single-pokemon visible" && (
                  <h2> Correct! This is:</h2>
                )}
                {!isWinner && imageClassName === "single-pokemon visible" && (
                  <h2> Incorrect! This is:</h2>
                )}
                {imageClassName === "single-pokemon visible" && (
                  <h2>{singlePokemon.name}</h2>
                )}
              </section>
              {imageClassName !== "single-pokemon visible" &&
              <section alt="user-choices" className="choices">
                <section className="choices">{createOptionList()}</section>
              </section>}
            </>
          )}
          <audio src={pokeSound} autoPlay />
        </section>
        <div className="controller">
          <div className="d-pad-container">
            <div className="d-pad top"></div>
            <div className="d-pad left"></div>
            <div className="d-pad middle"></div>
            <div className="d-pad right"></div>
            <div className="d-pad bottom">
            </div>
          </div>
          <div className="control-buttons">
            <div className="buttons">B</div>
            <div className="buttons">A</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Game;
