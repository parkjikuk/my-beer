import io, { Socket } from "socket.io-client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from "../store/store";
import { ChatMessage, fetchChatMessages} from "../store/features/chatSlice";

interface ChatProps {
  roomId: string;
}

function Chat({ roomId } : ChatProps) {
  const chatMessages  = useAppSelector((state) => state.chat.chatMessages);
  const userName = useAppSelector((state) => state.auth.userName);
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
        userName: userName ?? null,
        message: inputMessage,
        roomId: roomId,
      };
      socketRef.current?.emit("send message", newMessage);
      setInputMessage("");
    }
  }, [inputMessage, roomId, userName]);

  return (
    <div>
      <div>
        {chatMessages.map((message) => (
          <div key={message.id}>
            <span>{ message.userName ?? "Anonymous"}:</span> {message.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputMessage} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
