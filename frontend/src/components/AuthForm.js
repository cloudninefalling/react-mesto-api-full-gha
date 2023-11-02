import React from "react";

export default function AuthForm({ onSubmit, name, title, submitBtnText }) {
  const [values, setValues] = React.useState({});

  function handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <>
      <form
        className="auth-form"
        name={name}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2 className="auth-form__title">{title}</h2>
        <input
          type="email"
          className="auth-form__input"
          placeholder="Email"
          required
          name="email"
          value={values.email || ""}
          onChange={handleChange}
        />
        <input
          type="password"
          className="auth-form__input"
          placeholder="Пароль"
          required
          name="password"
          value={values["password"] || ""}
          onChange={handleChange}
        />
        <button
          className="auth-form__submit"
          type="submit"
          aria-label={submitBtnText}
        >
          {submitBtnText}
        </button>
      </form>
    </>
  );
}
