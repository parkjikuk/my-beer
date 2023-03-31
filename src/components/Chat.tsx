import io, { Socket } from "socket.io-client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from "../store/store";
import { ChatMessage, fetchChatMessages, postMessage} from "../store/features/chatSlice";
import styled, {css} from 'styled-components';
import Loading from "./Loading";

interface ChatProps {
  roomId: string;
}

function Chat({ roomId } : ChatProps) {
  const dispatch = useAppDispatch();
  const chatMessages  = useAppSelector((state) => state.chat.chatMessages);
  const {userName , email, authenticated} = useAppSelector((state) => state.auth);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const socketRef = useRef<Socket>();
  const isLoading = useAppSelector((state) => state.chat.isLoading)

  useEffect(() => {
    socketRef.current = io("https://port-0-my-beer-6g2llezz4y2v.sel3.cloudtype.app");
    socketRef.current.on("connect", () => {
      console.log(`Socket connected: ${socketRef.current?.id}`);
    });
    socketRef.current.on("disconnect", () => {
      console.log(`Socket disconnected: ${socketRef.current?.id}`);
    });
    socketRef.current.emit("join room", roomId);
    
    if (!socketRef.current?.hasListeners("receive message")) {
      socketRef.current?.on("receive message", (message: ChatMessage) => {
        dispatch(postMessage(message));
      });
    }
  
    dispatch(fetchChatMessages(roomId));
  
    return () => {
      socketRef.current?.emit("leave room", roomId);
      socketRef.current?.disconnect();
      socketRef.current?.off("receive message");
    }
  }, [roomId, dispatch]);

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
        myMessage: false,
      };

      newMessage.myMessage = newMessage.email ? newMessage.email === email : false;

      socketRef.current?.emit("send message", newMessage, () => {
        setInputMessage("");
      });
    }
  }, [inputMessage, roomId, userName]);

  return (
    <>
      {isLoading ? <Loading /> : (
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
      )}
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2A2A2A;
  border-radius: 5px;
  overflow: auto;
  margin-top: 15px;
`;

const StyledChatMessage  = styled.div<{ myMessage: boolean }>`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  align-items: ${({ myMessage }) => (myMessage ? 'flex-end' : 'flex-start')};
  margin-bottom: 8px;
  height: 100%;
`;

const MessageUserName = styled.strong`
color: white;
`;

const MessageContent = styled.div`
background-color: #A9CEC2;
padding: 5px;
border-radius: 5px;
max-width: 50%;
margin-top: 5px;
`;

const MessageInfo = styled.div`
height: 100%;
min-height: 755px;
max-height: 755px;
overflow-y: scroll;
padding: 10px;
&::-webkit-scrollbar {
  width: 10px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.5);
}
&::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.4);
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
height: 100%;
`;

const MessageInput = styled.input`
flex: 1;
padding: 10px;
border-radius: 5px;
border: none;
margin: 0 10px;
outline: none;
background-color: ${props => props.disabled && "#e0e0e0"};
`;

const MessageBtn = styled.button`
background-color: #70878D;
padding: 10px;
border-radius: 5px;
border: none;
margin-right: 10px;
cursor: pointer;
&:hover {
  background-color: #3e8e41;
}
`;

export default Chat;
