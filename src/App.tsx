import { ChatRoomProvider } from "./contexts/ChatRoomProvider";
import { ChatInput, ChatHistory } from "./components";

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
