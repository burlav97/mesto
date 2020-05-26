const validObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
}

const showInputError = (formElement, inputElement, errorMessage, objects) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(objects.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(objects.errorClass);
};



const hideInputError = (formElement, inputElement, objects) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(objects.inputErrorClass);
  errorElement.classList.remove(objects.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, objects) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, objects);
  } else {
    hideInputError(formElement, inputElement, objects);
  }
};

const setEventListeners = (formElement, objects) => {
  const inputList = Array.from(formElement.querySelectorAll(objects.inputSelector));
  const buttonElement = formElement.querySelector(objects.submitButtonSelector);
 //toggleButtonState(inputList,buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, objects);
      toggleButtonState(inputList,buttonElement, objects);
    });
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};



const enableValidation = (objects) => {
  const formList = Array.from(document.querySelectorAll(objects.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, objects);
    });


};
const toggleButtonState = (inputList, buttonElement, objects) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objects.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(objects.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};
enableValidation(validObject);
