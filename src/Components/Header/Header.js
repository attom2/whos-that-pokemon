import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'


const Header = () => {
  return (
    <header className="nav-header">
      <input type="checkbox" id="overlay-input" />
      <label for="overlay-input" id="overlay-button"><span></span></label>
      <div id="overlay">
        <ul>
          <NavLink to='/pokedex'>
            <li> Pokedex </li>
          </NavLink>
          <NavLink to='/game'>
            <li>Game</li>
          </NavLink>
        </ul>
      </div>
      <h1 className="pokemon-title">Who's That Pokémon?</h1>
    </header>
  )
}

export default Header;
