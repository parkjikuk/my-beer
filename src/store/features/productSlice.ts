import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { db } from './../../firebase/firebase';
import { collection, query, where } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';

const productRef = collection(db, "product");

export interface ProductItems{
  id: string;
  image: string;
  name: string;
}

interface ProductState {
  data: ProductItems[];
  searchQuery: string;
  searchResults: ProductItems[];
}

const initialState: ProductState = {
  data: [],
  searchQuery: "",
  searchResults: [],
}

export const updateSearchQuery = (query: string) => {
  return {
    type: 'productSlice/updateSearchQuery',
    payload: query
  }
}

export const fetchData = createAsyncThunk(
  'productSlice/fetchData',
  async () => {
    const querySnapshot = await getDocs(productRef);
    const items: ProductItems[] = [];
    querySnapshot.forEach((doc) => {
      const beerData = doc.data();
      items.push({id: doc.id, image: beerData.image, name:beerData.name})
    })
    return items;
  }
)

export const fetchSearchResults = createAsyncThunk(
  'productSlice/fetchSearchResults',
  async (searchQuery: string) => {
    const q = query(productRef, where("name", ">=", searchQuery));
    const querySnapshot = await getDocs(q);
    const items: ProductItems[] = [];
    querySnapshot.forEach((doc) => {
      const beerData = doc.data();
      items.push({ id: doc.id, image: beerData.image, name: beerData.name })
    })
    return items;
  }
)

const productSlice = createSlice({
  name: 'beer',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<ProductItems[]>) => {
      state.data = action.payload;
    })
  }
})

export default productSlice;
