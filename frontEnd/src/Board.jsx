import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function Board(props) {
  return (
    <div className="movieCard" style={{ margin: "20px" }}>
      <img src="https://picsum.photos/200/300?random=87"></img>
      <h3>Jeff</h3>
      <p>Inspiration</p>
      <a href="">View Board</a>
      <button>Delete</button>
    </div>
  );
}

export default Board;
