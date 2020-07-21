import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header>
      {/* <h1 styles="font-family:'Pokemon Hollow Normal';font-weight:normal;font-size:42px"> Who's That Pokemon</h1> */}
      <h1> Who's That Pokemon</h1>

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
