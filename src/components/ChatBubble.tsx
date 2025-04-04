import { Card, CardBody } from "@heroui/react";
import type { FC, ReactElement } from "react";
import { useCallback } from "react";
import type {
  Message,
  NotificationMessage,
  TextMessage,
} from "../contexts/ChatRoomContext";

interface ChatBubbleProps {
  message: Message;
  isMe: boolean;
}

export const ChatBubble: FC<ChatBubbleProps> = (props) => {
  const generateBubble = useCallback<
    (condition: ChatBubbleProps) => ReactElement
  >(({ message, isMe }) => {
    if (message.type === "notification")
      return (
        <div className="flex justify-center mb-3 text-foreground-500 text-sm">
          {(message as NotificationMessage).content}
        </div>
      );
    else if (isMe)
      return (
        <div className="flex justify-end mb-3">
          <div>
            <div className="flex items-center gap-x-5">
              <div className="h-fit text-xs text-foreground-300">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <Card
                className={`w-fit ${isMe ? "bg-primary-200" : "bg-foreground-300"}`}
              >
                <CardBody>
                  <div>{(message as TextMessage).text}</div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className={"flex justify-start mb-3"}>
          <div>
            <div className="text-xs text-foreground-500 m-1">
              {message.from.username}
            </div>
            <div className="flex items-center gap-x-5">
              <Card
                className={`w-fit ${isMe ? "bg-primary-200" : "bg-foreground-300"}`}
              >
                <CardBody>
                  <div>{(message as TextMessage).text}</div>
                </CardBody>
              </Card>
              <div className="h-fit text-xs text-foreground-300">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </div>
      );
  }, []);

  return generateBubble(props);
};
