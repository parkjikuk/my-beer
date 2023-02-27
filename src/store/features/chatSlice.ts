import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface ChatMessage {
  id: string;
  userName: string | null;
  message: string;
  roomId: string;
};

interface ChatState {
  chatMessages: ChatMessage[];
  selectedRoomId: string;
};

const initialState: ChatState = {
  chatMessages: [],
  selectedRoomId: "",
};

export const fetchChatMessages = createAsyncThunk(
  "chat/fetchChatMessages",
  async (roomId: string) => {
    const response = await axios.get<ChatMessage[]>( `http://localhost:5000/api/chat/${roomId}/messages`);
    return response.data;
  }
);

export const postMessage = createAsyncThunk(
  "chat/postMessage",
  async ({ roomId, userName, message }: ChatMessage) => {
    const response = await axios.post(`http://localhost:5000/api/chat/${roomId}`, {
      userName,
      message,
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
    .addCase(fetchChatMessages.fulfilled, (state, action) => {
      state.chatMessages = action.payload;
    })
    .addCase(postMessage.fulfilled, (state, action) => {
      state.chatMessages.push(action.payload);
    })
  },
});


export default chatSlice;