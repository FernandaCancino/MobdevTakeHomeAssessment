import { Link } from "react-router-dom";
import { SimplePokemon } from "../interfaces/pokemon-response";

interface IPokemonCard {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: IPokemonCard) => {
  const { name, id } = pokemon;  

  return (
    <div className="mx-auto right-0 mt-2 w-[90%]">
      <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <img 
              key={ pokemon.id }
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${ pokemon.id }.svg`}
              alt={ pokemon.name }
              className="h-[20vh]"
            />


          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{ name }</p>
          <div className="mt-5">
            <Link
              to={`/detail/${id}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100 block"
            >
              Más información
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
