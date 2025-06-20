import { useState } from "react";
import "./App.css";
import Organization from "./Organization";
import BoardList from "./BoardList";

function MainPage() {
  const [boards, setBoards] = useState([]);
  return (
    <div>
      <header
        style={{
          backgroundColor: "#8ecae6",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <h1>Kudos Board</h1>
        <Organization boards={boards} onBoardsChange={setBoards} />
      </header>
      <BoardList boards={boards} onBoardsChange={setBoards} />
      <footer
        style={{
          backgroundColor: "#8ecae6",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default MainPage;
