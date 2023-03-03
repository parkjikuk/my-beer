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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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
      <MessageInfo >
        {chatMessages.map((message) => (
          <StyledChatMessage  key={message.id} myMessage={message.myMessage}>
          <div>
            <MessageUserName>{message.userName}</MessageUserName>
          </div>
          <MessageContent>{message.message}</MessageContent>
        </StyledChatMessage>
        ))}
        <div ref={messagesEndRef} />
      </MessageInfo>
      <MessageForm onSubmit={handleSubmit}>
        <MessageInput placeholder="메세지를 입력해주세요" type="text" value={inputMessage} onChange={handleInputChange} />
        <MessageBtn type="submit">보내기</MessageBtn>
      </MessageForm>
    </Container>
  );
};

const Container = styled.div`
  width: 30%;
  background-color: #2A2A2A;
  border-radius: 5px;
  height: 100%;
  overflow: auto;
  margin-top: 20px;
`;

const StyledChatMessage  = styled.div<{ myMessage: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ myMessage }) => (myMessage ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
  height: auto;
`;

const MessageUserName = styled.strong`
color: white;
`;

const MessageContent = styled.div`
background: #A9CEC2;
padding: 5px;
border-radius: 5px;
max-width: 50%;
`;

const MessageInfo = styled.div`
max-height: 700px;
height: 700px;
overflow-y: scroll;
padding: 10px;
&::-webkit-scrollbar {
  width: 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.5);
}
&::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 6px;
}
`;

const MessageForm = styled.form`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
width: 100%;
margin-top: 20px;
margin-bottom: 10px;
`;

const MessageInput = styled.input`
flex: 1;
padding: 10px;
border-radius: 5px;
border: none;
margin: 0 10px;
outline: none;
`;

const MessageBtn = styled.button`
background-color: #70878D;
padding: 10px;
border-radius: 5px;
border: none;
margin-right: 10px;
`;

export default Chat;
