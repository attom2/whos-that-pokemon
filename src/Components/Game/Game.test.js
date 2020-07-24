import React from 'react'
import Game from './Game'
import { render, getByAltText } from '@testing-library/react'
import 'jest-environment-jsdom-sixteen'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'
import { getAllPokemon, getSinglePokemon } from '../../ApiCalls'

jest.mock('../../ApiCalls')

describe('Game', () => {
  it('should be true', () => {
    expect(true).toEqual(true)
      })

  it('should render the game page', () => {
    const{ debug, getByAltText } = render(
      <BrowserRouter>
      <Game
      pokemons= {[
        {
          "name": "bulbasaur",
          "url": "https://pokeapi.co/api/v2/pokemon/1/"
        }, {
          "name": "ivysaur",
          "url": "https://pokeapi.co/api/v2/pokemon/2/"
        }, {
          "name": "venusaur",
          "url": "https://pokeapi.co/api/v2/pokemon/3/"
        }, {
          "name": "charmander",
          "url": "https://pokeapi.co/api/v2/pokemon/4/"
        }
      ]}
      get4RdmPokemon={ jest.fn() }
      />
      </BrowserRouter>
    )
    const gamePage = getByAltText("game-section")

    expect(gamePage).toBeInTheDocument()
  })
})
