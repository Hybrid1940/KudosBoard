import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function Card(props) {
  return (
    <div className="card">
      <img src="https://picsum.photos/200/300?random=87"></img>
      <h3>Card1</h3>
      <p>Inspiration</p>
      <div style={{ display: "flex" }}>
        <button>Upvote: 1</button>
        <button className="ml10">Delete</button>
      </div>
    </div>
  );
}

export default Card;
