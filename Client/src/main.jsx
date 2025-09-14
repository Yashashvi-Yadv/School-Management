import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId={client}>
        <App />
      </GoogleOAuthProvider>
    </StrictMode>
  </BrowserRouter>
);
