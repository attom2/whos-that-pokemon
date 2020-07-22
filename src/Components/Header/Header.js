import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
  return (
    <header className="nav-header">
      <h1 className="pokemon-title">Who's That Pokémon?</h1>
      <section className="btn-section">
      <NavLink to='/pokedex'>
        <button> Pokedex </button>
      </NavLink>
      <NavLink to='/game'>
        <button>Game</button>
      </NavLink>
      </section>
    </header>
  )
}

export default Header;
