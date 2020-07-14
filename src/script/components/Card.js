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
      .content.querySelector(".cards__item")
      .cloneNode(true);

    return cardElement; // вернём DOM-элемент карточки
  }

  _checkCard() {
    if (this._owner === this._userId) {
      return;
    } else {
      this._element.querySelector('.cards__button-delete').style.display = 'none';
    }
  }

  _likeCard() {
    if (Array.from(this._likes).some((user) =>
        (user._id === this._userId))) {
      this._element.querySelector('.cards__button-like').classList.add('cards__button-like_active');
    }
  }

  cardLike(sum) { //функция лайков
    const likesSum = this._element.querySelector('.cards__like-sum')
    this._element.querySelector(".cards__button-like").classList.toggle("cards__button-like_active");
    if (sum === 0) {
      likesSum.style.display = 'none';
    } else {
      likesSum.style.display = 'block';
      likesSum.textContent = sum;
    }
  }

  cardDelete() {//функция удаления карточки
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__button-like")
      .addEventListener("click", () => {
        this._clickLike();
      });

    this._element
      .querySelector(".cards__button-delete")
      .addEventListener("click", () => {
        this._handleCardDelete()
      });


    this._element
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleCardClick();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const likesSum = this._element.querySelector('.cards__like-sum')

    const cardImg = this._element.querySelector(".cards__image");
    this._element.querySelector(".cards__title").textContent = this._name; 

    cardImg.src = this._link;
    cardImg.alt = this._name;
  
    this._checkCard(this._owner)
    this._likeCard(this._id)

    if (this._likes.length === 0) {
      likesSum.style.display = 'none';
    }
    likesSum.textContent = this._likes.length;
    return this._element;
  }
}