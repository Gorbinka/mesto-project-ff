import { enableValidation, clearValidation } from "./validation.js";
import { deleteCard, createCard, likeCard } from "./card.js"; //Импорт функций создания и удаления карточек
import {
  openModal,
  closeModal,
  setCloseModalByClickListeners,
} from "./modal.js";
import "../pages/index.css";
import { getProfileFromServer,
  getInitialCardsFromServer,
  editProfileUpdateWithServer,
  createNewCardWithServer,
  editAvatarWithServer
} from "./api.js"

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId;

const nameInput = document.querySelector(".popup__input_type_name");
const descInput = document.querySelector(".popup__input_type_description");
const editProfileName = document.querySelector(".profile__title");
const editProfileDesc = document.querySelector(".profile__description");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupNewCard = document.querySelector(".popup_type_new-card");
const buttonAdd = document.querySelector(".profile__add-button");
const formEditProfile = document.forms["edit-profile"];
const buttonsClosePopup = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup_type_image");

const formNewPlace = document.forms["new-place"];
const photoInput =formNewPlace.querySelector(".popup__input_type_url");
const placeInput =  formNewPlace.querySelector(".popup__input_type_card-name");
const popupImageSrc = popupImage.querySelector(".popup__image");
const popupImageText = popupImage.querySelector(".popup__caption");
const cardsContainer = document.querySelector(".places__list");

const avatarImage = document.querySelector(".profile__image");

const popupEditProfileAva = document.querySelector(".popup_type_edit-avatar");
const editAvaForm = popupEditProfileAva.querySelector(".popup__form");
const avaFormInput = editAvaForm.querySelector(".popup__input_type_url");

enableValidation(validationConfig);


Promise.all([getProfileFromServer(), getInitialCardsFromServer()])
  .then(([userData, cards]) => {
    editProfileName.textContent = userData.name;
    editProfileDesc.textContent = userData.about;
    avatarImage.style.backgroundImage = `url(${userData.avatar})`;

    userId = userData._id;

    cards.forEach((card) => renderCard(card));
  })
  .catch(console.error);

function renderCard(card) {
  const newCard = createCard(
    card,
    openImagePopup,
    deleteCard,
    likeCard,
    userId
  );

  cardsContainer.append(newCard);
}

function addNewCard(item, deleteCard, likeCard, userId) {
  const newCard = createCard(
    item,
    openImagePopup,
    deleteCard,
    likeCard,
    userId
  );

  cardsContainer.prepend(newCard);
}

function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  
  evt.submitter.textContent = "Сохранение...";
  
  editProfileUpdateWithServer({ name: nameInput.value, about: descInput.value })
  .then((data) => {
    editProfileName.textContent = data.name;
    editProfileDesc.textContent = data.about;
    
    closeModal(evt.target.closest(".popup"));
  })
  .catch(console.error)
  .finally(() => {
    evt.submitter.textContent = "Сохранить";
  });
}

function openEditPopup() {
  nameInput.value = editProfileName.textContent;
  descInput.value = editProfileDesc.textContent;
  openModal(popupEdit);
  clearValidation(formEditProfile, validationConfig);
}

function openAddPopup() {
  formNewPlace.reset();
  openModal(popupNewCard);
  clearValidation(formNewPlace, validationConfig);
}

function openImagePopup(card) {
  popupImageSrc.src = card.link;
  popupImageSrc.alt =card.name;
  popupImageText.textContent = card.name;
  
  openModal(popupImage);
}

  avatarImage.addEventListener("click", () => {
    editAvaForm.reset();
    openModal(popupEditProfileAva);
    clearValidation(editAvaForm, validationConfig);
  });
  
  function submitAvaForm(evt) {
    evt.preventDefault();
    evt.submitter.textContent = "Сохранение...";
    editAvatarWithServer(avaFormInput.value)
      .then((data) => {
        avatarImage.style.backgroundImage = `url('${data.avatar}')`;
        closeModal(popupEditProfileAva);
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => {
        evt.submitter.textContent = "Сохранить";
      });
  }
  
  buttonAdd.addEventListener("click", () => {
    formNewPlace.reset();
    openModal(popupNewCard);
    clearValidation(formNewPlace, validationConfig);
  });
      
    function handleFormSubmitAdd(evt) {
      evt.preventDefault();
      
      evt.submitter.textContent = "Сохранение...";
      
      createNewCardWithServer({ name: placeInput.value, link: photoInput.value })
      .then((card) => {
        addNewCard(card, deleteCard, likeCard, userId);
        placeInput.value = "";
        photoInput.value = "";
        
        closeModal(popupNewCard);
      })
      .catch(console.error)
      .finally(() => {
        evt.submitter.textContent = "Сохранить";
      });
    }
    
    formEditProfile.addEventListener("submit", handleFormSubmitEdit);
    
    formNewPlace.addEventListener("submit", handleFormSubmitAdd);
    
    editAvaForm.addEventListener("submit", submitAvaForm);
    
    buttonEdit.addEventListener("click", openEditPopup);
    
    buttonAdd.addEventListener("click", openAddPopup);
        
    enableValidation(validationConfig);
    setCloseModalByClickListeners(buttonsClosePopup);
    