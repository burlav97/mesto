import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selectorPopup) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    this._inputList = this._selectorPopup.querySelectorAll('.popup__item');

    this._formValues = {};
    this._inputList.forEach((input) => { this._formValues[input.name] = input.value; });

    return this._formValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._selectorPopup.querySelector('.popup__container').addEventListener('submit',  (evt) => {  
      evt.preventDefault(); 
      this._handleFormSubmit(this._getInputValues());

    });
  }
  close() {
    super.close();
    this._selectorPopup.querySelector('.popup__container').reset();
  }
  open() {
    super.open();
  }
  cleanError() { 
    const buttonSave = this._selectorPopup.querySelector('.popup__button-save');
    this._selectorPopup.querySelectorAll(".popup__item-error").forEach((span) => {
      span.classList.remove("popup__item-error_active"); 
      span.textContent = "";
    });

    this._selectorPopup.querySelectorAll(".popup__item").forEach((input) => {
      if (!input.value) { 
        buttonSave.classList.add('popup__button-save_disabled'); 
        buttonSave.setAttribute('disabled', 'true');
      } else {
        buttonSave.classList.remove('popup__button-save_disabled'); 
        buttonSave.removeAttribute('disabled');
      }
      input.classList.remove("popup__item_type_error"); 
    });
  }
}