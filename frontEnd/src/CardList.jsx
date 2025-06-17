import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";

function CardList() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      }}
    >
      <Card />
      <Card />
      <Card />
    </section>
  );
}

export default CardList;
