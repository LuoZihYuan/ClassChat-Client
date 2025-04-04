import { Card, CardBody, Input, Button } from "@heroui/react";
import { useCallback, useState } from "react";
import { HiPaperAirplane } from "react-icons/hi2";
import { useChat } from "../contexts/ChatRoomContext";

export const ChatInput = () => {
  const { user, sendTextMessage } = useChat();
  const [chat, setChat] = useState<string>("");

  const handleChatInput = useCallback(() => {
    sendTextMessage(chat);
    setChat("");
  }, [chat, sendTextMessage]);

  return (
    <Card>
      <CardBody className="gap-y-1">
        <div className="flex gap-3 items-center">
          <Input
            value={chat}
            placeholder={`Start chatting as ${user?.username}`}
            onValueChange={setChat}
            isDisabled={!user}
          />
          <Button
            isIconOnly
            radius="full"
            isDisabled={!user || chat === ""}
            onPress={handleChatInput}
          >
            <HiPaperAirplane className="size-6" />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
