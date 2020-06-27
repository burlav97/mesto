import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, selectorPopup) {
    super(selectorPopup);
    this._handleFormSubmit = handleFormSubmit;
    this._submit = (evt) => { // добавляет обработчик сабмита формы. 
      evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы. Так мы можем определить свою логику отправки.
      this._handleFormSubmit(this._getInputValues());
      this.close();
    };
  }
  _getInputValues() {
    this._inputList = this._selectorPopup.querySelectorAll('.popup__item');
    console.log(this._inputList);

    this._formValues = {};
    this._inputList.forEach((input) => { this._formValues[input.name] = input.value; });

    return this._formValues;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._selectorPopup.querySelector('.popup__container').addEventListener('submit', this._submit);
  }
  close() {
    super.close();
    this._selectorPopup.querySelector('.popup__container').reset();
    this._selectorPopup.querySelector('.popup__container').removeEventListener('submit', this._submit);
  }
}
