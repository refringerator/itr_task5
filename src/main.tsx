import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import AntConfigProvider from "./components/AntConfigProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AntConfigProvider>
          <App />
        </AntConfigProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
