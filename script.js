const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__button-edit');
const closeButton = document.querySelector('.popup__button-close');

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

// Находим форму в DOM
let formElement = document.querySelector('.popup__container');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.


    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;

    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
openButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

