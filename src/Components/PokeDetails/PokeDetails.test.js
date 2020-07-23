import React from 'react'
import PokeDetails from './PokeDetails'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Pokedex from '../Pokedex/Pokedex'

describe('PokeDetails', () => {
  it('should render the pokemons name', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Pokedex />
        <PokeDetails
        image = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png"
        name='Machop'
        />
      </MemoryRouter>
    )

    const linkElement = getByText(/Machop/i)
    expect(linkElement).toBeInTheDocument()
  })



    it('should render the pokemons image', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter>
        <Pokedex />
        <PokeDetails
        image= "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png"
        name='Machop'
        />
      </MemoryRouter>
    )

    const pokeImage = getByRole('img')
    expect(pokeImage).toBeInTheDocument()
  })
})