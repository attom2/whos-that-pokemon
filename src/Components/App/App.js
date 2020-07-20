import React from 'react';
import './App.css';
import {getAllPokemon} from '../../ApiCalls'

function App() {
  getAllPokemon();
  return (
    <main className="App">
      Hello World
    </main>
  );
}

export default App;
