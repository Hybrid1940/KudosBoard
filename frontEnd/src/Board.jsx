import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function Board({ boards, onBoardsChange, key, name, category, id }) {
  const boardSite = `${window.location.href}${id}`;
  const backednUrl = import.meta.env.VITE_BACKEND;

  const deleteFunction = async (event) => {
    event.preventDefault();
    const response = await fetch(`${backednUrl}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    fetch(`${backednUrl}/boards`)
      .then((response) => response.json())
      .then((boards) => onBoardsChange(boards))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  return (
    <div className="card">
      <img src="https://picsum.photos/200/300?random=87"></img>
      <h3>{name}</h3>
      <p>{category}</p>
      <a href={boardSite}>View Board</a>
      <button className="ml10" onClick={deleteFunction}>
        Delete
      </button>
    </div>
  );
}

export default Board;
