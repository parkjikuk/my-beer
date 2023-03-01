import { chatSlice } from './features/chatSlice';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import productSlice from './features/productSlice';
import { authSlice } from './features/authSlice';
import likeSlice from './features/likeSlice';



export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: {
    beer: productSlice.reducer,
    auth: authSlice.reducer,
    like: likeSlice.reducer,
    chat: chatSlice.reducer,
  },
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;