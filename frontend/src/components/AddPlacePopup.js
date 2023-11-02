import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
  onAddPlace,
  isOpen,
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

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  React.useEffect(() => {
    if (!isOpen) {
      setValues({});
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={"add-card"}
      title={"Новое место"}
      submitBtnText={"Новое место"}
      onClose={onClose}
      onSubmit={handleSubmit}
      handleClosePopupByOverlay={handleClosePopupByOverlay}
    >
      <input
        className="edit-form__text edit-form__text_input_image-name"
        type="text"
        placeholder="Название"
        name="name"
        required
        minLength="2"
        maxLength="30"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="edit-form__input-error-msg" id="image-name-error"></span>
      <input
        className="edit-form__text edit-form__text_input_image-link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        value={values.link || ""}
        onChange={handleChange}
      />
      <span className="edit-form__input-error-msg" id="image-link-error"></span>
    </PopupWithForm>
  );
}
