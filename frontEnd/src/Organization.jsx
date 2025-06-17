import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Organization() {
  const [showModal, setShowModal] = useState(false);

  const turnModalOff = (event) => {
    event.stopPropagation();
    setShowModal(false);
  };

  const turnModalOn = () => {
    setShowModal(true);
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
        >
          <option value="All">Sort</option>
          <option value="alphabetic">Recent</option>
          <option value="recent">Celebration</option>
          <option value="votes">Thank You</option>
          <option value="votes">Inspiration</option>
        </select>
      </div>
      {showModal && (
        <div id="createBoardModal" className="modal">
          <div
            className="modal-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h2>Create a New Board</h2>
            <label>Title:</label>
            <input type="text"></input>
            <labe>Category: </labe>
            <select>
              <option value="">Select a category</option>
              <option value="recent">Celebration</option>
              <option value="votes">Thank You</option>
              <option value="votes">Inspiration</option>
            </select>
            <labe>Author: </labe>
            <input type="text"></input>
            <button style={{ marginTop: "10px" }} onClick={turnModalOff}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Organization;
