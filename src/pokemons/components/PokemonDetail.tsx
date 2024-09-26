import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CiLineHeight } from "react-icons/ci";
import { IoArrowBack } from "react-icons/io5";
import { Move, Pokemon, Type } from "../interfaces/pokemon-response";
import { TbWeight } from "react-icons/tb";
import { typeColors } from "../../utils/typeColors";
import { Chip } from "../../components/chip/Chip";


const getPokemon = async (id: string): Promise<Pokemon> => {
  const pokemon: Pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(resp => resp.json());
  return pokemon;
}

export const PokemonDetail = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState<Pokemon>();

  const getDataPokemon = async (id: string) => {
    const dataPokemon: Pokemon = await getPokemon(id);
    setPokemon(dataPokemon);
  }

  useEffect(() => {
    getDataPokemon(id || '')
  }, [id])

  return (
    <div className="flex justify-center">
      <article className={`w-full sm:w-1/2 lg:w-[30%] max-w-xl rounded-xl overflow-hidden shadow-lg ${typeColors[pokemon?.types[0].type.name || '']}`}>
        <div className=" text-white text-4xl flex items-center m-3">
          <Link
            to={`/`}
          >
            <IoArrowBack size={30} />
          </Link>
          <p className="ml-14">{pokemon?.name.toUpperCase()}</p>
        </div>
        <div className="m-2">
          <img
            src={pokemon?.sprites.other?.dream_world.front_default}
            alt={pokemon?.name}
            className="object-contain w-full h-full max-h-[40vh] mb-1" />

          <div className="px-3 py-3 bg-[#ffffff] rounded-lg  flex flex-col gap-2">
            {/* type */}
            <section className="flex justify-evenly">
              {
                pokemon?.types.map((type: Type) => (
                  <div key={crypto.randomUUID()}><Chip text={type.type.name} /> </div>

                ))
              }
            </section>
            {/* desc */}
            <section className="flex justify-around items-center">
              <div className="flex-1">
                <div className="flex items-center justify-center">
                  <TbWeight size={30} />
                  <p className="text-[10px] leading-[16px]">{pokemon?.weight}</p>
                </div>
                <p className="text-center text-[8px] leading-[12px] text-[#666666]">Weight</p>
              </div>

              <div className="w-[2px] h-[7vh] bg-gray-500"></div>

              <div className="flex-1">
                <div className="flex items-center justify-center">
                  <CiLineHeight size={30} />
                  <p className="text-[10px] leading-[16px]">{pokemon?.height}</p>
                </div>
                <p className="text-center text-[8px] leading-[12px] text-[#666666]">Height</p>
              </div>

              <div className="w-[2px] h-[7vh] bg-gray-500"></div>

              <div className="flex-1">
                <div className="text-center">
                  {pokemon?.moves.slice(0, 2).map((move: Move) => (
                    <p className="text-[10px] leading-[16px]" key={move.move.name}>{move.move.name}</p>
                  ))}
                </div>
                <p className="text-center text-[8px] leading-[12px] text-[#666666]">Moves</p>
              </div>
            </section>

            {/* Base Stats */}
            <div className="text-center font-bold text-[14px] leading-[16px] mb-2 text-[#B8B8B8]">Base Stats</div>
            <section>
              {
                pokemon?.stats.map((stat) => (
                  <div className="flex items-center" key={crypto.randomUUID()}>
                    <small className="flex-shrink-0 basis-[20%] text-[10px] leading-[16px] text-[#B8B8B8] font-bold">{stat.stat.name}</small>
                    <small className="flex-shrink-0 basis-[10%] text-[10px] leading-[16px] text-[#1D1D1D]">{stat.base_stat}</small>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stat.base_stat}
                      className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer range-slider"
                      style={{
                        background: `linear-gradient(to right, #B8B8B8 ${stat.base_stat}%, #d1d5db ${stat.base_stat}%)`,
                      }}
                      readOnly
                    />
                  </div>
                ))
              }
            </section>
          </div>
        </div>
      </article>
    </div>
  )
}
