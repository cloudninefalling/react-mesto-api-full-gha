import React from "react";

export default function InfoTooltip({
  isOpen,
  image,
  text,
  onClose,
  handleClosePopupByOverlay,
}) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onClick={handleClosePopupByOverlay}
    >
      <div className="popup__container">
        <div
          className="popup__tooltip-image"
          style={{ backgroundImage: `url(${image})` }}
        />
        <h2 className="popup__tooltip-title">{text}</h2>
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
