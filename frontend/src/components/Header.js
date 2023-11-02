import logo from "../images/logo.svg";
import { Link, Routes, Route } from "react-router-dom";

export default function Header({ email, onLogout }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Место" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link to={"/sign-up"} className="header__link">
              Зарегистрироваться
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to={"/sign-in"} className="header__link">
              Войти
            </Link>
          }
        />

        <Route
          path="/"
          element={
            email && (
              <>
                <div className="header__container">
                  <p className="header__text">{email}</p>
                  <button
                    className="header__button"
                    aria-label="Выйти"
                    type="button"
                    onClick={onLogout}
                  >
                    Выйти
                  </button>
                </div>
                <button className="header__menu-button"></button>
              </>
            )
          }
        />
      </Routes>
    </header>
  );
}
