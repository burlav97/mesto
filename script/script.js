const popup = document.querySelector('.popup');
let popupEdit = document.querySelector('.popup_type_edit');
let popupAdd = document.querySelector('.popup_type_add');
let popupImage = document.querySelector('.popup_type_image');
const openButtonEdit = document.querySelector('.profile__button-edit');
const openButtonAdd = document.querySelector('.profile__button-add');
const closeButtonEdit = document.querySelector('.popup__button-close-edit');
const closeButtonAdd = document.querySelector('.popup__button-close-add');
const closeButtonImage = document.querySelector('.popup__button-close-image');


let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__item_el_name');
let jobInput = document.querySelector('.popup__item_el_about-yourself');



// Открытие и закрытие формы ФУНКЦИИ
function popupEditOpen() {
    popupEdit.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}
function popupAddOpen() {
  popupAdd.classList.add('popup_opened');
}
function popupImageOpen() {
  popupImage.classList.add('popup_opened');
}
function popupEditClose() {
  popupEdit.classList.remove('popup_opened');
}
function popupAddClose() {
  popupAdd.classList.remove('popup_opened');
}
function popupImageClose() {
  popupImage.classList.remove('popup_opened');
}

// Находим форму в DOM
let formElementEdit = document.querySelector('.popup__container_edit');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;

  popupEditClose();
}

// Массив карточек
let initialCards = [
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

  let cardsContainer = document.querySelector('.cards');
  let formElementAdd = popupAdd.querySelector('.popup__container_add');

function makeCards(item) {
  let placeTemplate = document.querySelector('#place-template').content;
  let placeElement = placeTemplate.cloneNode(true);
  let cardsContainer = document.querySelector('.cards');
  let removeButton =  placeElement.querySelector('.cards__button-delete');

  //Добавление элемента
  placeElement.querySelector('.cards__title').textContent = item.name;
  placeElement.querySelector('.cards__image').src = item.link;

  //LIKE
   placeElement.querySelector('.cards__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('cards__button-like_active');
   });

   //Удаление элементов
  removeButton.addEventListener('click', function () {
    let deleteElement = removeButton.closest('.cards__item');
    deleteElement.remove();
  });

  let imagePopup = document.querySelector('.popup__image')
  let subtitlePopup = document.querySelector('.popup__subtitle')

  //Увеличение картинки
  placeElement.querySelector('.cards__image').addEventListener('click', function() {
    popupImageOpen()
    imagePopup.src = item.link;
    subtitlePopup.textContent = item.alt;
  });

  //Вставляем карточки в начало массива
  cardsContainer.prepend(placeElement);
}

//Функцию для всего массива
initialCards.forEach(makeCards);


//Обработчики форм
//Функция добавления карточки
formElementAdd.addEventListener('submit', function(evt) {
  evt.preventDefault();

  //Значения из POPUP
  const name = popupAdd.querySelector('.popup__item_el_title');
  const link = popupAdd.querySelector('.popup__item_el_link');

  //Передаем значения функции
  el = {name: name.value, link: link.value};
  makeCards(el);

  //Закрываем POPUP
  popupAdd.classList.remove('popup_opened');

  //Очищаем поля ввода
  popupAdd.querySelector('.popup__item_el_link').value = '';
  popupAdd.querySelector('.popup__item_el_title').value = '';
});


formElementEdit.addEventListener('submit', formSubmitHandler);



// Открытие и закрытие POPUP
openButtonEdit.addEventListener('click', popupEditOpen);
openButtonAdd.addEventListener('click', popupAddOpen);
closeButtonEdit.addEventListener('click', popupEditClose);
closeButtonAdd.addEventListener('click', popupAddClose);
closeButtonImage.addEventListener('click', popupImageClose);

