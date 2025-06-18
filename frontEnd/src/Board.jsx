import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function Board(props) {
  const boardSite = `http://localhost:5173/${props.id}`;
  return (
    <div className="card">
      <img src="https://picsum.photos/200/300?random=87"></img>
      <h3>{props.name}</h3>
      <p>{props.category}</p>
      <a href={boardSite}>View Board</a>
      <button className="ml10">Delete</button>
    </div>
  );
}

export default Board;
