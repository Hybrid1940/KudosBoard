import { useState } from "react";
import "./App.css";
import Organization from "./Organization";
import BoardList from "./BoardList";
import Card from "./Card";
import { useParams } from "react-router";
import { useEffect } from "react";

function BoardPage() {
  const [showModal, setShowModal] = useState(false);
  const [updateCard, setUpdateCard] = useState(false);
  const [board, setBoard] = useState({ Cards: [] });
  const { id } = useParams();
  const mainPage = `${window.location.origin}`;
  const apiKey = import.meta.env.VITE_APP_API_KEY;
  console.log(apiKey);
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
  }, [updateCard]);

  const searchForGifs = async (event) => {
    event.preventDefault();
    document.getElementById("gifResultsHolder").innerHTML = "";
    const gifFetch = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${
        document.getElementById("gifSearchValue").value
      }&limit=6`
    ).then((response) => response.json());

    for (let i = 0; i < gifFetch.data.length; i++) {
      const nGif = document.createElement("img");
      nGif.width = 175;
      nGif.height = 175;
      nGif.style.borderRadius = "8px";
      nGif.style.marginLeft = "10px";

      nGif.onclick = function () {
        document.getElementById("gifResultsHolder").innerHTML = "";
        document.getElementById("gifSearchValue").value = "";
        document.getElementById("gifUrl").value =
          gifFetch.data[i].images.original.url;
      };

      nGif.src = gifFetch.data[i].images.original.url;
      document.getElementById("gifResultsHolder").appendChild(nGif);
    }
  };

  const createNewCard = async (event) => {
    event.preventDefault();

    if (document.getElementById("description").value === "") {
      alert("Fill in description");
      return;
    }
    if (document.getElementById("gifUrl").value === "") {
      alert("Fill in gif");
      return;
    }

    const formData = new FormData(document.getElementById("newCardForm"));
    const readableData = Object.fromEntries(formData);
    readableData.likes = 0;
    console.log(readableData);

    const response = await fetch(`http://localhost:3000/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readableData),
    });
    setUpdateCard(!updateCard);
    const result = await response.json();
    setShowModal(false);
  };
  return (
    <>
      <a href={mainPage}>Back</a>
      <h1>{board.name}</h1>
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
          return (
            <Card
              onCardChange={setUpdateCard}
              updateCard={updateCard}
              gif={card.gif}
              id={card.id}
              boardId={id}
              name={card.name}
              likes={card.likes}
              author={card.author}
              description={card.description}
              board={board}
              onBoardChange={setBoard}
            />
          );
        })}
      </section>
      {showModal && (
        <div id="createBoardModal" className="modal">
          <div
            className="modal-content"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <button onClick={turnModalOff}>X</button>
            <h2>Create a New Board</h2>
            <form
              id="newCardForm"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label htmlFor="name"></label>
              <input
                name="name"
                type="text"
                className="mb10"
                placeholder="Enter Card title"
              ></input>
              <label htmlFor="description"></label>
              <input
                name="description"
                id="description"
                type="text"
                className="mb10"
                placeholder="Enter Card Description"
              ></input>
              <input
                className="mb10"
                type="text"
                placeholder="Search Gifs"
                id="gifSearchValue"
              ></input>
              <button className="mb10" onClick={searchForGifs}>
                Search
              </button>
              <div id="gifResultsHolder"></div>
              <label htmlFor="gif"></label>
              <input
                name="gif"
                className="mb10"
                type="text"
                placeholder="Enter Gif URL"
                id="gifUrl"
              ></input>
              <button className="mb10">Copy Gif URL</button>
              <label htmlFor="author"></label>
              <input
                name="author"
                className="mb10"
                type="text"
                placeholder="Enter Owner (optional)"
              ></input>
              <button onClick={createNewCard}>Create Card</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default BoardPage;
