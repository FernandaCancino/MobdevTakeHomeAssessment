import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { startLoadingPokemon, setPokemons, setAllTypePokemons } from './pokemonSlice'
import { SimplePokemon, PokemonsResponse, Result } from "../../../pokemons/interfaces/pokemon-response";

const API_POKEMON = 'https://pokeapi.co/api/v2';

export const getPokemonsWithTypes = async (limit: number = 151): Promise<SimplePokemon[]> => {
  try {
    const response = await fetch(`${API_POKEMON}/pokemon?limit=${limit}`);
    const data = await response.json();

    const pokemons: SimplePokemon[] = await Promise.all(
      data.results.map(async (pokemon: { url: string }) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        const types = pokemonData.types.map((type: { type: { name: string } }) => type.type.name);
        
        return {
          id: pokemonData.id.toString(),
          name: pokemonData.name,
          types,
        };
      })
    );

    return pokemons;

  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    return [];
  }
};

export const getPokemons = (pokemonsPerPage = 18) => {
  return async (dispatch: Dispatch<UnknownAction>) => {
    dispatch(startLoadingPokemon());
    
    const pokemons: SimplePokemon[] = await getPokemonsWithTypes();
    const newTotalPages = Math.ceil(pokemons.length / pokemonsPerPage) || 0;

    dispatch(setPokemons({
      allPokemons: pokemons,
      page: 1,
      totalPages: newTotalPages,
    }));
  }
}

export const getAllTypesPokemons = () => {
  return async (dispatch: Dispatch<UnknownAction>) => {

    const resp = await fetch(`${API_POKEMON}/type`);
    const data: PokemonsResponse = await resp.json();

    const allTypes = data.results.map((value: Result) => ({
      id: value.url.split('/').at(-2)!,
      name: value.name
    }))

    dispatch(setAllTypePokemons({
      allTypesPokemons: allTypes,
    }));
  }
}
