import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import AntConfigProvider from "./components/AntConfigProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AntConfigProvider>
      <App />
    </AntConfigProvider>
  </Provider>
);
