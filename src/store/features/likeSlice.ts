import { RootState } from './../store';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export interface Like{
  id: string;
  image: string;
  name: string;
}

interface LikeState {
  likeItems: Like[];
  isLoading: boolean;
}

const initialState: LikeState = {
  likeItems: [],
  isLoading: false,
}

export const getUserLikedBeers = createAsyncThunk<Like[], void, { state: RootState }>(
  "beer/getLiked",
  async (_, thunkAPI) => {
    const email = thunkAPI.getState().auth.email;
    const { data: { beers } } = await axios.get(`${apiUrl}/api/user/liked/${email}`);
    console.log(beers)
    return beers;
  }
);

export const removeBeerFromList = createAsyncThunk<Like[], string, { state: RootState }>(
  "beer/removeLiked",
  async (beerId, thunkAPI) => {
    const email = thunkAPI.getState().auth.email;
    const { data: { beers }} = await axios.put(`${apiUrl}/api/user/remove`, {
      email,
      beerId,
    });
    return beers;
  }
)

export const LikeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserLikedBeers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLikedBeers.fulfilled, (state, action) => {
        state.likeItems = action.payload;
        state.isLoading = false;
      })
      .addCase(removeBeerFromList.fulfilled, (state, action) => {
        state.likeItems = action.payload;
      })
  },
});

export default LikeSlice;
