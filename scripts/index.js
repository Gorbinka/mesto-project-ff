// const cardList = document.querySelector('.places__list');

// function CardAdd (name, link) {
// 	const cardTemplate = document.querySelector('#card-template').content;
// 	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

// 	cardElement.querySelector('.card__image').src = link;
// 	cardElement.querySelector('.card__title').textContent = name;

// 	cardList.append(cardElement);

// 	const deleteButton = cardElement.querySelector('.card__delete-button');
// 	deleteButton.addEventListener('click', deleteCard);//Удаление карточки
	
// };

// function deleteCard(evt) {
// 	const item = evt.target.closest('.card');
// 	item.remove();
// };

// initialCards.forEach(function(item){
// CardAdd(item.name,item.link);
// });

//////////////////////////////////////////////////

const cardList = document.querySelector('.places__list');


function deleteCard(evt) {
	const item = evt.target.closest('.card');
	item.remove();
};

function createCard (name, link) {
	const cardTemplate = document.querySelector('#card-template').content;
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

	cardElement.querySelector('.card__image').src = link;
	cardElement.querySelector('.card__title').textContent = name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', deleteCard);//Удаление карточки
	
	return cardElement;
};

function cardAdd(card) {
	cardList.append(card);
};

initialCards.forEach(card => {
	const template = createCard(card.name, card.link);
	cardAdd(template);
});