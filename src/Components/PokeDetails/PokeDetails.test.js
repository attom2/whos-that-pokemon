import React from 'react'
import PokeDetails from './PokeDetails'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

describe('PokeDetails', () => {
  it('should render the pokemons name', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PokeDetails
        details = {{
            name: 'Machop',
            sprites: {
              front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png"
            }
          }}
        />
      </MemoryRouter>
    )

    const linkElement = getByText(/Machop/i)
    expect(linkElement).toBeInTheDocument()
  })



    it('should render the pokemons image', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <PokeDetails
        details = {{
            name: 'Machop',
            sprites: {
              front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/66.png"
            }
          }}
        />
      </MemoryRouter>
    )

    const linkElement = getByRole('img')
    expect(linkElement).toBeInTheDocument()
  })
})
