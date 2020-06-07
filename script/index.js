import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';


const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const openButtonEdit = document.querySelector('.profile__button-edit');
const openButtonAdd = document.querySelector('.profile__button-add');
const closeButtonEdit = document.querySelector('.popup__button-close-edit');
const closeButtonAdd = document.querySelector('.popup__button-close-add');
const closeButtonImage = document.querySelector('.popup__button-close-image');
//Не понимаю с чем это было связано, все работало, вставила тот же код
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__item_el_name');
const jobInput = document.querySelector('.popup__item_el_about-yourself');
// Находим форму в DOM
const formElementEdit = document.querySelector('.popup__container_edit');
// Массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'Архыз'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'Челябинская область'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'Иваново'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'Камчатка'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'Холмогорский район'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'Байкал'
  }
];


const cardsContainer = document.querySelector('.cards');
const formElementAdd = popupAdd.querySelector('.popup__container_add');
const placeTemplate = document.querySelector('#place-template').content;
const imagePopup = document.querySelector('.popup__image');
const subtitlePopup = document.querySelector('.popup__subtitle');

const popupName = popupAdd.querySelector('.popup__item_el_title');
const popupLink = popupAdd.querySelector('.popup__item_el_link');

const validObj = {
formSelector: '.popup__container',
inputSelector: '.popup__item',
submitButtonSelector: '.popup__button-save',
inactiveButtonClass: 'popup__button-save_disabled',
inputErrorClass: 'popup__item_type_error',
errorClass: 'popup__item-error_active'
}
const formElementAddValid = new FormValidator(validObj, formElementAdd);
const formElementEditValid = new FormValidator(validObj, formElementEdit);
// Открытие и закрытие формы ФУНКЦИИ
function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
  if (popupElement.classList.contains('popup_opened')) {
    document.addEventListener('keyup', (event) => escClose(event, popupElement))
  }
  else { document.removeEventListener('keyup', escClose(event, popupElement)) }
};

// Закрытие попапа нажатием Esc
function escClose(event, popupElement) {
  if (event.keyCode == 27) {
    popupElement.classList.remove('popup_opened');
  }
};



const clickClose = (popupEl) => {
  popupEl.addEventListener('click', evt => {

    if (evt.target.matches('.popup')) {
      togglePopup(popupEl);

    };
  });
};
function popupEditProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  togglePopup(popupEdit)
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  togglePopup(popupEdit);
}

function loadCards(cards, container) {
  cards.forEach((item) => {
    const card = new Card(item, '#place-template').generateCard();
    container.prepend(card);
  });

};
//function renderCards(cards) {
  //cardsContainer.prepend(...cards);
//};


//Обработчики форм
//Функция добавления карточки

function popupAddCard(evt) {

  evt.preventDefault();
  togglePopup(popupAdd);

  //Значения из POPUP


  //Передаем значения функции
  const card = new Card({
     name: popupName.value,
     link: popupLink.value,
     alt: popupName.value }, '#place-template').generateCard();
  cardsContainer.prepend(card);

  //Очищаем поля ввода
  popupLink.value = '';
  popupName.value = '';


}


formElementAdd.addEventListener('submit', popupAddCard);
formElementEdit.addEventListener('submit', formSubmitHandler);

// Открытие и закрытие POPUP
openButtonEdit.addEventListener('click', popupEditProfile);
openButtonAdd.addEventListener('click', () => togglePopup(popupAdd));
closeButtonEdit.addEventListener('click', popupEditProfile);
closeButtonAdd.addEventListener('click', () => togglePopup(popupAdd));
closeButtonImage.addEventListener('click', () => togglePopup(popupImage));
clickClose(popupAdd);
clickClose(popupImage);
clickClose(popupEdit);

//renderCards(loadCards(initialCards));
loadCards(initialCards, cardsContainer);
formElementAddValid.enableValidation();
formElementEditValid.enableValidation();
export { imagePopup, subtitlePopup, togglePopup, popupImage };