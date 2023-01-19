import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";

export interface Like{
  id: number;
  image: string;
  name: string;
}

interface LikeState {
  likeItems: Like[]
}

const initialState: LikeState = {
  likeItems: [],
}

export const LikeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    addItem:(state, action: PayloadAction<{name: string, image: string}> ) => {
      state.likeItems.push({
        id: state.likeItems.length,
        name: action.payload.name,
        image: action.payload.image
      });
    }
  }
});

export default LikeSlice.reducer;
export const { addItem } = LikeSlice.actions;