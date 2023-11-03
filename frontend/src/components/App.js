import React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import auth from "../utils/Auth";

function App() {
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [isEditProfileOpen, setEditProfileOpen] = React.useState(false);
  const [isEditAvatarOpen, setEditAvatarOpen] = React.useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isConfirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);

  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [infoTooltipText, setInfoTooltipText] = React.useState("");
  const [infoTooltipImage, setInfoTooltipImage] = React.useState("");

  const [currentUser, setCurrentUser] = React.useState({});
  const [currentEmail, setCurrentEmail] = React.useState("");
  const [isLoggedIn, setLoggedIn] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    //check token
    auth
      .validateToken()
      .then((res) => {
        handleLogin(res.email);
      })
      .catch(console.log);
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      //set initial profile, cards
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then((res) => {
          console.log(res);
          const profileInfo = res[0];
          const cards = res[1].cards;
          setCurrentUser(profileInfo);
          setCards(cards);
        })
        .catch(console.log);
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    if (
      isAddPlaceOpen ||
      isImagePopupOpen ||
      isEditAvatarOpen ||
      isEditProfileOpen ||
      isInfoTooltipOpen ||
      isConfirmDeleteOpen
    ) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [
    isAddPlaceOpen,
    isImagePopupOpen,
    isEditAvatarOpen,
    isEditProfileOpen,
    isInfoTooltipOpen,
    isConfirmDeleteOpen,
  ]);

  function handleLogin(email) {
    setLoggedIn(true);
    setCurrentEmail(email);
    navigate("/", { replace: true });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setCurrentEmail("");
    navigate("/sign-in", { replace: true });
    setLoggedIn(false);
  }

  //popups open-close funtions

  function handleEditProfileClick() {
    setEditProfileOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
  }

  function handleDeleteBtnClick(card) {
    setConfirmDeleteOpen(true);
    setSelectedCard(card);
  }

  function handleOpenTooltip({ image, text }) {
    setInfoTooltipText(text);
    setInfoTooltipImage(image);
    setInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setAddPlaceOpen(false);
    setImagePopupOpen(false);
    setEditAvatarOpen(false);
    setEditProfileOpen(false);
    setConfirmDeleteOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (likedUser) => likedUser._id === currentUser._id
    );

    api
      .toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((cardInState) => {
            return cardInState._id === newCard._id ? newCard : cardInState;
          })
        );
      })
      .catch(console.log);
  }

  function handleCardDelete(card) {
    api
      .deleteImage(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((cardInState) => {
            return cardInState._id !== card._id;
          })
        );
        closeAllPopups();
      })
      .catch(console.log);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setProfileInfo({ name, about })
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  function handleAddPlace({ name, link }) {
    api
      .uploadImage({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(closeAllPopups)
      .catch(console.log);
  }

  const handleEsc = (e) => {
    if (e.key === "Escape") closeAllPopups();
  };

  const handleClosePopupByOverlay = (e) => {
    if (e.target.classList.contains("popup")) closeAllPopups();
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={currentEmail} onLogout={handleLogout} />
        <Routes>
          <Route
            path=""
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={
                  <>
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onEditAvatar={handleEditAvatarClick}
                      onAddPlace={handleAddPlaceClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleDeleteBtnClick}
                      cards={cards}
                    />

                    <Footer />

                    <EditProfilePopup
                      isOpen={isEditProfileOpen}
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}
                      handleClosePopupByOverlay={handleClosePopupByOverlay}
                    />

                    <AddPlacePopup
                      isOpen={isAddPlaceOpen}
                      onClose={closeAllPopups}
                      onAddPlace={handleAddPlace}
                      handleClosePopupByOverlay={handleClosePopupByOverlay}
                    />

                    <EditAvatarPopup
                      isOpen={isEditAvatarOpen}
                      onClose={closeAllPopups}
                      onUpdateAvatar={handleUpdateAvatar}
                      handleClosePopupByOverlay={handleClosePopupByOverlay}
                    />

                    <ConfirmDeletePopup
                      isOpen={isConfirmDeleteOpen}
                      onClose={closeAllPopups}
                      currentCard={selectedCard}
                      onDeleteCard={handleCardDelete}
                      handleClosePopupByOverlay={handleClosePopupByOverlay}
                    />

                    <ImagePopup
                      card={selectedCard}
                      isOpen={isImagePopupOpen}
                      onClose={closeAllPopups}
                      handleClosePopupByOverlay={handleClosePopupByOverlay}
                    />
                  </>
                }
              />
            }
          />
          <Route
            path="sign-in"
            element={
              <Login
                handleLogin={handleLogin}
                openTooltip={handleOpenTooltip}
              />
            }
          />
          <Route
            path="sign-up"
            element={<Register openTooltip={handleOpenTooltip} />}
          />

          <Route path="*" element={<Navigate to="" />} />
        </Routes>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          text={infoTooltipText}
          image={infoTooltipImage}
          onClose={closeAllPopups}
          handleClosePopupByOverlay={handleClosePopupByOverlay}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
