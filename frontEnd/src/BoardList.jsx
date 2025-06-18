import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";

function BoardList() {
  const [boards, setBoards] = useState([]);
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
      {boards.map((board) => {
        return (
          <Board name={board.name} category={board.category} id={board.id} />
        );
      })}
    </section>
  );
}

export default BoardList;
