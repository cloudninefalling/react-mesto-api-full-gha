import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const userContext = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === userContext._id;
  const isLiked = card.likes.some((card) => card._id === userContext._id);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <>
      <div
        className="element__image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleCardClick}
      />
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-btn-container">
        <button
          type="button"
          className={`element__like ${isLiked ? "element__like_active" : ""}`}
          aria-label="лайк"
          onClick={handleCardLike}
        ></button>
        <p className="element__like-count">{card.likes.length}</p>
      </div>
      {isOwn && (
        <button
          type="button"
          className="element__delete"
          aria-label="удалить"
          onClick={handleCardDelete}
        ></button>
      )}
    </>
  );
}
