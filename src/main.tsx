import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./App.tsx";
// import { BrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import router from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/features/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
    {/* <App /> */}
  </StrictMode>
);
