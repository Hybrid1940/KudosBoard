import { useState } from "react";
import "./App.css";
import Organization from "./Organization";
import BoardList from "./BoardList";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import BoardPage from "./BoardPage.jsx";
import MainPage from "./mainPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/:id" element={<BoardPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
