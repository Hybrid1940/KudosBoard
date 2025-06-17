import { useState } from "react";
import "./App.css";
import Organization from "./Organization";
import BoardList from "./BoardList";
import CardList from "./CardList";

function BoardPage() {
  const [showModal, setShowModal] = useState(false);

  const turnModalOff = (event) => {
    event.stopPropagation();
    setShowModal(false);
  };

  const turnModalOn = () => {
    setShowModal(true);
  };

  return (
    <>
      <h1>Board 1</h1>
      <button onClick={turnModalOn}>Create a Card</button>
      <CardList />
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
            <button style={{ marginLeft: "0px" }} onClick={turnModalOff}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default BoardPage;
