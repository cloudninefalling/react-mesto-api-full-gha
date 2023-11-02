import CurrentUserContext from "../contexts/CurrentUserContext";
import React from "react";
import Card from "./Card";

export default function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          className="profile__avatar"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        ></button>
        <div className="profile-info">
          <h1 className="profile-info__name">{currentUser.name}</h1>
          <p className="profile-info__occupation">{currentUser.about}</p>
          <button
            className="profile-info__edit-button"
            type="button"
            aria-label="редактировать"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="новый пост"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards">
        <ul className="elements">
          {cards.map((card) => {
            return (
              <li className="element" key={card._id}>
                <Card
                  card={card}
                  onCardClick={onCardClick}
                  onCardLike={onCardLike}
                  onCardDelete={onCardDelete}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
