import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Board from "./Board";
import "./BoardList.css";
const BoardList = ({ boards, onBoardsChange }) => {
  const backednUrl = import.meta.env.VITE_BACKEND;

  //loads in all the boards
  useEffect(() => {
    fetch(`${backednUrl}/boards`)
      .then((response) => response.json())
      .then((boards) => onBoardsChange(boards))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <section
      style={{
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      }}
    >
      {/* creates a board element for every board entry */}
      {boards.map((board) => {
        return (
          <Board
            boards={boards}
            onBoardsChange={onBoardsChange}
            key={board.id}
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
