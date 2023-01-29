import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from './../../firebase/firebase';
import { collection } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';

const productRef = collection(db, "product");

export interface ProductItems{
  image: string;
  name: string;
}

interface ProductState {
  data: ProductItems[];
}

const initialState: ProductState = {
  data: [],
} 

export const fetchData = createAsyncThunk(
  'productSlice/fetchData',
  async () => {
    const querySnapshot = await getDocs(productRef);
    const items: ProductItems[] = [];
    querySnapshot.forEach((doc) => {
      const beerData = doc.data();
      items.push({image: beerData.image, name:beerData.name})
    })
    return items;
  }
)

const productSlice = createSlice({
  name: 'beer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    })
  }
})

export default productSlice;
