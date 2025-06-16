import { useState } from "react";
import "./App.css";
import Organization from "./Organization";
import BoardList from "./BoardList";

function App() {
  return (
    <>
      <h1>Kudos Board</h1>
      <Organization />
      <BoardList />
    </>
  );
}

export default App;
