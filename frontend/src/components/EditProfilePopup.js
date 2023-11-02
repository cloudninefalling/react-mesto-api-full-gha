import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({
  isOpen,
  onUpdateUser,
  onClose,
  handleClosePopupByOverlay,
}) {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser.name,
        about: currentUser.about,
      });
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"edit-profile"}
      title={"Редактировать профиль"}
      submitBtnText={"Сохранить"}
      onClose={onClose}
      onSubmit={handleSubmit}
      handleClosePopupByOverlay={handleClosePopupByOverlay}
    >
      <input
        className="edit-form__text edit-form__text_input_profile-name"
        type="text"
        placeholder="Имя"
        name="name"
        required
        minLength="2"
        maxLength="40"
        value={values["name"] || ""}
        onChange={handleChange}
      />
      <span className="edit-form__input-error-msg" id="name-error"></span>
      <input
        className="edit-form__text edit-form__text_input_profile-occupation"
        type="text"
        placeholder="О себе"
        name="about"
        minLength="2"
        maxLength="200"
        value={values["about"] || ""}
        onChange={handleChange}
        required
      />
      <span className="edit-form__input-error-msg" id="about-error"></span>
    </PopupWithForm>
  );
}
