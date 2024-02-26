import { deleteCard, createCard, likeCard} from "./card.js";//Импорт функций создания и удаления карточек
import { initialCards } from "./cards.js";//Импорт картинок карточек

//import { openModal, closeModal,closeModalWithClick} from "./modal.js";//Импорт функций закрытия и открытия модальных окон
import { openModal, closeModal, setCloseModalByClickListeners } from "./modal.js";
import '../pages/index.css';
export { cardTemplate };

const cardTemplate = document.querySelector('#card-template').content;

const cardsContainer = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

const popupEdit = document.querySelector(".popup_type_edit");

const popupNewCard = document.querySelector(".popup_type_new-card");
//Для просмотра карточки
const popupImage = document.querySelector(".popup_type_image");
const popupImageSrc = popupImage.querySelector(".popup__image");
const popupImageText = popupImage.querySelector(".popup__caption");

const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
//Для изменения профиля
const formEditProfile = document.forms["edit-profile"];
const editProfileNameInput = formEditProfile.elements["name"];
const editProfileDescInput = formEditProfile.elements["description"];

const editProfileName = document.querySelector(".profile__title");
const editProfileDesc = document.querySelector(".profile__description");
//Для создания новой карточки
const formNewPlace = document.forms["new-place"];
const formNewPlaceName = formNewPlace.elements["place-name"];
const formNewPlaceLink = formNewPlace["link"];

//Обработчик закрытия попапов
// popups.forEach(function (popup) {
// 	popup.addEventListener("click", closeModalWithClick);
// });

setCloseModalByClickListeners(popups);

function copyInfoProfile() {
	editProfileNameInput.value = editProfileName.textContent;
	editProfileDescInput.value = editProfileDesc.textContent;
}

//Обработчик события редактирования профиля
buttonEdit.addEventListener("click", () => {
	copyInfoProfile();
	openModal(popupEdit);
});
//Сохранение изменений в профиле
formEditProfile.addEventListener("submit", (evt) => {
	editProfileName.textContent = editProfileNameInput.value;
	editProfileDesc.textContent = editProfileDescInput.value;
	handleFormSubmit(evt);
});
//Функия автоматического закрытия попапа
function handleFormSubmit(evt) {
	evt.preventDefault();
	closeModal(evt.target.closest(".popup"));
}

//Обработчик события добавления новой карточки
buttonAdd.addEventListener("click", () => {
	openModal(popupNewCard);
});

//Открытие карточки
function openCard(card) {
	popupImageSrc.src = card.link;
	popupImageSrc.alt = card.name;
	popupImageText.textContent = card.name;
	openModal(popupImage);
};
//Добавление функционала карточки
formNewPlace.addEventListener("submit", (evt) => {
	const newCard = 
	createCard( {name:formNewPlaceName.value, link: formNewPlaceLink.value},
		deleteCard,
		likeCard,
		openCard);
		cardsContainer.prepend(newCard);
	handleFormSubmit(evt);
	formNewPlace.reset();
});
//Добавление карточек при входе на сайт
initialCards.forEach(function (element) {
	const card = createCard(element, deleteCard, likeCard, openCard);
	cardsContainer.append(card);
	
});