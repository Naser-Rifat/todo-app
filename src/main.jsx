import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/contextProvider.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-dmp4d52mgyu87fkv.us.auth0.com"
      clientId="0eGCc2hv9doY5FU2UAQitXdKs3T9OEl7"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </Auth0Provider>
  </React.StrictMode>
);
