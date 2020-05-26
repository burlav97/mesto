formElementAdd.addEventListener('submit', popupAddCard);
function escClose (popupElement) {
  if ((evt.key)==='Esc') {
    togglePopup(popupElement)
      }
}
popupAdd.addEventListener('keydown', escClose(popupAdd));
formElementEdit.addEventListener('submit', formSubmitHandler);
document.addEventListener('click', function(evt) {
  if(!evt.target === formElementAdd) {
    togglePopup(popupAdd)
  }
});
//function keyHandler(evt) {
  //if (evt.key === 'Esc' && !evt.target === popupContainer) {
    //togglePopup(popupAdd)
 // }
//}






















document.addEventListener('click', function(e){
    if((!e.target === popupContainer) && (!e.target == closeButton)
    && (popupContainer.classList.contains('popup_opened'))) {
      popupContainer.classList.remove('popup_opened');
    }
  });

















  window.addEventListener('keydown', function(evt){
    if(evt.keyCode === 27 && popupContainer.classList.contains('popup_opened')) {
      popupContainer.classList.remove('popup_opened');
    }
  });















  const escClose = (popupEl) => {
    document.addEventListener('keydown', evt => {
      console.log(evt);
      if(evt.key === 'Escape') {
        togglePopup(popupEl);
         console.log(evt.key)
      };
    });
  };






  //Закрытие через клик
  function clickClose (popupElement) {
    popupElement.addEventListener('click', function (evt) {
      if (!formElementImage.contains(evt.target)) {
        togglePopup(popupElement)
      };
    });
    };

  clickClose(popupEdit);
  clickClose(popupAdd);
  clickClose(popupImage);



  popupEdit.addEventListener('click', function (evt) {
    if (!formElementEdit.contains(evt.target)) {
      togglePopup(popupEdit)
    }
  })
  popupAdd.addEventListener('click', function (evt) {
    if (!formElementAdd.contains(evt.target)) {
      togglePopup(popupAdd)
    }
  })

















  function escClose (popupElement) {

    window.onkeydown = function( evt ) {
      if ((evt.keyCode == 27 ) && (popupElement.classList.contains('popup_opened'))){
      popupElement.classList.remove('popup_opened')
      };
    };
    };
  //escClose(popupEdit);
  escClose(popup);
  //escClose(popupImage);
