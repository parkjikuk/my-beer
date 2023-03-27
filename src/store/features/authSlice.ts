import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  email?: string | null;
  authenticated?: boolean;
  userName?: string | null;
  userID?: string | null;
}

const initialState: AuthState = {
  email: null,
  authenticated: false,
  userName: null,
  userID: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      const {email, userName, userID} = action.payload;
      state.authenticated = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
    },
    logout: (state) => {
      state.authenticated = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
    },
  }
});