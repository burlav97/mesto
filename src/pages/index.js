import './index.css'
import Card from '../script/components/Card.js'
import FormValidator from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import UserInfo from '../script/components/UserInfo.js';
import Api from '../script/components/Api.js';
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
  popupAccord,
  popupAvatar,
  openButtonAvatar,
  profileAvatar,
  profileInfo, 
  prepend
} from '../script/utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: '349fcff0-77c4-4e88-a6e9-879b96bc6112',
    'Content-Type': 'application/json'
  }
});

const loading = (isLoading, form, defaultButtonText, loadingMessage) => {
  const currentButton = form.querySelector('.popup__button-save');

  if (isLoading) {
    currentButton.textContent = loadingMessage;
  } else {
    currentButton.textContent = defaultButtonText;
  }
}


const popupImage = new PopupWithImage(popupImageZoom);

const userInfo = new UserInfo( profileInfo, profileAvatar);

const popupEditForm = new PopupWithForm({
  handleFormSubmit: () => {
    loading(true, popupEdit, 'Сохранить', 'Сохранение...');
    api.updateInfo(nameInput.value, jobInput.value)
      .then((result) => {
        userInfo.setUserInfo(result);
        popupEditForm.close();
      })
      
      .finally(() => {
        loading(false, popupEdit, 'Сохранить', 'Сохранение...');
      });
  }
}, popupEdit);

const popupEditProfile = () => {          
  const infoUser = userInfo.getUserInfo();
  nameInput.value = infoUser.name;
  jobInput.value = infoUser.about;
  popupEditForm.cleanError();
  popupEditForm.open();
};


const avatarForm = new PopupWithForm({ //отправляем информацию, введенную пользоавателем на сервер
  handleFormSubmit: (item) => {
    loading(true, popupAvatar, 'Сохранить', 'Сохранение...');
    api.updateAvatar(item.link)
      .then((item) => {
        userInfo.
        setUserAvatar(item);
      })
      .then(() => {
        avatarForm.close();
      })
      .finally(() => {
        loading(false, popupAvatar, 'Сохранить', 'Сохранение...');
      });
  }
}, popupAvatar);

const openAvatarForm = () => {
  avatarForm.open();
  avatarForm.cleanError();
}

let valueCard;
const deleteCardConfirm = new PopupWithForm({
  handleFormSubmit: () => {
    api.deleteCard(valueCard.object._id)
      .then(() => {
        valueCard.class.cardDelete();
        deleteCardConfirm.close();
      })
  }
}, popupAccord);

const addLike = (object) => { //добавление лайка
  api.addLike(object)
    .then((result) => {
      valueCard.class.cardLike(result.likes.length);
    })
};

const deleteLike = (object) => { //удаление лайка
  api.deleteLike(object)
    .then((result) => {
      valueCard.class.cardLike(result.likes.length);
    })
}

const addCards = (card, position) => { //добавление карточки в DOM
  if (position === 'prepend') {
    defaultCardList.addItemPrepend(card);
  } else {
    defaultCardList.addItemAppend(card);
  }
};

const writeValueCard = (object, className) => { //запись значений в текущую карточк
  valueCard = {
    object: object,
    class: className
  };
};

const createCard = (item, userId, position) => { //создание карточки и добавление в разметку
  const card = new Card({
    data: item,
    handleCardClick: () => {
      popupImage.open(item);
    },
    handleCardLike: (cardObject) => {
      if (cardObject.like) {
        deleteLike(cardObject);
      } else {
        addLike(cardObject);
      }
      writeValueCard(item, card);
    },
    handleCardDelete: () => {
      deleteCardConfirm.open();
      writeValueCard(item, card);
    }
  }, placeTemplate, userId);
  const cardElement = card.generateCard();
  addCards(cardElement, position);
};

const cardForm = new PopupWithForm({
  handleFormSubmit: (item) => {
    loading(true, popupAdd, 'Создать', 'Создание...');
    api.addNewCard(item.name, item.link, item.alt)
    //**alt delete/
      .then((result) => {
        createCard(result, result.owner_id, prepend);
        cardForm.close();
      })
      .finally(() => {
        loading(false, popupAdd, 'Создать', 'Создание...');
      });
  }
}, popupAdd);

const openCardForm = () => {
  cardForm.cleanError();
  cardForm.open();
};

const defaultCardList = new Section({ //класс для добавления начальных карточек
  renderer: (item, userId) => {
    createCard(item, userId);
  }
}, cardsContainer);


Promise.all([api.getInfoUser(), api.getInitialCards()]) //загрузка данных профиля и карточек 
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    defaultCardList.renderItems(cards, user._id);
  });





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
openButtonAdd.addEventListener('click', openCardForm);
openButtonAvatar.addEventListener('click', openAvatarForm);

//Валидация форм
formValidation();


