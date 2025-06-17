import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function Board(props) {
  return (
    <div className="card">
      <img src="https://picsum.photos/200/300?random=87"></img>
      <h3>Jeff</h3>
      <p>Inspiration</p>
      <a href="http://localhost:5173/boards">View Board</a>
      <button className="ml10">Delete</button>
    </div>
  );
}

export default Board;
