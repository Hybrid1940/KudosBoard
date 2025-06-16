import React from "react";
import ReactDOM from "react-dom";
import Board from "./Board";

function BoardList() {
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
