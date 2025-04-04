import { ChatInput } from "./components/ChatInput";
import { ChatRoomProvider } from "./contexts/ChatRoomProvider";
import { ChatHistory } from "./components/ChatHistory";

export const App = () => {
  return (
    <ChatRoomProvider>
      <div className="h-screen flex flex-col">
        <ChatHistory />
        <ChatInput />
      </div>
    </ChatRoomProvider>
  );
};
