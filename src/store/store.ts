import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import productSlice from './features/productSlice';
import { authSlice } from './features/authSlice';

const store = configureStore({
  reducer: {
    beer: productSlice.reducer,
    auth: authSlice.reducer,
  }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSeletor: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export default store;