import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { ChatRoomContext } from "./ChatRoomContext";
import type {
  User,
  Message,
  TextMessage,
  ImageMessage,
  NotificationMessage,
} from "./ChatRoomContext";

export const ChatRoomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to your backend
    socketRef.current = io("http://localhost:3000");

    socketRef.current.on("connect", async () => {
      const u = (await socketRef.current?.emitWithAck("register", "")) as User;
      setUser(u);
    });

    socketRef.current.on("message.notification", (msg: NotificationMessage) => {
      console.log(msg);
      msg.timestamp = new Date(msg.timestamp);
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on("message.text", (msg: TextMessage) => {
      msg.timestamp = new Date(msg.timestamp);
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on("message.image", (msg: ImageMessage) => {
      msg.timestamp = new Date(msg.timestamp);
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    document.title = `ClassChat - ${user?.username}`;
  }, [user]);

  const sendTextMessage = useCallback(
    async (text: string) => {
      if (socketRef.current && user) {
        const currentTime = new Date();
        setMessages((prev) => [
          ...prev,
          { from: user, timestamp: new Date(), type: "text", text: text },
        ]);
        const verifiedMessage = (await socketRef.current.emitWithAck(
          "message.text",
          text
        )) as TextMessage;
        verifiedMessage.timestamp = new Date(verifiedMessage.timestamp);
        setMessages((prev) => {
          return prev.map((msg) => {
            return msg.timestamp.getTime() === currentTime.getTime()
              ? verifiedMessage
              : msg;
          });
        });
      }
    },
    [user]
  );

  const sendImageMessage = useCallback(
    async (imgsrc: string) => {
      if (socketRef.current && user) {
        const currentTime = new Date();
        setMessages((prev) => [
          ...prev,
          { from: user, timestamp: new Date(), type: "image", imgsrc: imgsrc },
        ]);
        const verifiedMessage = (await socketRef.current.emitWithAck(
          "message.image",
          imgsrc
        )) as ImageMessage;
        verifiedMessage.timestamp = new Date(verifiedMessage.timestamp);
        setMessages(
          messages.map((msg) => {
            return msg.timestamp.getTime() === currentTime.getTime()
              ? verifiedMessage
              : msg;
          })
        );
      }
    },
    [messages, user]
  );

  const value = useMemo(
    () => ({ user, messages, sendTextMessage, sendImageMessage }),
    [user, messages, sendTextMessage, sendImageMessage]
  );

  return <ChatRoomContext value={value}>{children}</ChatRoomContext>;
};
