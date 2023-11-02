import React from "react";

export default function PopupWithForm({
  isOpen,
  name,
  onSubmit,
  title,
  children,
  submitBtnText,
  onClose,
  handleClosePopupByOverlay,
}) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup_${name}`}
      onClick={handleClosePopupByOverlay}
    >
      <div className="popup__container">
        <form
          className="edit-form"
          name={name}
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <h2 className="edit-form__title">{title}</h2>
          {children}

          <button
            className="edit-form__submit"
            type="submit"
            aria-label={submitBtnText}
          >
            {submitBtnText}
          </button>
        </form>
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
