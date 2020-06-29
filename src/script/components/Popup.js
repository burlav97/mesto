export default class Popup {
  constructor(selectorPopup) {
    this._selectorPopup = selectorPopup;
    this._handleEscClose = (event) => {
      if (event.key == 'Escape') {
        this.close();
      }
    }
    this._handleOverlayClick = (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    }
    this.setEventListeners();
  }
  open() {
    this._selectorPopup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClick);
  }
  close() {
    this._selectorPopup.classList.remove('popup_opened');
    document.removeEventListener('click', this._handleOverlayClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListeners() {
    const closeButton = this._selectorPopup.querySelector('.popup__button-close ');
    closeButton.addEventListener('click', () => this.close());
  }
}