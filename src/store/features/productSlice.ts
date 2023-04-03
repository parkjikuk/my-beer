import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from './../../firebase/firebase';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';

const productRef = collection(db, "product");

export interface ProductItems{
  id: string;
  image: string;
  name: string;
  origin: string;
  description: string;
}

interface ProductState {
  data: ProductItems[];
  isLoading: boolean;
}

const initialState: ProductState = {
  data: [],
  isLoading: false,
}

export const fetchData = createAsyncThunk(
  'productSlice/fetchData',
  async () => {
    const querySnapshot = await getDocs(productRef);
    const items: ProductItems[] = [];
    querySnapshot.forEach((doc) => {
      const beerData = doc.data();
      items.push({id: doc.id, image: beerData.image, name:beerData.name, origin: beerData.origin, description: beerData.description})
    })
    return items;
  }
)

const productSlice = createSlice({
  name: 'beer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<ProductItems[]>) => {
        state.data = action.payload;
        state.isLoading = false;
      })
  }
})

export default productSlice;
