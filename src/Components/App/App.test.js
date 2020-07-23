import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { getAllPokemon, getSinglePokemon } from '../../ApiCalls'
import { singlePokemonMockData} from './Pokemon-Mock-Data';
import { act } from 'react-dom/test-utils';
// import '@testing-library/jest-dom/extend-expect';


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


  it('should be able to navigate to /game', async () => {
    const { debug, getByRole, getByText, getAllByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game')
    fireEvent.click(gameNav);
    const singlePokemon = await waitFor(() => getByRole('heading', {name: 'charmander'}));
    expect(singlePokemon).toBeInTheDocument();
  });

  it('should start with a winning streak of 0, and add 1 if the correct answer is selected', async () => {
    const { debug, getByRole, getByText, getAllByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game')
    fireEvent.click(gameNav);
    const winningStreak = await waitFor(() => getByRole('heading', {name: "Winning streak: 0"}));
    debug();
    expect(winningStreak).toBeInTheDocument();

    //Still need to check if winning button (charmander) is clicked, should add 1 to win counter

  });

  it('should have 4 pokemon choices buttons when navigating to /game', async () => {
    const { debug, getByRole, getByText, getAllByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const gameNav = getByText('Game')
    fireEvent.click(gameNav);
    const pokemonChoices = await waitFor(() => getAllByRole('button'));
    debug();
    expect(pokemonChoices.length).toBe(4);
  });

  it('should be able to navigate to /pokedex', () => {

    const { debug, getByRole, getByText, getAllByRole, getByPlaceholderText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const pokeNav = getByText('Pokedex')

    fireEvent.click(pokeNav);
    const aButton = getByText('A');
    const bButton = getByText('B');
    //Test for to see if select is there
    expect(aButton).toBeInTheDocument();
    expect(bButton).toBeInTheDocument();
  });


});
