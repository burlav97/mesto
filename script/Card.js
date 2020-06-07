import {imagePopup, subtitlePopup, togglePopup, popupImage} from './index.js';
export class Card {
constructor(data, cardSelector) {
  this._name = data.name;
  this._link = data.link;
  this._alt = data.alt;
	this._cardSelector = cardSelector;
}
_getTemplate() {
  const element = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.cards__item')
    .cloneNode(true);

  return element;

}

_like(evt) {
  evt.target.classList.toggle('cards__button-like_active');
 };

_zoomImage(event) {
  imagePopup.src = event.target.src;
  subtitlePopup.textContent = event.target.alt;
  togglePopup(popupImage);
 }

_setEventListeners() {
  this._element.querySelector('.cards__image').addEventListener('click', this._zoomImage);
  this._element.querySelector('.cards__button-like').addEventListener('click', this._like);

  this._element.querySelector('.cards__button-delete').addEventListener('click', (event) =>  {

    this._element.querySelector('.cards__button-like').removeEventListener('click', () => {
      this._like()});
    this._element.querySelector('.cards__image').removeEventListener('click', () => {
      this._zoomImage()});
      event.target.closest('.cards__item').remove();

  }, { once: true })
}


generateCard() {
  this._element = this._getTemplate();

  this._element.querySelector('.cards__image').src = this._link;
  this._element.querySelector('.cards__image').alt = this._alt;
  this._element.querySelector('.cards__title').textContent = this._name;

  this._setEventListeners();

  return this._element;
}

}

