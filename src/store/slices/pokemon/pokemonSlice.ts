import { createSlice } from '@reduxjs/toolkit';
import { WritableDraft } from 'immer';
import { nextPage, prevPage } from './functions';
import { SimplePokemon, TypesPokemon } from '../../../pokemons/interfaces/pokemon-response';

interface IInitialState {
  allPokemons: SimplePokemon[];
  allTypesPokemons: TypesPokemon[];
  filteredPokemons: SimplePokemon[];
  isLoading: boolean;
  leakedPokemonName: string;
  page: number;
  pokemonsByType: SimplePokemon[];
  pokemonsPerPage: number;
  pokemonsToShow: SimplePokemon[];
  selectedType: string;
  totalPages: number;
};

const initialState: IInitialState = {
  allPokemons: [],
  allTypesPokemons: [],
  filteredPokemons: [],
  isLoading: false,
  leakedPokemonName: "",
  page: 0,
  pokemonsByType: [],
  pokemonsPerPage: 20,
  pokemonsToShow: [],
  selectedType: '',
  totalPages: 0,
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: initialState,
  reducers: {
    startLoadingPokemon: (state, /* action */) => {
      state.isLoading = true;
    },
    setPokemons: (state: WritableDraft<IInitialState>, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.pokemonsToShow = action.payload.allPokemons.slice(0, state.pokemonsPerPage);
      state.totalPages = action.payload.totalPages;
      state.allPokemons = action.payload.allPokemons;
    },
    getPokemonsPerPage: (state: WritableDraft<IInitialState>, action) => {
      const { isPrev } = action.payload;

      if (state.selectedType !== "" || state.leakedPokemonName !== "") {
        const { startSlice, endSlice, newPage } = isPrev
          ? prevPage(state.page, state.pokemonsPerPage)
          : nextPage(state.page, state.totalPages, state.pokemonsPerPage);

        const pokemonsNewPage = state.filteredPokemons.slice(startSlice, endSlice)
        state.pokemonsToShow = pokemonsNewPage;
        state.page = newPage;

      } else {
        const { startSlice, endSlice, newPage } = isPrev
          ? prevPage(state.page, state.pokemonsPerPage)
          : nextPage(state.page, state.totalPages, state.pokemonsPerPage);

        const pokemonsNewPage = state.allPokemons.slice(startSlice, endSlice)
        state.pokemonsToShow = pokemonsNewPage;
        state.page = newPage;
      }

    },
    filterPokemonsByName: (state: WritableDraft<IInitialState>, action) => {
      const searchQuery = action.payload.name.toLowerCase();
      state.leakedPokemonName = action.payload.name.toLowerCase();

      if (searchQuery.length > 0) {
        const filteredPokemons = state.allPokemons.filter((pokemon: SimplePokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery)
        );

        state.filteredPokemons = filteredPokemons;

        state.pokemonsToShow = filteredPokemons.slice(0, state.pokemonsPerPage);
        state.totalPages = Math.ceil(filteredPokemons.length / state.pokemonsPerPage);
      } else {
        state.pokemonsToShow = state.allPokemons.slice(0, state.pokemonsPerPage);
        state.filteredPokemons = [];
      }
      state.page = 1;
    },

    setAllTypePokemons: (state: WritableDraft<IInitialState>, action) => {
      state.allTypesPokemons = action.payload.allTypesPokemons;
    },
    filterPokemonsByType: (state: WritableDraft<IInitialState>, action) => {
      const selectedType = action.payload.type;
      if (selectedType.toString().length > 0 && selectedType !== "Filter by type") {
        state.selectedType = selectedType;

        const filteredByType = state.allPokemons.filter((pokemon: SimplePokemon) =>
          pokemon.types.includes(selectedType)
        );

        state.filteredPokemons = filteredByType;

        state.pokemonsToShow = filteredByType.slice(0, state.pokemonsPerPage);
        state.totalPages = Math.ceil(filteredByType.length / state.pokemonsPerPage);
      } else {
        state.pokemonsToShow = state.allPokemons.slice(0, state.pokemonsPerPage);
        state.selectedType = "";
        state.filteredPokemons = [];
      }
      state.page = 1;
    },
  }
});

export const {
  startLoadingPokemon,
  setPokemons,
  getPokemonsPerPage,
  filterPokemonsByName,
  setAllTypePokemons,
  filterPokemonsByType,
} = pokemonSlice.actions;