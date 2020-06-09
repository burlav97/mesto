import {imagePopup, subtitlePopup} from './index.js';
import { togglePopup, popupImage, escClose} from './utils.js';
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
  imagePopup.alt = event.target.alt;
  subtitlePopup.textContent = event.target.alt;
  togglePopup(popupImage);
 }
_setEventListeners() {
  const imageCards = this._element.querySelector('.cards__image');
  const buttonLike = this._element.querySelector('.cards__button-like');
  const buttonDelete = this._element.querySelector('.cards__button-delete');
  imageCards.addEventListener('click', this._zoomImage);
  buttonLike.addEventListener('click', this._like);
  buttonDelete.addEventListener('click', (event) => {
    const buttonLike = this._element.querySelector('.cards__button-like');
    const imageCards = this._element.querySelector('.cards__image');
    buttonLike.removeEventListener('click', () => {
      this._like()});
   imageCards.removeEventListener('click', () => {
      this._zoomImage()});
      event.target.closest('.cards__item').remove();

  } ,{ once: true })

}
generateCard() {

  this._element = this._getTemplate();
  const imageCards = this._element.querySelector('.cards__image');
  const titleCards = this._element.querySelector('.cards__title');
  imageCards.src = this._link;
  imageCards.alt = this._alt;
  titleCards.textContent = this._name;

  this._setEventListeners();

  return this._element;
}
}

