

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const openButtonEdit = document.querySelector('.profile__button-edit');
export const openButtonAdd = document.querySelector('.profile__button-add');

export const userName = document.querySelector('.profile__title');
export const userJob = document.querySelector('.profile__subtitle');
export const nameInput = document.querySelector('.popup__item_el_name');
export const jobInput = document.querySelector('.popup__item_el_about-yourself');
export const popupImageZoom = document.querySelector('.popup_type_image');

// Массив карточек
export const initialCards = [
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
//Для добавления карточек
export const cardsContainer = ('.cards');
export const placeTemplate = ('#place-template');
export const cardsImage = document.querySelector('.cards__image');
export const formElementAdd = popupAdd.querySelector('.popup__container_add');
export const formElementEdit = popupAdd.querySelector('.popup__container_edit');
const popupName = popupAdd.querySelector('.popup__item_el_title');
const popupLink = popupAdd.querySelector('.popup__item_el_link');


//Валидация
const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
}
