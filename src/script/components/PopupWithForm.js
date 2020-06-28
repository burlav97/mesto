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
  setEventListeners() {
    super.setEventListeners();
    this._selectorPopup.querySelector('.popup__container').addEventListener('submit', this._submit);
  }
  close() {
    super.close();
    this._selectorPopup.querySelector('.popup__container').reset();
  }
  cleanError() { // функция обнуления ошибок
    const buttonSave = this._selectorPopup.querySelector('.popup__button-save');
    this._selectorPopup.querySelectorAll(".popup__item-error").forEach((span) => {
      span.classList.remove("popup__item-error_active"); //удаляем со спан модификатор с ошибкой
      span.textContent = "";
    });

    this._selectorPopup.querySelectorAll(".popup__item").forEach((input) => {
      if (!input.value) { //если в инпут нет значений
        buttonSave.classList.add('popup__button-save_disabled'); //добавляем класс деактивирующий кнопку
        buttonSave.setAttribute('disabled', 'true');
      } else {
        buttonSave.classList.remove('popup__button-save_disabled'); //удаляет класс деактивирующий кнопку
        buttonSave.removeAttribute('disabled');
      }
      input.classList.remove("popup__item_type_error"); //удаляем с инпут модификатор с ошибкой
    });
  }
}