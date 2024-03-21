export { openModal, closeModal, setCloseModalByClickListeners };
function openModal(element) {
  element.classList.add("popup_is-opened", "popup_is-animated");
  document.addEventListener("keydown", closeModalWithEsc);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalWithEsc);
}

function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}

function closeModalByOverlay(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}

function setCloseModalByClickListeners(popups) {
  popups.forEach((popup) => {
    const btn = popup.querySelector(".popup__close");
    popup.addEventListener("click", closeModalByOverlay);
    btn.addEventListener("click", () => closeModal(popup));
  });
}
