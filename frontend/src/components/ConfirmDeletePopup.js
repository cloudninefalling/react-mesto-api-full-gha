import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup({
  onDeleteCard,
  currentCard,
  isOpen,
  onClose,
  handleClosePopupByOverlay,
}) {
  function handleCardDelete(e) {
    e.preventDefault();
    onDeleteCard(currentCard);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"confirm-delete"}
      title={"Вы уверены?"}
      submitBtnText={"Да"}
      onSubmit={handleCardDelete}
      onClose={onClose}
      handleClosePopupByOverlay={handleClosePopupByOverlay}
    />
  );
}
