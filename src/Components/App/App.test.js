import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { getAllPokemon, getSinglePokemon } from '../../ApiCalls'
import { singlePokemonMockData} from './Pokemon-Mock-Data';
import { act } from 'react-dom/test-utils';

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
        "name": "charmeleon",
        "url": "https://pokeapi.co/api/v2/pokemon/5/"
  }])

  getSinglePokemon.mockResolvedValue(singlePokemonMockData)

  it('should render the app header', () => {
    
    const { debug, getByRole, getByText, getAllByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(getByRole('heading', { name: "Who's That Pokémon?" })).toBeInTheDocument();
  });

  it.skip('should be able to navigate to /game', () => {
    const { debug, getByRole, getByText, getAllByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    debug();
    const gameNav = getAllByRole('listitem')[1]
    fireEvent.click(gameNav);
    debug();
  });

  it('should be able to navigate to /pokedex', () => {
    const { debug, getByRole, getByText, getAllByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const pokeNav = getAllByRole('listitem')[0]
    fireEvent.click(pokeNav);
    const aButton = getByText('A');
    const bButton = getByText('B');
    expect(aButton).toBeInTheDocument();
    expect(bButton).toBeInTheDocument();
  });

  it.skip('should be able to navigate to /game', () => {

    //Trying to replicate the docs, found at https://reactjs.org/docs/test-utils.html
    let container;
    act(() => {
      ReactDOM.render(<App />, container);
    });
    console.log(container)
  })

});
