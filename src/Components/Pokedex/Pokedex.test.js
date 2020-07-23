import React from 'react';
import Pokedex from './Pokedex';
import { render, act } from "@testing-library/react";
import {MemoryRouter} from 'react-router-dom';
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import {getSinglePokemon} from '../../ApiCalls';

jest.mock('../../ApiCalls')

const pokemonList = [
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
    "name": "charmeleon",
    "url": "https://pokeapi.co/api/v2/pokemon/5/"
  },
  {
    "name": "squirtle",
    "url": "https://pokeapi.co/api/v2/pokemon/7/"
  },
  {
    "name": "wartortle",
    "url": "https://pokeapi.co/api/v2/pokemon/8/"
  }
]

describe("Pokedex component", () => {
  it('should have a select menu', () => {
    const { getByRole, getAllByRole } = render(
      <MemoryRouter>
        <Pokedex allPokemon={pokemonList}/>
      </MemoryRouter>)

    const pokemonMenu = getByRole('combobox', {name:'Pokemon List'})
    const pokemonListOptions = getAllByRole('option')

    expect(pokemonMenu).toBeInTheDocument();
    expect(pokemonListOptions.length).toEqual(6)
  })
})

describe("User interactions through Pokedex", () => {

  getSinglePokemon.mockResolvedValueOnce({
      name: "venusaur",
      height: 20,
      weight: 1000,
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
      }
    })

  it("should pick and display different pokemon's info", async () => {
    const { getByRole, findByRole } = render(
      <MemoryRouter>
        <Pokedex allPokemon={pokemonList}/>
      </MemoryRouter>)

    const pokemonMenu = getByRole('combobox', {name:'Pokemon List'})

    act(() => {
      userEvent.selectOptions(pokemonMenu, "https://pokeapi.co/api/v2/pokemon/3/")
    })

    expect(await pokemonMenu.value).toEqual("https://pokeapi.co/api/v2/pokemon/3/")
    expect(getSinglePokemon).toHaveBeenCalledTimes(1)
    expect(getSinglePokemon).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/3/")

    let pokemonImg = await findByRole('img', {name: 'venusaur'});
    let pokemonName = await findByRole('heading', {name: 'venusaur'})
    let pokemonHeight = await findByRole('heading', {name: 'Height: 2m'})
    let pokemonWeight = await findByRole('heading', {name: 'Weight: 100kg'})

    expect(pokemonImg).toBeInTheDocument()
    expect(pokemonName).toBeInTheDocument()
    expect(pokemonHeight).toBeInTheDocument()
    expect(pokemonWeight).toBeInTheDocument()

    getSinglePokemon.mockResolvedValueOnce({
      name: "charmeleon",
      height: 11,
      weight: 190,
      sprites: {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
      }
    })

    act(() => {
      userEvent.selectOptions(pokemonMenu, "https://pokeapi.co/api/v2/pokemon/5/")
    })

    expect(await pokemonMenu.value).toEqual("https://pokeapi.co/api/v2/pokemon/5/")
    expect(getSinglePokemon).toHaveBeenCalledTimes(2)
    expect(getSinglePokemon).toHaveBeenCalledWith("https://pokeapi.co/api/v2/pokemon/5/")

    pokemonImg = await findByRole('img', {name: 'charmeleon'});
    pokemonName = await findByRole('heading', {name: 'charmeleon'})
    pokemonHeight = await findByRole('heading', {name: 'Height: 1.1m'})
    pokemonWeight = await findByRole('heading', {name: 'Weight: 19kg'})

    expect(pokemonImg).toBeInTheDocument()
    expect(pokemonName).toBeInTheDocument()
    expect(pokemonHeight).toBeInTheDocument()
    expect(pokemonWeight).toBeInTheDocument()
  })
})
