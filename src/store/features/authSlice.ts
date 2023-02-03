import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  displayName?: string | null;
  email?: string | null;
  authenticated?: boolean | null;
}

const initialState: AuthState = {
  displayName: "",
  email: "",
  authenticated: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticated = action.payload;
    },
    logout: (state) => {
      state.authenticated = null;
    },
  }
});