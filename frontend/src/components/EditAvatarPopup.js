import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  onUpdateAvatar,
  isOpen,
  onClose,
  handleClosePopupByOverlay,
}) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  React.useEffect(() => {
    if (!isOpen) avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"edit-avatar"}
      title={"Обновить аватар"}
      submitBtnText={"Сохранить"}
      onClose={onClose}
      onSubmit={handleSubmit}
      handleClosePopupByOverlay={handleClosePopupByOverlay}
    >
      <input
        className="edit-form__text edit-form__text_input_image-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="avatar-link"
        required
        ref={avatarRef}
      />
      <span
        className="edit-form__input-error-msg"
        id="avatar-link-error"
      ></span>
    </PopupWithForm>
  );
}
