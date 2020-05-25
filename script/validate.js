const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__item_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__item-error_active');
};



const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__item_type_error');
  errorElement.classList.remove('popup__item-error_active');
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
  const buttonElement = formElement.querySelector('.popup__button-save');
 //toggleButtonState(inputList,buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList,buttonElement);
    });
  });
};


const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};



const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    });


};
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__button-save_disabled');
    buttonElement.disabled = false;
  }
};
enableValidation()
