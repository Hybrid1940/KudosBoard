import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";

function BoardList() {
  const [boards, setBoards] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3000/boards")
      .then((response) => response.json())
      .then((boards) => setBoards(boards))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  console.log(boards);

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      }}
    >
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
      <Board />
    </section>
  );
}

export default BoardList;
