import { ChatBubble } from "./ChatBubble";
import { ScrollShadow } from "@heroui/react";
import { useChat } from "../contexts/ChatRoomContext";
import { useEffect, useRef } from "react";

export const ChatHistory = () => {
  const { user, messages } = useChat();
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);

  return (
    <ScrollShadow className="flex-1 px-4">
      {messages.map((message) => {
        console.log(message.from.userid);
        console.log(user?.userid);
        return (
          <ChatBubble
            key={message.timestamp.getTime()}
            message={message}
            isMe={message.from.userid === user?.userid}
          />
        );
      })}
      <div ref={messageEndRef} />
    </ScrollShadow>
  );
};
