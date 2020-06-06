export default class Utils {
  constructor() {
    //Error image
    this.errorImageLink =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDDxuIkubELpYS3h54VsoXlcOGeMwwe0Plrx4cHH272FNDc366&usqp=CAU";

    //DOM selectors
    this.selectors = {
      cardTemplateSelector: ".template-card",
      cardElementSelector: ".card",
      cardsWrapperSelector: ".cards",
      imagePopupSelector: ".popup_image",
      profilePopupSelector: ".popup_edit-profile",
      newPlacePopupSelector: ".popup_new-place",
      editBtnSelector: ".button_edit",
      addBtnSelector: ".button_add",
      closeBtnSelector: ".button_close",
      saveBtnSelector: ".button_save",
      likeBtnSelector: ".button_like",
      likeBlackBtnSelector: "button_like-black",
      deleteBtnSelector: ".button_delete",
      nameInputSelector: ".popup__input_name",
      descInputSelector: ".popup__input_desc",
      linkInputSelector: ".popup__input_link",
      nameProfileSelector: ".profile__name",
      descProfileSelector: ".profile__description",
      popupElementClass: "popup",
      popupIsOpenedClass: "popup_is-opened",
      popupIsOpenedSelector: ".popup_is-opened",
      cardTextSelector: ".card__text",
      cardImageSelector: ".card__image",
      popupImageSelector: ".popup__image",
      popupImageTitleSelector: ".popup__image-title",
    };
  }
  //Find element in DOM
  findElement = (parent, selector) => {
    return parent.querySelector(selector);
  };
  // Show/hide popup
  togglePopup = (popup) => {
    popup.classList.toggle(this.selectors.popupIsOpenedClass);
  };
}
