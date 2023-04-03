import { RootState } from './../store';
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export interface ChatMessage {
  id: string;
  userName?: string;
  message: string;
  roomId: string;
  email: string;
  myMessage: boolean;
};

interface ChatState {
  chatMessages: ChatMessage[];
  isLoading: boolean;
};

const initialState: ChatState = {
  chatMessages: [],
  isLoading: false,
};

export const fetchChatMessages = createAsyncThunk<ChatMessage[], string, { state: RootState }>(
  "chat/fetchChatMessages",
  async (roomId: string, thunkAPI) => {
    const email = thunkAPI.getState().auth.email;
    const response = await axios.get<ChatMessage[]>( `${apiUrl}/api/chat/${roomId}/messages`);
    const messages: ChatMessage[] = response.data.map((message) => ({
      ...message,
      myMessage: message.email === email,
    }));
    const reverse = messages.slice().reverse();
    return reverse;
  }
);

export const postMessage = createAsyncThunk(
  "chat/postMessage",
  async ({ roomId, userName, message, email, myMessage }: ChatMessage) => {
    const response = await axios.post(`${apiUrl}/api/chat/${roomId}/messages`, {
      userName,
      message,
      email,
      myMessage,
    });
    return response.data;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchChatMessages.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(fetchChatMessages.fulfilled, (state, action) => {
      state.chatMessages = action.payload;
      state.isLoading = false;
    })
    .addCase(postMessage.fulfilled, (state, action) => {
      if (state.chatMessages.length === 10) {
        state.chatMessages.splice(0, 1);
      }
      state.chatMessages.push(action.payload);
    })
  },
});

export default chatSlice;