import React from 'react';
import './App.css';
import Header from '../Header/Header'
import {getAllPokemon} from '../../ApiCalls'

function App() {
  getAllPokemon();
  return (
    <main className="App">
      <Header />
    </main>
  );
}

export default App;
