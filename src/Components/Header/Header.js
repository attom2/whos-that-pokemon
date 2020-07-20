import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header>
      <h1>Who's that Pokemon</h1>
      <NavLink to='/pokedex'>
        <button> Pokedex </button>
      </NavLink>
      <NavLink to='/game'>
        <button>Game</button>
      </NavLink>
    </header>
  )
}

export default Header;
