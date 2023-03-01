import { RootState } from './../store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

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
    const response = await axios.get<ChatMessage[]>( `http://localhost:5000/api/chat/${roomId}/messages`);
    const messages: ChatMessage[] = response.data.map((message) => ({
      ...message,
      myMessage: message.email === email,
    }));
    console.log(messages);
    return messages;
  }
);

export const postMessage = createAsyncThunk(
  "chat/postMessage",
  async ({ roomId, userName, message, email, myMessage }: ChatMessage) => {
    const response = await axios.post(`http://localhost:5000/api/chat/${roomId}/messages`, {
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
      state.isLoading = false;
    })
    .addCase(fetchChatMessages.fulfilled, (state, action) => {
      state.chatMessages = action.payload;
      state.isLoading = true;
    })
    .addCase(postMessage.fulfilled, (state, action) => {
      state.chatMessages.push(action.payload);
    })
  },
});

export default chatSlice;