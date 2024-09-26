import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { pokemonSlice } from './slices/pokemon/pokemonSlice'

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store