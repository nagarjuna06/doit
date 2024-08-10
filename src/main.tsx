import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="system">
      <App />
      <Toaster />
    </ThemeProvider>
  </Provider>
);
