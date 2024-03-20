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

export { cardTemplate };

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardTemplate = document.querySelector("#card-template").content;

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
const buttonsClosePopup = document.querySelectorAll(".popup__close");
const popupImage = document.querySelector(".popup_type_image");
const formNewPlace = document.forms["new-place"];
const photoInput = addForm.querySelector(".popup__input_type_url");
const placeInput = addForm.querySelector(".popup__input_type_card-name");//
const popupImageSrc = popupImage.querySelector(".popup__image");
const popupImageText = popupImage.querySelector(".popup__caption");
const cardsContainer = document.querySelector(".places__list");

const avatarPopup = document.querySelector(".popup_type_avatar-edit");
const avatarForm = document.forms["new-avatar"];
const openAvatarPopupButton = document.querySelector(".profile__avatar-edit");
const avatarImage = document.querySelector(".profile__image");
const avatarInput = avatarForm.querySelector(".popup__input_type_url");


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

  listElement.prepend(newCard);
}

function openImagePopup(card) {
  popupImageSrc.src = card.link;
  popupImageSrc.alt =card.name;
  popupImageText.textContent = card.name;
  
  openModal(popupImage);
}

function openAvatarPopup() {
  openModal(avatarPopup);
  clearValidation(avatarForm, validationConfig);
}

  function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    
    evt.submitter.textContent = "Сохранение...";
    
    editProfileUpdateWithServer({ name: nameInput.value, about: jobInput.value })
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
  
  function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    const avatarUrl = avatarInput.value;
    evt.submitter.textContent = "Сохранение...";
    
    editAvatarWithServer(avatarUrl)
    .then((data) => {
      avatarImage.style.backgroundImage = `url(${data.avatar})`;
      
      closeModal(avatarPopup);
    })
    .catch(console.error)
    .finally(() => {
      evt.submitter.textContent = "Сохранить";
    });
  }
  
  function openEditPopup() {
    openModal(popupEdit);
    clearValidation(formEditProfile, validationConfig);
  
    nameInput.value = editProfileName.textContent;
    descInput.value = editProfileDesc.textContent;
  }

  function openAddPopup() {
    openModal(popupNewCard);
    clearValidation(formNewPlace, validationConfig);
  }
  function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    
    evt.submitter.textContent = "Сохранение...";
  
    createNewCardWithServer({ name: placeInput.value, link: photoInput.value })
      .then((card) => {
        addNewCard(card,  deleteCard, likeCard, userId);
  
        closeModal(popupNewCard);
      })
      .catch(console.error)
      .finally(() => {
        evt.submitter.textContent = "Сохранить";
      });
  }

  formEditProfile.addEventListener("submit", handleFormSubmitEdit);

  formNewPlace.addEventListener("submit", handleFormSubmitAdd);

  avatarForm.addEventListener("submit", handleFormSubmitAvatar);

  buttonEdit.addEventListener("click", openEditPopup);

  buttonAdd.addEventListener("click", openAddPopup);

  openAvatarPopupButton.addEventListener("click", openAvatarPopup);

  enableValidation(validationConfig);
  setCloseModalByClickListeners(buttonsClosePopup);