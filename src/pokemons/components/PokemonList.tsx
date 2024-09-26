import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PokemonGrid } from "./PokemonGrid";
import { Paginator } from "../../components/paginator/Paginator";
import { Search } from "./PokemonSearch";
import { SelectPokemon } from "./SelectPokemon";
import { AppDispatch, getAllTypesPokemons, getPokemons, getPokemonsPerPage, RootState } from "../../store";

export const PokemonList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    isLoading,
    page,
    pokemonsToShow,
    pokemonsPerPage,
    allTypesPokemons,
    totalPages,
  } = useSelector((state: RootState) => state.pokemon);

  useEffect(() => {
    dispatch(getAllTypesPokemons());
    dispatch(getPokemons(pokemonsPerPage));
  }, []);

  const prevFunction = () => dispatch(getPokemonsPerPage({ isPrev: true }))
  const nextFunction = () => dispatch(getPokemonsPerPage({ isPrev: false }));
  return (
    isLoading
      ? (<h2>cargando...</h2>)
      : (
        <article className="flex flex-col ">
          <section className="flex gap-4 self-center">
            <Search />
            <SelectPokemon options={allTypesPokemons} />
          </section>
          <section className="w-[90%] sm:w-[90%] md:w-[80%] lg:w-[80%] self-center mb-96">
            <PokemonGrid pokemons={pokemonsToShow || []} />
            <div className="text-center">
              <Paginator isLoading={isLoading} prev={prevFunction} next={nextFunction} page={page} totalPages={totalPages} />
            </div>
          </section>
        </article>
      )

  )
}
