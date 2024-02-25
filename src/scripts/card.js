export { deleteCard, createCard, likeCard };
import { cardTemplate } from "./index.js"
//Функция удаления карточки 
function deleteCard(evt) {
	const item = evt.target.closest('.card');
	item.remove();
};
//Функция, дающая возможность поставить "лайк"
function likeCard (evt) {
	evt.target.classList.toggle("card__like-button_is-active");
};

function createCard (element, deleteCard, likeCard, openCard) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
	const cardImage = cardElement.querySelector(".card__image");
	const cardDescription = cardElement.querySelector(".card__title");

	cardImage.src = element.link;
	cardImage.alt = element.name;
	cardDescription.textContent = element.name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', deleteCard);

	const likeButton = cardElement.querySelector(".card__like-button");
	likeButton.addEventListener('click', likeCard);

	cardImage.addEventListener("click", function() {
		openCard(element);
	});
	
	return cardElement;
};