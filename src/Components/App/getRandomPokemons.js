export const getRandomPokemons = (allPokemon) => {
  const pokemons = [{}, {}, {}, {}];
  let randomIndexes = [];
  while (randomIndexes.length <= 4) {
    let randNum = Math.floor(Math.random() * allPokemon.length);
    if (randomIndexes.indexOf(randNum) === -1) randomIndexes.push(randNum);
  }
  return pokemons.map((emptySlot, i) => {
    const randomIndex = randomIndexes[i];
    return allPokemon[randomIndex];
  });
};