import { useState } from "react";
import "./App.css";

const Organization = ({ boards, onBoardsChange }) => {
  //application contsants
  const [showModal, setShowModal] = useState(false);
  const backednUrl = import.meta.env.VITE_BACKEND;
  //turn modal off function
  const turnModalOff = (event) => {
    event.stopPropagation();
    setShowModal(false);
  };
  //turn modal on function
  const turnModalOn = () => {
    setShowModal(true);
  };
  //function to submit the form to the backend
  const submitFormData = async (event) => {
    event.preventDefault();
    //stops if category or title not selected
    if (document.getElementById("categorySelect").value === "") {
      alert("Fill in category");
      return;
    }

    if (document.getElementById("name").value === "") {
      alert("Fill in title");
      return;
    }
    //posts to backend
    const form = document.getElementById("bForm");
    const formData = new FormData(form);
    const readableData = Object.fromEntries(formData);
    const response = await fetch(`${backednUrl}/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readableData),
    });
    const result = await response.json();

    onBoardsChange((prev) => [...prev, result]);
    setShowModal(false);
  };
  //function to access boards with a certain category, checks the value of the dropdown and makes the proper call
  const sortFunction = async (event) => {
    event.stopPropagation();
    if (event.target.value === "All") {
      await fetch(`${backednUrl}/boards`)
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
    } else if (event.target.value === "recent") {
      await fetch(`${backednUrl}/boards`)
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
      if (boards.length > 6) {
        onBoardsChange(boards.slice(boards.length - 6, boards.length));
      }
    } else if (event.target.value === "celebration") {
      await fetch(`${backednUrl}/boards?category=Celebration`)
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
    } else if (event.target.value === "thank you") {
      await fetch(`${backednUrl}/boards?category=Thank You`)
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
    } else if (event.target.value === "inspiration") {
      await fetch(`${backednUrl}/boards?category=Inspiration`)
        .then((response) => response.json())
        .then((boards) => onBoardsChange(boards))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  };
  //functionality to search titles in the backend
  const searchFunction = async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById("search").value;
    await fetch(`${backednUrl}/boards?name=${searchTerm}`)
      .then((response) => response.json())
      .then((boards) => onBoardsChange(boards))
      .catch((error) => console.error("Error fetching posts:", error));
  };

  const clearFunction = async (event) => {
    event.preventDefault();
    await fetch(`${backednUrl}/boards`)
      .then((response) => response.json())
      .then((boards) => onBoardsChange(boards))
      .catch((error) => console.error("Error fetching posts:", error));

    document.getElementById("search").value = "";
    document.getElementById("sortOptions").value = "All";
  };

  return (
    <div
      id=""
      style={{ display: "flex", flexDirection: "column", marginBottom: "20px" }}
    >
      {/* form to search for boards */}
      <form>
        <input id="search" placeholder="Search Boards..." type="text"></input>
        <button onClick={searchFunction} className="ml10" type="submit">
          Search
        </button>
        <button onClick={clearFunction} className="ml10" type="submit">
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
      {/* modal to make a board */}
      {showModal && (
        <div id="createBoardModal" className="modal">
          <div
            className="modal-content"
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <button onClick={turnModalOff}>X</button>
            <h2>Create a New Board</h2>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              id="bForm"
            >
              <label htmlFor="name">Title:</label>
              <input id="name" name="name" type="text" required></input>
              <label htmlFor="category" required>
                Category:
              </label>
              <select id="categorySelect" name="category">
                <option value="">Select a category</option>
                <option value="Celebration">Celebration</option>
                <option value="Thank You">Thank You</option>
                <option value="Inspiration">Inspiration</option>
              </select>
              <label htmlFor="Author">Author: </label>
              <input name="Author" type="text"></input>
              <button
                type="submit"
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
