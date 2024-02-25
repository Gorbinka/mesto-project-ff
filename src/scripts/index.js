import { deleteCard, createCard, likeCard} from "./card.js";//Импорт функций создания и удаления карточек
import { initialCards } from "./cards.js";//Импорт картинок карточек
import { openModal, closeModal, closeModalWithClick, closeModalWithEsc } from "./modal.js";//Импорт функций закрытия и открытия модальных окон
import '../pages/index.css';

export { cardTemplate };

const cardTemplate = document.querySelector('#card-template').content;

const cardList = document.querySelector('.places__list');

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
popups.forEach(function (popup) {
	popup.addEventListener("click", closeModalWithClick);
	popup.addEventListener("click", closeModalWithEsc);
});

//Обработчик события редактирования профиля
buttonEdit.addEventListener("click", () => {
	editProfileNameInput.value = editProfileName.textContent;
	editProfileDescInput.value = editProfileDesc.textContent;
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
	formNewPlace.reset();
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
	cardList.prepend(newCard);
	handleFormSubmit(evt);
});
//Добавление карточек при входе на сайт
initialCards.forEach(function (element) {
	const template = createCard(element, deleteCard, likeCard, openCard);
	cardList.append(template);
});