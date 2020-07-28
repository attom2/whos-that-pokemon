import React from 'react';
import { render, fireEvent, waitFor, findAllByTestId, findAllByRole } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { getAllPokemon, getSinglePokemon } from '../../ApiCalls';

jest.mock("../../ApiCalls");

describe('App', () => {
  window.HTMLMediaElement.prototype.play = () => { /* do nothing */ };

  getAllPokemon.mockResolvedValue( [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/",
      isFavorite: false
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/",
      isFavorite: false
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/",
      isFavorite: false
    },
    {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/4/",
      isFavorite: false
    },
    {
      "name": "charizard",
      "url": "https://pokeapi.co/api/v2/pokemon/5/",
      isFavorite: false
    }]);

  getSinglePokemon.mockResolvedValue({
    name: "charmander",
    height: 20,
    weight: 1000,
    id: 4,
    sprites: {
      back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png",
      back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/4.png",
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
      front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/4.png"
    },
    types: [
      {
        slot: 1,
        type: {
          name: "fire",
          url: "https://pokeapi.co/api/v2/type/10/"
        }
      }
    ]
  });



  it('should render the app header', async () => {

    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const title = await waitFor(() => getByRole('heading', { name: "Who's That Pokémon?" }));
    expect(title).toBeInTheDocument();

  });


  it('should be able to navigate to /game and see charmander button', async () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const singlePokemon = await waitFor(() => getByRole('button', {name: 'charmander'}));
    expect(singlePokemon).toBeInTheDocument();
  });

  it('should have pokemon choices buttons when navigating to /game', async () => {
    const { getByText, findAllByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const pokemonChoices = await findAllByTestId('pokemon-choice-button');
    expect(pokemonChoices.length).toBe(4);
  });

  it.skip('should start with a winning streak of 0, add 1 if the correct, and reset to 0 if wrong', async () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const winningStreak = await waitFor(() => getByText("Winning Streak: 0"));
    expect(winningStreak).toBeInTheDocument();


    const winningBtn = await waitFor(() => getByRole('button', {name: "charmander"}));
    fireEvent.click(winningBtn);
    const winningStreak2 = await waitFor(() => getByText("Winning Streak: 1"));
    expect(winningStreak2).toBeInTheDocument();

    const losingBtn = await waitFor(() => getByRole('button', { name: "ivysaur" }));
    fireEvent.click(losingBtn);
    const winningStreakLost = await waitFor(() => getByText("Winning Streak: 0"));
    expect(winningStreakLost).toBeInTheDocument();

  });

  it('should start with a winning streak of 0 and stay at 0 if wrong answer selected', async () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const winningStreak = await waitFor(() => getByText("Winning Streak: 0"));
    expect(winningStreak).toBeInTheDocument();

    const losingBtn = await waitFor(() => getByRole('button', { name: "ivysaur" }));
    fireEvent.click(losingBtn);
    const winningStreakLost = await waitFor(() => getByText("Winning Streak: 0"));
    expect(winningStreakLost).toBeInTheDocument();

  });

  it('should be able navigating to /game and from there to /pokedex', async () => {
    const { getByText, findAllByTestId, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const pokemonChoices = await findAllByTestId('pokemon-choice-button');
    expect(pokemonChoices.length).toBe(4);

    const pokeNav = await waitFor(() => getByText('Pokedex'));
    fireEvent.click(pokeNav);
    const pokeSelect = await waitFor(() => getByRole('textbox', { name: "combobox" }));
    expect(pokeSelect).toBeInTheDocument();

  });

  it('should be able to navigate to /pokedex', async () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const pokeNav = await waitFor(() => getByText('Pokedex'));
    fireEvent.click(pokeNav);
    const aButton = getByText('A');
    const bButton = getByText('B');
    const pokeSelect = getByRole('textbox', {name : "combobox"});
    expect(pokeSelect).toBeInTheDocument();
    expect(aButton).toBeInTheDocument();
    expect(bButton).toBeInTheDocument();

  });

  it('should be able to navigate to /pokedex and select a new pokemon to view', async () => {
    const { getByText, getByRole, debug } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const pokeNav = await waitFor(() => getByText('Pokedex'));
    fireEvent.click(pokeNav);
    const aButton = getByText('A');
    const bButton = getByText('B');
    const pokeSelect = getByRole('textbox', {name : "combobox"});
    expect(pokeSelect).toBeInTheDocument();
    expect(aButton).toBeInTheDocument();
    expect(bButton).toBeInTheDocument();

    fireEvent.change(pokeSelect, { target: { value: 'charmander' } });

    const singlePokemon = await waitFor(() => getByRole("img", {name: 'charmander'}));
    debug();
    expect(singlePokemon).toBeInTheDocument();

  });

});
