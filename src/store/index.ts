export * from './store';
export {
  startLoadingPokemon,
  setPokemons,
  getPokemonsPerPage,
  filterPokemonsByName,
  setAllTypePokemons,
  filterPokemonsByType
} from "./slices/pokemon/pokemonSlice";
export { getPokemons, getAllTypesPokemons } from "./slices/pokemon/thunks";
