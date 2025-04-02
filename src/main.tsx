import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { App } from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <HeroUIProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </HeroUIProvider>,
);
