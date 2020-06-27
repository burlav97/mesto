export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._handleEscClose = (event) => {
      if (event.keyCode == 27) {
        this.close();
      }
    }
    this._handleOverlayClick = (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    }
  }
  open() {
    this._selectorPopup.classList.add('popup_opened');
    this._setEventListeners();
  }
  close() {
    this._selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('click', this._handleOverlayClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _setEventListeners() {
    const closeButton = this._selectorPopup.querySelector('.popup__button-close ');
    closeButton.addEventListener('click', () => this.close());
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClick);
  }
}
