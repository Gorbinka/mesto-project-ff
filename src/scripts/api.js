// authorization : 'c5d4f7a1-631c-48ef-91bb-5273f14cc03e'                         // Токен
// wff-cohort-8                                                                   // Идентификатор группы
// https://mesto.nomoreparties.co/v1/wwf-cohort-8                                  // адрес сервера

const config = {
	baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-8',
	headers: {
	  authorization: 'c5d4f7a1-631c-48ef-91bb-5273f14cc03e',
	  'Content-Type': 'application/json',
	},
  };

function checkResponse(response) {
	if (response.ok) {
		return response.json();
	}
	else {
		return Promise.reject(`Ошибка: ${response.status}`);
	}
  }

export function getProfileFromServer() {
	return fetch(`${config.baseUrl}/users/me`, {
		method: "GET",
		headers:config.headers,
	})
	.then(checkResponse);
}

export function getInitialCardsFromServer() {
	return fetch(`${config.baseUrl}/cards`, {
	  headers: config.headers,
	})
	.then(checkResponse);
  }

export function editProfileUpdateWithServer(profile) {
	return fetch(`${config.baseUrl}/users/me`, {
		method : "PATCH", 
		headers : config.headers,
		body : JSON.stringify({
			name: profile.name,
			about:profile.about,
		}),
	})
	.then(checkResponse);
}

export function createNewCardWithServer(newCard) {
	return fetch(`${config.baseUrl}/cards`, {
		method: "POST",
		headers: config.headers,
		body: JSON.stringify({
			name: newCard.name,
			link: newCard.link,
		}),
	})
	.then(checkResponse);
}

export function deleteCardWithServer(cardId) {
	return fetch(`${config.baseUrl}/cards/${cardId}`, {
		method: "DELETE",
		headres: config.headers,
	})
	.then(checkResponse);
}

export function addLikeWithServer(cardID) {
	return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
		method: "PUT",
		headers:config.headers,
	})
	.then(checkResponse);
}

export function deleteLikeWithServer(cardID) {
	return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
		method: "DELETE",
		headers: config.headers,
	})
	.then(checkResponse);
}

export function editAvatarWithServer(avatarUrl) {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: "PATCH",
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatarUrl
		})
	})
	.then(checkResponse);
}