export default class Card {
  constructor({
    data,
    handleCardClick,
    handleCardLike,
    handleCardDelete
  }, cardSelector, userId) {
    this._name = data.name; 
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._cardSelector = cardSelector; 
    this._clickLike = () => {
      this._handleCardLike({
        id: this._id,
        like: this._element.querySelector('.cards__button-like').classList.contains('cards__button-like_active'),
        likeSum: this._element.querySelector('.cards__like-sum')
      });
    };
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards__item')
      .cloneNode(true);

    return cardElement;
  }
  _checkCard() {
    if (this._owner === this._userId) {
      return;
    } else {
      this._element.querySelector('.cards__button-delete').style.display = 'none';
    }
  }

  _likeCard() {
    if (this._likes.some((user) =>
        (user._id === this._userId))) {
      this._element.querySelector('.cards__button-like').classList.add('cards__button-like_active');
    }
  }

  cardLike(sum) { //функция лайков
    this._element.querySelector('.cards__button-like').classList.toggle('cards__button-like_active');
    if (sum === 0) {
      this._element.querySelector('.cards__like-sum').style.display = 'none';
    } else {
      this._element.querySelector('.cards__like-sum').style.display = 'block';
      this._element.querySelector('.cards__like-sum').textContent = sum;
    }
  }

  cardDelete() {//функция удаления карточки
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector('.cards__button-like');
    const buttonDelete = this._element.querySelector('.cards__button-delete');
    const imageCard = this._element.querySelector('.cards__image');

    imageCard.addEventListener("click",  () => {
      this._handleCardClick();
    });
    buttonLike.addEventListener('click', () => {
        this._clickLike();
      });
    buttonDelete.addEventListener('click', () => {
      this._handleCardDelete()
    })
  }

  generateCard() {
    this._element = this._getTemplate();

    const imageCards = this._element.querySelector('.cards__image');
    const titleCards = this._element.querySelector('.cards__title');

    imageCards.src = this._link;
    imageCards.alt = this._alt;
    titleCards.textContent = this._name;

    this._checkCard(this._owner);
    this._likeCard(this._id);
    if (this._likes.length === 0) {
      this._element.querySelector('.cards__like-sum').style.display = 'none';
    }
    this._element.querySelector('.cards__like-sum').textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}