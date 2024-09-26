import { useState } from "react";
import { useDispatch } from "react-redux";
import { CiSearch } from "react-icons/ci";
import { AppDispatch, filterPokemonsByName } from "../../store";

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [inputValue, setInputValue] = useState('');

  const onInputChange = ({ target }: any) => {
    dispatch(filterPokemonsByName({ name: target.value }));
    setInputValue(target.value);
  }

  return (
    <div className="relative">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <CiSearch />
      </div>
      <input
        type="search"
        id="default-search"
        className="rounded-3xl block p-4 pl-10 w-full text-sm text-gray-900 border border-gray-300 focus:ring-red-600 focus:border-red-600"
        placeholder="Search"
        onChange={onInputChange}
        value={inputValue}
      />
    </div>
  )
}