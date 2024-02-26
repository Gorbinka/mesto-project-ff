//export {openModal, closeModal, closeModalWithClick};
export {openModal, closeModal, setCloseModalByClickListeners};
function openModal(element) {
	element.classList.add("popup_is-opened", "popup_is-animated");
	//document.addEventListener("click", closeModalWithClick);
	document.addEventListener("keydown", closeModalWithEsc);
}

function closeModal(element) {
	element.classList.remove("popup_is-opened");
	//document.removeEventListener("click", closeModalWithClick);
	document.removeEventListener("keydown", closeModalWithEsc);
}

function closeModalWithEsc(evt) {
	if(evt.key === "Escape") {
		const openedModal = document.querySelector(".popup_is-opened");
		closeModal(openedModal);
	}
}

// function closeModalWithClick(evt) {
// 	if ( evt.target.classList.contains("popup__close") || evt.target.classList.contains("popup_is-opened") ) {
// 		closeModal(document.querySelector(".popup_is-opened"));
// 	}
// }

function closeModalByOverlay(evt) {
	if ( evt.target.classList.contains("popup_is-opened") ) {
		closeModal(evt.target);
	}
}

function setCloseModalByClickListeners(popups) {
	popups.forEach(popup => {
        const button = popup.querySelector(".popup__close");
        button.addEventListener("click" , closeModal(popup) );

        popup.addEventListener('click', closeModalByOverlay );
    })
}