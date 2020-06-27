import './index.css'
import Card from '../script/components/Card.js'
import FormValidator from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import UserInfo from '../script/components/UserInfo.js';
import {
  placeTemplate,
  cardsContainer,
  openButtonAdd,
  popupAdd,
  openButtonEdit,
  popupEdit,
  popupImageZoom,
  nameInput,
  jobInput,
  userName,
  userJob,
  initialCards,
} from '../script/utils/constants.js';

const popupImage = new PopupWithImage(popupImageZoom);

const userInfo = new UserInfo({
  nameUser: userName,
  jobUser: userJob,
});

const popupEditForm = new PopupWithForm({
  handleFormSubmit: (item) => {
    userInfo.setUserInfo(item);
  }
}, popupEdit);

const popupEditProfile = () => {          
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  jobInput.value = infoUser.job;
  popupEditForm.open();
};


const defaultCardList = new Section({    
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupImage.open(item);
      }
    }, placeTemplate);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardsContainer);

const formAddCard = new PopupWithForm({   
  handleFormSubmit: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        popupImage.open(item);
      }
    }, placeTemplate);
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, popupAdd);

const openAddCardHandler = () => {    
  formAddCard.open();
};

function formValidation() { 
  const formList = Array.from(document.querySelectorAll(".popup__form")); // сделаем из них массив методом Array.from
  formList.forEach((form) => { 
    const validator = new FormValidator({ 
      inputSelector: '.popup__item',
      submitButtonSelector: '.popup__button-save',
      inactiveButtonClass: 'popup__button-save_disabled',
      inputErrorClass: 'popup__item_type_error',
      errorClass: 'popup__item-error_active',
    }, form);
    validator.enableValidation();
  });
}

// Открытие и закрытие POPUP
openButtonEdit.addEventListener('click', popupEditProfile);
openButtonAdd.addEventListener('click', openAddCardHandler);
//отображение исходных карточек
defaultCardList.renderItems(initialCards);

//Валидация форм
formValidation();


