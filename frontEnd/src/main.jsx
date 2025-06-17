import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BoardPage from "./BoardPage.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/boards", element: <BoardPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
