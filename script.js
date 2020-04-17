let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__button_action_edit');
let closeButton = document.querySelector('.popup__button_action_close');

let userName = document.querySelector('.profile__title');
let userJob = document.querySelector('.profile__subtitle');
let nameInput = document.querySelector('.popup__item_el_name');
let jobInput = document.querySelector('.popup__item_el_about-yourself');

// Открывание и закрывание формы
function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}
function popupClose() {
    popup.classList.remove('popup_opened');
 
}
openButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__item_el_name');
    let jobInput = document.querySelector('.popup__item_el_about-yourself');
    
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
