export {openModal, closeModal, closeModalWithClick, closeModalWithEsc};

function openModal(element) {
	element.classList.add("popup_is-opened", "popup_is-animated");
	document.addEventListener("keydown", closeModalWithClick);
	document.addEventListener("keydown", closeModalWithEsc);
}

function closeModal(element) {
	element.classList.remove("popup_is-opened");
	document.removeEventListener("keydown", closeModalWithClick);
	document.removeEventListener("keydown", closeModalWithEsc);
}

function closeModalWithEsc(evt) {
	if(evt.key === "Escape") {
		const openedModal = document.querySelector(".popup_is-opened");
		closeModal(openedModal);
	}
}

function closeModalWithClick(evt) {
	if ( evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup_is-opened") ) {
		closeModal(document.querySelector(".popup_is-opened"));
	}
}