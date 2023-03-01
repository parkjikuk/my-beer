import io, { Socket } from "socket.io-client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from "../store/store";
import { ChatMessage, fetchChatMessages, postMessage} from "../store/features/chatSlice";
import styled, {css} from 'styled-components';

interface ChatProps {
  roomId: string;
}

function Chat({ roomId } : ChatProps) {
  const dispatch = useAppDispatch();
  const chatMessages  = useAppSelector((state) => state.chat.chatMessages);
  const {userName , email} = useAppSelector((state) => state.auth);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("connect", () => {
      console.log(`Socket connected: ${socketRef.current?.id}`);
    });
    socketRef.current.on("disconnect", () => {
      console.log(`Socket disconnected: ${socketRef.current?.id}`);
    });
    socketRef.current.emit("join room", roomId);
    dispatch(fetchChatMessages(roomId));

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.emit("leave room", roomId);
    }
  }, [roomId]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      const newMessage: ChatMessage = {
        id: "",
        userName: userName ?? "",
        message: inputMessage,
        roomId: roomId,
        email: email ?? "",
        myMessage: true,
      };
      socketRef.current?.emit("send message", newMessage);
      dispatch(postMessage(newMessage)).then(() => {
        setInputMessage("");
      })
    }
  }, [inputMessage, roomId, userName]);

  return (
    <Container>
      <MessageInfo>
        {chatMessages.map((message) => (
          <StyledChatMessage  key={message.id} myMessage={message.myMessage}>
          <div>
            <strong>{message.userName ?? 'Anonymous'}</strong>
          </div>
          <MessageContent>{message.message}</MessageContent>
        </StyledChatMessage>
        ))}
        <div ref={messagesEndRef} />
      </MessageInfo>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputMessage} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </Container>
  );
};

const StyledChatMessage  = styled.div<{ myMessage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ myMessage }) => (myMessage ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
`;

const MessageContent = styled.div`
background: #A9CEC2;
padding: 5px;
border-radius: 5px;
`;

const Container = styled.div`
width: 30%;
background-color: #2A2A2A;
border-radius: 5px;
padding: 20px;
`;

const MessageInfo = styled.div`
overflow: auto;
height: 60vh;
`;

export default Chat;
