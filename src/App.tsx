import { Route, Routes } from 'react-router-dom';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import { PokemonList } from './pokemons/components/PokemonList';
import { PokemonDetail } from './pokemons';

function App() {
  return (
    <>
      <div >
        <div className='flex flex-col'>
          <span className="text-5xl my-2 flex font-poppins text-white"> <MdOutlineCatchingPokemon />Pokédex</span>
        </div>
        <Routes>
          <Route path='/' element={<PokemonList />} />
          <Route path='/detail/:id' element={<PokemonDetail />} />
          {/* <Route path="/*" element={<Navigate to={"/"} />} /> */}
        </Routes>
      </div>
    </>
  )
}

export default App
