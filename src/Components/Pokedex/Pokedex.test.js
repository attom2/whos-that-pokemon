import React from 'react';
import Pokedex from './Pokedex';
import App from '../App/App';
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import { getAllPokemon, getSinglePokemon } from '../../ApiCalls';

jest.mock('../../ApiCalls');

getAllPokemon.mockResolvedValue([
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
    "name": "charmeleon",
    "url": "https://pokeapi.co/api/v2/pokemon/5/",
    isFavorite: false
  },
  {
    "name": "squirtle",
    "url": "https://pokeapi.co/api/v2/pokemon/7/",
    isFavorite: false
  },
  {
    "name": "wartortle",
    "url": "https://pokeapi.co/api/v2/pokemon/8/",
    isFavorite: false
  }
]);

const mockVenusaur = {
  name: "venusaur",
  id: 2,
  height: 20,
  weight: 1000,
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png",
    back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/3.png",
    front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/3.png"
  },
  types: [
    {
      slot: 1,
      type: {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/"
      }
    },
    {
      slot: 2,
      type: {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/"
      }
    }
  ]

};

const mockCharmander = {
  name: "charmander",
  height: 6,
  weight: 85,
  id: 3,
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
};

describe("Pokedex component", () => {
  it('should navigate to from App and display a select menu', async () => {
    const { findByText, getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const pokeNav = await findByText('Pokedex');
    fireEvent.click(pokeNav);
    const pokeSelect = getByRole('textbox', {name : "combobox"});
    expect(pokeSelect).toBeInTheDocument();
  });
});

describe("User interactions through Pokedex", () => {

  getSinglePokemon.mockResolvedValueOnce(mockVenusaur);

  it("should allow user to pick and display different pokemon's info", async () => {
    const { getByRole, findByText, findByRole, findAllByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>);

    const pokeNav = await findByText('Pokedex');
    fireEvent.click(pokeNav);
    const pokeSelect = getByRole('textbox', {name:'combobox'});

    expect(pokeSelect).toBeInTheDocument();

    fireEvent.click(pokeSelect);
    fireEvent.keyDown(pokeSelect, {key: 'ArrowDown', code:'ArrowDown'});
    fireEvent.keyDown(pokeSelect, {key: 'ArrowDown', code:'ArrowDown'});
    fireEvent.keyDown(pokeSelect, {key: 'Enter', code:'Enter'});

    expect(getSinglePokemon).toHaveBeenCalledTimes(1);
    expect(getSinglePokemon).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/3/");

    let pokemonSprites = await findAllByRole('img', {name: 'venusaur'});
    let pokemonName = await findByRole('heading', {name: 'venusaur'});
    let pokemonHeight = await findByText('2m');
    let pokemonWeight = await findByText('100kg');
    let pokemonType = await findByText('grass poison');

    expect(pokemonSprites).toHaveLength(2);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonHeight).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();

    getSinglePokemon.mockResolvedValueOnce(mockCharmander);

    fireEvent.click(pokeSelect);
    fireEvent.keyDown(pokeSelect, {key: 'ArrowDown', code:'ArrowDown'});
    fireEvent.keyDown(pokeSelect, {key: 'ArrowDown', code:'ArrowDown'});
    fireEvent.keyDown(pokeSelect, {key: 'ArrowDown', code:'ArrowDown'});
    fireEvent.keyDown(pokeSelect, {key: 'Enter', code:'Enter'});

    expect(getSinglePokemon).toHaveBeenCalledTimes(2);
    expect(getSinglePokemon).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/4/");

    pokemonSprites = await findAllByRole('img', {name: 'charmander'});
    pokemonName = await findByRole('heading', {name: 'charmander'});
    pokemonHeight = await findByText('0.6m');
    pokemonWeight = await findByText('8.5kg');
    pokemonType = await findByText('fire');

    expect(pokemonSprites).toHaveLength(2);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonHeight).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
  });
});
