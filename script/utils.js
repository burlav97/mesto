export const popupImage = document.querySelector('.popup_type_image');
export function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
  if (popupElement.classList.contains('popup_opened')) {
    document.addEventListener('keyup', (event) => escClose(event, popupElement))
  }
  else { document.removeEventListener('keyup', escClose(event, popupElement)) }
};
// Закрытие попапа нажатием Esc
export function escClose(event, popupElement) {
  if (event.keyCode == 27) {
    popupElement.classList.remove('popup_opened');
  }
};
