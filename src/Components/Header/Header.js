import React, {useState} from 'react'
import { NavLink } from 'react-router-dom'
import './Header.scss'


const Header = () => {
  const [location, setLocation] = useState("Who's That Pokémon?")

  return (
    <header className="nav-header">
      <h1 className="pokemon-title">{location}</h1>
      <nav>
        <ul>
          <NavLink
            activeStyle={{backgroundColor: 'black'}}
            to='/pokedex'
          >
          <li>
            <button
              className="pokedex-link"
              onClick={() => setLocation('Pokédex')}
            >
              Pokedex
            </button>
          </li>
          </NavLink>
          <NavLink
            activeStyle={{backgroundColor: 'black'}}
            to='/game'
          >
          <li>
            <button
              onClick={() => setLocation("Who's That Pokémon?")}
              className="game-link"
            >
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
