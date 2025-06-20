import { useState } from "react";
import "./App.css";
import Organization from "./Organization";
import BoardList from "./BoardList";
import Card from "./Card";
import { useParams } from "react-router";
import { useEffect } from "react";

function BoardPage() {
  const [showModal, setShowModal] = useState(false);
  const [board, setBoard] = useState({ Cards: [] });
  const { id } = useParams();

  const turnModalOff = (event) => {
    event.stopPropagation();
    setShowModal(false);
  };

  const turnModalOn = () => {
    setShowModal(true);
  };

  useEffect(() => {
    fetch(`http://localhost:3000/${id}`)
      .then((response) => response.json())
      .then((board) => setBoard(board))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);
  console.log(board.Cards);
  return (
    <>
      <a href="http://localhost:5173/">Back</a>
      <h1>Board 1</h1>
      <button onClick={turnModalOn} style={{ marginBottom: "20px" }}>
        Create a Card
      </button>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        }}
      >
        {board.Cards.map((card) => {
          return <Card name={card.name} likes={card.likes} />;
        })}
      </section>
      {showModal && (
        <div id="createBoardModal" className="modal">
          <div
            className="modal-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h2>Create a New Board</h2>
            <input
              type="text"
              className="mb10"
              placeholder="Enter Card title"
            ></input>
            <input
              type="text"
              className="mb10"
              placeholder="Enter Card Description"
            ></input>
            <input
              className="mb10"
              type="text"
              placeholder="Search Gifs"
            ></input>
            <button className="mb10">Search</button>
            <input
              className="mb10"
              type="text"
              placeholder="Enter Gif URL"
            ></input>
            <button className="mb10">Copy Gif URL</button>
            <input
              className="mb10"
              type="text"
              placeholder="Enter Owner (optional)"
            ></input>
            <button onClick={turnModalOff}>Create Card</button>
          </div>
        </div>
      )}
    </>
  );
}

export default BoardPage;
