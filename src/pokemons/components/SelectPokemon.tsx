import { useEffect, useState } from "react";
import { TypesPokemon } from "../interfaces/pokemon-response";
import { useDispatch } from "react-redux";
import { AppDispatch, filterPokemonsByType } from "../../store";

export const SelectPokemon = ({options}: {options: TypesPokemon[]}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const types = [{id: '0', name: "Filter by type"}, ...options]
  const dispatch = useDispatch<AppDispatch>();

  const handleSelectChange = ({target}: any) => {
    setSelectedValue(target.value);
  };

  useEffect(() => {
    if( selectedValue !== ""){
      dispatch( filterPokemonsByType({type: selectedValue}));
    }
  }, [selectedValue]);
  
  return (
      <select
        className="outline-none focus:outline-none p-2 bg-white rounded-3xl"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {
          types.map((type: TypesPokemon) => (
            <option value={type.name} key={type.id}>
              {type.name}
            </option>
          ))
        }
      </select>
  )
}
