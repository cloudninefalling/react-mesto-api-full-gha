import React from "react";
import AuthForm from "./AuthForm";
import { Link, useNavigate } from "react-router-dom";
import auth from "../utils/Auth";
import tooltipImageSuccess from "../images/tooltip__success.svg";
import tooltipImageError from "../images/tooltip__error.svg";

export default function Register({ openTooltip }) {
  const navigate = useNavigate();

  function onSubmit(values) {
    const { email, password } = values;
    auth
      .register(email, password)
      .then(() => {
        openTooltip({
          text: "Вы успешно зарегистрировались!",
          image: tooltipImageSuccess,
        });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        openTooltip({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          image: tooltipImageError,
        });
      });
  }

  return (
    <>
      <AuthForm
        title="Регистрация"
        submitBtnText="Зарегистрироваться"
        onSubmit={onSubmit}
        name="register"
      />
      <p className="auth-form__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="auth-form__link">
          Войти
        </Link>
      </p>
    </>
  );
}
