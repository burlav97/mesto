export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._handleCardClick = handleCardClick;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }

  _like(evt) {
    evt.target.classList.toggle('cards__button-like_active');
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector('.cards__button-like');
    const buttonDelete = this._element.querySelector('.cards__button-delete');
    const imageCard = this._element.querySelector('.cards__image');

    imageCard.addEventListener("click", () => { this._handleCardClick(); });
    buttonLike.addEventListener('click', this._like);
    buttonDelete.addEventListener('click', (event) => {
      buttonLike.removeEventListener('click', () => {
        this._like()
      });
      event.target.closest('.cards__item').remove();
    }, { once: true })
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

