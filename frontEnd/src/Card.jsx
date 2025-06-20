import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

function Card({
  id,
  boardId,
  name,
  likes,
  description,
  gif,
  author,
  onCardChange,
  updateCard,
}) {
  const deleteCard = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/${boardId}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    onCardChange(!updateCard);
  };

  const upVoteCard = async (event) => {
    event.preventDefault();
    const dataValues = await fetch(`http://localhost:3000/${boardId}/${id}`);
    const newData = await dataValues.json();
    likes = likes + 1;
    newData.likes = likes;
    const response = await fetch(`http://localhost:3000/${boardId}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    event.target.innerHTML = `Upvote ${likes}`;
  };

  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{description}</p>
      <img width={"150px"} height={"150px"} src={gif}></img>
      <p>{author}</p>
      <div style={{ display: "flex" }}>
        <button id="likes" onClick={upVoteCard}>
          Upvote: {likes}
        </button>
        <button onClick={deleteCard} className="ml10">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
