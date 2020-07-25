import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'


const Header = () => {
  return (
    <header className="nav-header">
      <h1 className="pokemon-title">Who's That Pokémon?</h1>
      <nav>
        <ul>
          <NavLink to='/pokedex'>
          <li>
            <button className="pokedex-link">
              Pokedex
            </button>
          </li>
          </NavLink>
          <NavLink to='/game'>
          <li>
            <button className="game-link">
              Game
            </button>
          </li>
          </NavLink>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
