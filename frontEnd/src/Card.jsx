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
  const backednUrl = import.meta.env.VITE_BACKEND;
  //functionality to delete a card
  const deleteCard = async (event) => {
    event.preventDefault();
    const response = await fetch(`${backednUrl}/${boardId}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    onCardChange(!updateCard);
  };
  //upvote card functionality
  const upVoteCard = async (event) => {
    event.preventDefault();
    const dataValues = await fetch(`${backednUrl}/${boardId}/${id}`);
    const newData = await dataValues.json();
    likes = likes + 1;
    newData.likes = likes;
    const response = await fetch(`${backednUrl}/${boardId}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });

    event.target.innerHTML = `Upvote ${likes}`;
  };

  return (
    //returned card
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
