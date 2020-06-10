import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { togglePopup, popupImage, escClose } from './utils.js';


const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const openButtonEdit = document.querySelector('.profile__button-edit');
const openButtonAdd = document.querySelector('.profile__button-add');
const closeButtonEdit = document.querySelector('.popup__button-close-edit');
const closeButtonAdd = document.querySelector('.popup__button-close-add');
const closeButtonImage = document.querySelector('.popup__button-close-image');
const userName = document.querySelector('.profile__title');
const userJob = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__item_el_name');
const jobInput = document.querySelector('.popup__item_el_about-yourself');
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
//Для добавления карточек
const cardsContainer = document.querySelector('.cards');
const formElementAdd = popupAdd.querySelector('.popup__container_add');
const popupName = popupAdd.querySelector('.popup__item_el_title');
const popupLink = popupAdd.querySelector('.popup__item_el_link');
//POPUP zoom
const imagePopup = document.querySelector('.popup__image');
const subtitlePopup = document.querySelector('.popup__subtitle');

//Валидация
const validationConfig = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__item-error_active'
}
const formElementAddValid = new FormValidator(validationConfig, formElementAdd);
const formElementEditValid = new FormValidator(validationConfig, formElementEdit);

// Открытие и закрытие формы ФУНКЦИИ
const clickClose = (popupEl) => {
  popupEl.addEventListener('click', evt => {

    if (evt.target.matches('.popup')) {
      togglePopup(popupEl);
    }
  });
};
//Редактирование профиля
function popupEditProfile() {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  togglePopup(popupEdit)
}
// Обработчик «отправки» формы редактирования
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  togglePopup(popupEdit);
}
//Отображение карточек
function loadCards(cards, container) {
  cards.forEach((item) => {
    const card = new Card(item, '#place-template').generateCard();
    container.prepend(card);
  });
}

//Функция добавления карточки
function popupAddCard(evt) {
  evt.preventDefault();
  togglePopup(popupAdd);
  const card = new Card({
    name: popupName.value,
    link: popupLink.value,
    alt: popupName.value
  }, '#place-template').generateCard();
  cardsContainer.prepend(card);

  //Очищаем поля ввода
  popupLink.value = '';
  popupName.value = '';
}

//Вызовы функций
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
//Добавление карточек
loadCards(initialCards, cardsContainer);
//Валидация форм
formElementAddValid.enableValidation();
formElementEditValid.enableValidation();
export { imagePopup, subtitlePopup, togglePopup, popupImage };
