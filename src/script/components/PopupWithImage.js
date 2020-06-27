import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup)
  }
  open(data) {    
    const imagePopup = this._selectorPopup.querySelector('.popup__image');
    const subtitlePopup = this._selectorPopup.querySelector('.popup__subtitle');
    imagePopup.src = data.link;
    imagePopup.alt = data.alt;
    subtitlePopup.textContent = data.name;
    super.open();
  }
}
