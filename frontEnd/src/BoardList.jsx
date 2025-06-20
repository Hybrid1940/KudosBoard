import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";

const BoardList = ({ boards, onBoardsChange }) => {
  const backednUrl = import.meta.env.VITE_BACKEND;
  useEffect(() => {
    fetch(`${backednUrl}/boards`)
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
            boards={boards}
            onBoardsChange={onBoardsChange}
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
