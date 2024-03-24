import {
  addLikeWithServer,
  deleteLikeWithServer,
  deleteCardWithServer,
} from "./api.js";
export { deleteCard, createCard, likeCard };

const cardTemplate = document.querySelector("#card-template").content;

function createCard(cardData, openCard, deleteCard, likeCard, userId) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDescription = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardDescription.textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = "none";
  }

  deleteButton.addEventListener("click", (event) =>
    deleteCard(event, cardData._id),
  );

  const likeButton = cardElement.querySelector(".card__like-button");

  const myLike = cardData.likes.some(function (like) {
    return like._id === userId;
  });

  if (myLike) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", (event) =>
    likeCard(event, cardData._id),
  );

  const showImage = cardElement.querySelector(".card__image");
  showImage.addEventListener("click", () => openCard(cardData));

  const countLike = cardElement.querySelector(".card__likes-count");
  countLike.textContent = cardData.likes.length;

  return cardElement;
}

function likeCard(event, id) {
  const likeButton = event.target;
  const isLike = likeButton.classList.contains("card__like-button_is-active");
  const countLike = event.target
    .closest(".card")
    .querySelector(".card__likes-count");
  if (isLike) {
    deleteLikeWithServer(id)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        countLike.textContent = res.likes.length;
      })
      .catch(console.error);
  } else {
    addLikeWithServer(id)
      .then((res) => {
        likeButton.classList.add("card__like-button_is-active");
        countLike.textContent = res.likes.length;
      })
      .catch(console.error);
  }
}

function deleteCard(event, id) {
  deleteCardWithServer(id)
    .then(() => {
      const currentDelete = event.target.closest(".places__item");

      currentDelete.remove();
    })
    .catch(console.error);
}
