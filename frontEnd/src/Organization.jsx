import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { data } from "react-router";

const Organization = ({ boards, onBoardsChange }) => {
  const [showModal, setShowModal] = useState(false);
  const [allBoards, setAllBoards] = useState([]);

  const turnModalOff = (event) => {
    event.stopPropagation();
    setShowModal(false);
  };

  const turnModalOn = () => {
    setShowModal(true);
  };

  const submitFormData = async (event) => {
    event.preventDefault();
    const form = document.getElementById("bForm");
    const formData = new FormData(form);
    const readableData = Object.fromEntries(formData);
    console.log(readableData);
    const response = await fetch("http://localhost:3000/boards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readableData),
    });
    const result = await response.json();

    onBoardsChange((prev) => [...prev, result]);
    setShowModal(false);
  };

  const sortFunction = async (event) => {
    event.stopPropagation();
    if (event.target.value === "All") {
      await fetch("http://localhost:3000/boards")
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
    } else if (event.target.value === "recent") {
      await fetch("http://localhost:3000/boards")
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
      console.log(boards.slice(boards.length - 6, boards.length));
      onBoardsChange(boards.slice(boards.length - 6, boards.length));
    } else if (event.target.value === "celebration") {
      await fetch("http://localhost:3000/boards?category=Celebration")
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
      console.log(boards);
    } else if (event.target.value === "thank you") {
      await fetch("http://localhost:3000/boards?category=Thank You")
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
      console.log(boards);
    } else if (event.target.value === "inspiration") {
      await fetch("http://localhost:3000/boards?category=Inspiration")
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
      console.log(boards);
    }
  };

  const searchFunction = (event) => {
    event.preventDefault();
  };

  const clearFunction = (event) => {
    event.preventDefault();
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
    >
      <form>
        <input placeholder="Search Boards..." type="text"></input>
        <button className="ml10" type="submit">
          Search
        </button>
        <button className="ml10" type="submit">
          Clear
        </button>
      </form>
      <div style={{ marginTop: "12px" }}>
        <button onClick={turnModalOn}>Create a New Board</button>
        <select
          style={{ marginLeft: "10px" }}
          name="sortOptions"
          id="sortOptions"
          onChange={sortFunction}
        >
          <option value="All">Sort</option>
          <option value="recent">Recent</option>
          <option value="celebration">Celebration</option>
          <option value="thank you">Thank You</option>
          <option value="inspiration">Inspiration</option>
        </select>
      </div>
      {showModal && (
        <div id="createBoardModal" className="modal">
          <div
            className="modal-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h2>Create a New Board</h2>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              id="bForm"
            >
              <label htmlFor="name">Title:</label>
              <input name="name" type="text"></input>
              <label htmlFor="category">Category: </label>
              <select name="category">
                <option value="">Select a category</option>
                <option value="Celebration">Celebration</option>
                <option value="Thank You">Thank You</option>
                <option value="Inspiration">Inspiration</option>
              </select>
              <label htmlFor="Author">Author: </label>
              <input name="Author" type="text"></input>
              <button
                id="bFormSubmit"
                style={{ marginTop: "10px" }}
                onClick={submitFormData}
              >
                Create Board
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organization;
