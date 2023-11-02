import React from "react";

export default function ImagePopup({
  isOpen,
  card,
  onClose,
  handleClosePopupByOverlay,
}) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_image`}
      onClick={handleClosePopupByOverlay}
    >
      <div className="popup__container popup__container_image">
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__title">{card.name}</h2>
        <button
          className="popup__close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
