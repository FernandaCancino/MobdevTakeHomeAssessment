import { SimplePokemon } from "../interfaces/pokemon-response";
import { PokemonCard } from "./PokemonCard";

interface IPokemonGrid {
  pokemons: SimplePokemon[];
}

export const PokemonGrid = ({ pokemons }: IPokemonGrid) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 bg-gray-100  p-3 m-2 rounded">
      {
        pokemons.length === 0 
        ? "No hay Pokemons disponibles :("
        : pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))
      }
    </div>
  )
}