import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { getAllPokemon, getSinglePokemon } from '../../ApiCalls';

jest.mock("../../ApiCalls");

describe('App', () => {
  getAllPokemon.mockResolvedValue( [
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
      "name": "ivysaur",
      "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
      "name": "venusaur",
      "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/4/"
    },
    {
      "name": "bulbasaur",
      "url": "https://pokeapi.co/api/v2/pokemon/5/"
    }]);

  getSinglePokemon.mockResolvedValue({
    name: "charmander",
    height: 20,
    weight: 1000,
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
    }
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


  it('should be able to navigate to /game', async () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const singlePokemon = await waitFor(() => getByRole('heading', {name: 'charmander'}));
    expect(singlePokemon).toBeInTheDocument();
  });

  it('should have 4 pokemon choices buttons when navigating to /game', async () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const pokemonChoices = await waitFor(() => getAllByRole('button'));
    expect(pokemonChoices.length).toBe(4);
  });

  it('should start with a winning streak of 0, add 1 if the correct answer is selected, and reset to 0 if wrong answer selected', async () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const winningStreak = await waitFor(() => getByRole('heading', {name: "Winning streak: 0"}));
    expect(winningStreak).toBeInTheDocument();

  
    const winningBtn = await waitFor(() => getByRole('button', {name: "charmander"}));
    fireEvent.click(winningBtn);
    const winningStreak2 = await waitFor(() => getByRole('heading', { name: "Winning streak: 1" }));
    expect(winningStreak2).toBeInTheDocument();

    const losingBtn = await waitFor(() => getByRole('button', { name: "ivysaur" })) || await waitFor(() => getByRole('button', { name: "venusaur" }));
    fireEvent.click(losingBtn);
    const winningStreakLost = await waitFor(() => getByRole('heading', { name: "Winning streak: 0" }));
    expect(winningStreakLost).toBeInTheDocument();

  });

  it('should start with a winning streak of 0 and stay at 0 if wrong answer selected', async () => {
    const { getByRole, getByText, debug } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const winningStreak = await waitFor(() => getByRole('heading', { name: "Winning streak: 0" }));
    expect(winningStreak).toBeInTheDocument();

    const losingBtn = await waitFor(() => getByRole('button', { name: "ivysaur" })) || await waitFor(() => getByRole('button', { name: "venusaur" }));
    fireEvent.click(losingBtn);
    const winningStreakLost = await waitFor(() => getByRole('heading', { name: "Winning streak: 0" }));
    expect(winningStreakLost).toBeInTheDocument();

  });

  it('should be able navigating to /game and from there to /pokedex', async () => {
    const { getByText, getAllByRole, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game');
    fireEvent.click(gameNav);
    const pokemonChoices = await waitFor(() => getAllByRole('button'));
    expect(pokemonChoices.length).toBe(4);

    const pokeNav = await waitFor(() => getByText('Pokedex'));
    fireEvent.click(pokeNav);
    const pokeSelect = getByRole('combobox', { name: "Pokemon List" });
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
    const pokeSelect = getByRole('combobox', {name: "Pokemon List"});

    expect(aButton).toBeInTheDocument();
    expect(bButton).toBeInTheDocument();
    expect(pokeSelect).toBeInTheDocument();

  });

});
