import { createContext, use } from "react";

export interface User {
  userid: string;
  username: string;
}

export interface Message {
  from: User;
  timestamp: Date;
  type: "notification" | "text" | "image";
}

export interface NotificationMessage extends Message {
  type: "notification";
  content: string;
}

export interface TextMessage extends Message {
  type: "text";
  text: string;
}

export interface ImageMessage extends Message {
  type: "image";
  imgsrc: string;
}

interface ChatRoomContextType {
  user?: User;
  messages: Message[];
  sendTextMessage: (text: string) => void;
  sendImageMessage: (text: string) => void;
}

export const ChatRoomContext = createContext<ChatRoomContextType | undefined>(
  undefined
);

export const useChat = () => {
  const context = use(ChatRoomContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
};
