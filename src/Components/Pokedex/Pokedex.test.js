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
  height: 20,
  weight: 1000,
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

describe.skip("User interactions through Pokedex", () => {

  getSinglePokemon.mockResolvedValueOnce({
    name: "venusaur",
    height: 20,
    weight: 1000,
    sprites: {
      front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
    }
  });

  it("should pick and display different pokemon's info", async () => {
    const { getByRole, findByRole } = render(
      <MemoryRouter>
        <Pokedex allPokemon={pokemonList}/>
      </MemoryRouter>);

    const pokemonMenu = getByRole('combobox', {name:'Pokemon List'});

    act(() => {
      userEvent.selectOptions(pokemonMenu, "https://pokeapi.co/api/v2/pokemon/3/");
    });

    expect(await pokemonMenu.value).toEqual("https://pokeapi.co/api/v2/pokemon/3/");
    expect(getSinglePokemon).toHaveBeenCalledTimes(1);
    expect(getSinglePokemon).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/3/");

    let pokemonImg = await findByRole('img', {name: 'venusaur'});
    let pokemonName = await findByRole('heading', {name: 'venusaur'});
    let pokemonHeight = await findByRole('heading', {name: 'Height: 2m'});
    let pokemonWeight = await findByRole('heading', {name: 'Weight: 100kg'});

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonHeight).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();

    getSinglePokemon.mockResolvedValueOnce({
      name: "charmeleon",
      height: 11,
      weight: 190,
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
      }
    });

    act(() => {
      userEvent.selectOptions(pokemonMenu, "https://pokeapi.co/api/v2/pokemon/5/");
    });

    expect(await pokemonMenu.value).toEqual("https://pokeapi.co/api/v2/pokemon/5/");
    expect(getSinglePokemon).toHaveBeenCalledTimes(2);
    expect(getSinglePokemon).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/5/");

    pokemonImg = await findByRole('img', {name: 'charmeleon'});
    pokemonName = await findByRole('heading', {name: 'charmeleon'});
    pokemonHeight = await findByRole('heading', {name: 'Height: 1.1m'});
    pokemonWeight = await findByRole('heading', {name: 'Weight: 19kg'});

    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonHeight).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
