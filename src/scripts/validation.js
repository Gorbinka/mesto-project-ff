export {enableValidation,clearValidation};

//Показ ошибки в правильности заполнения формы
const showInputError = (formElement,inputElement,errorMessage,inputErrorClass,errorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(inputErrorClass);
	errorElement.textContent = errorMessage;
	errorElement.classList.add(errorClass);
  };
//Снятие показа ошибки в правильности заполнения формы
const hideInputError = (formElement,inputElement,inputErrorClass,errorClass) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(inputErrorClass);
	errorElement.textContent = "";
	errorElement.classList.remove(errorClass);
  };

const isValid = (formElement,inputElement,inputErrorClass,errorClass) => {
	if(inputElement.validity.patternMismatch) {
		inputElement.setCustomValidity(inputElement.dataset.errorMessage);
	}
	else {
		inputElement.setCustomValidity("");
	}

	if(!inputElement.validity.valid) {
		showInputError(formElement,inputElement,inputElement.validationMessage,inputErrorClass,errorClass);
	}
	else {
		hideInputError(formElement,inputElement,inputErrorClass,errorClass);
	}
  };

const setEventListeners = (formElement,inputSelector,inputErrorClass,errorClass,submitButtonSelector,inactiveButtonClass) => {
	const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
  };
//////////////////////////
  const enableValidation = (validationConfig) => {
	const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
	  formList.forEach((formElement) => {
		formElement.addEventListener("submit", function (evt) {
		  evt.preventDefault();
		});
		setEventListeners(formElement,validationConfig.inputSelector,validationConfig.inputErrorClass
		  ,validationConfig.errorClass,validationConfig.submitButtonSelector,validationConfig.inactiveButtonClass);
	  });
  };

  const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
		})
  };

  const toggleButtonState = (inputList, buttonElement, validationConfig) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add(validationConfig.inactiveButtonClass);
	  } else {
		buttonElement.disabled = false;
		buttonElement.classList.remove(validationConfig.inactiveButtonClass);
	  }
  };

  const clearValidation = (formElement, validationConfig) => {
	const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
	  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
	  buttonElement.classList.add(validationConfig.inactiveButtonClass);
	  buttonElement.disabled = true;

	  inputList.forEach((inputElement) => {
		hideInputError(formElement,inputElement,validationConfig.inputErrorClass,validationConfig.errorClass);
		inputElement.setCustomValidity("");
	  });

	  buttonElement.classList.add(validationConfig.inactiveButtonClass);
  };