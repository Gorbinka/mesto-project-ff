const cardList = document.querySelector('.places__list');
// @todo: Темплейт карточки

function addCard (name, link) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	cardElement.querySelector('.card__image').src = link;
	cardElement.querySelector('.card__title').textContent = name;

	cardList.append(cardElement);

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', deleteCard);//Удаление карточки
}

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

function deleteCard(evt) {
	const item = evt.target.closest('.card');
	item.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(function(item){
addCard(item.name, item.link);
});