import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";

const BoardList = ({ boards, onBoardsChange }) => {
  useEffect(() => {
    fetch("http://localhost:3000/boards")
      .then((response) => response.json())
      .then((boards) => onBoardsChange(boards))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);
  console.log(boards);
  return (
    <section
      style={{
        marginTop: "30px",
        marginBottom: "30px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      }}
    >
      {boards.map((board) => {
        return (
          <Board
            key={board.name}
            name={board.name}
            category={board.category}
            id={board.id}
          />
        );
      })}
    </section>
  );
};

export default BoardList;
