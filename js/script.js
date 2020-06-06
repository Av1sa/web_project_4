import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { findElement, togglePopup } from "./Utils.js";

//Initial cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

//DOM selectors
const selectors = {
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

//DOM selectors for validation
const settingsObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_save",
  inactiveButtonClass: "button_save-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Popups
const editProfilePopup = findElement(document, selectors.profilePopupSelector);
const newPlacePopup = findElement(document, selectors.newPlacePopupSelector);
const imagePopup = findElement(document, selectors.imagePopupSelector);

//Buttons
const editProfileBtn = findElement(document, selectors.editBtnSelector);
const newPlaceBtn = findElement(document, selectors.addBtnSelector);
const closeEditProfileBtn = findElement(
  editProfilePopup,
  selectors.closeBtnSelector
);
const closeNewPlaceBtn = findElement(newPlacePopup, selectors.closeBtnSelector);
const saveEditProfileBtn = findElement(
  editProfilePopup,
  selectors.saveBtnSelector
);
const createNewPlaceBtn = findElement(newPlacePopup, selectors.saveBtnSelector);
const closeImagePopupBtn = findElement(imagePopup, selectors.closeBtnSelector);

//Popup Fileds
const nameProfileInput = findElement(
  editProfilePopup,
  selectors.nameInputSelector
);
const jobProfileInput = findElement(
  editProfilePopup,
  selectors.descInputSelector
);
const nameNewPlaceInput = findElement(
  newPlacePopup,
  selectors.nameInputSelector
);
const linkNewPlaceInput = findElement(
  newPlacePopup,
  selectors.linkInputSelector
);

//Profile fields
const name = findElement(document, selectors.nameProfileSelector);
const job = findElement(document, selectors.descProfileSelector);

//Templates
const templateCardSelector = findElement(
  document,
  selectors.cardTemplateSelector
);

//Containers
const cardsContainer = findElement(document, selectors.cardsWrapperSelector);

//Validators
const editProfileValidator = new FormValidator(settingsObj, editProfilePopup);
const newPlaceValidator = new FormValidator(settingsObj, newPlacePopup);

// Render card
const renderCard = (data, template) => {
  cardsContainer.prepend(new Card(data, template).createCard());
};

//Close popup by pressing 'Escape'
const closePopupOnEscape = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const popup = findElement(document, selectors.popupIsOpenedSelector);
      togglePopup(popup);
    }
  });
};

//Open edit profile popup
editProfileBtn.addEventListener("click", () => {
  nameProfileInput.value = name.textContent;
  jobProfileInput.value = job.textContent;
  togglePopup(editProfilePopup);
  closePopupOnEscape();
  editProfileValidator.enableValidation();
});

//Open new place popup
newPlaceBtn.addEventListener("click", () => {
  togglePopup(newPlacePopup);
  closePopupOnEscape();
});

//Close profile popup
closeEditProfileBtn.addEventListener("click", () => {
  togglePopup(editProfilePopup);
});

//Close new place popup
closeNewPlaceBtn.addEventListener("click", () => {
  togglePopup(newPlacePopup);
});

//Close image popup
closeImagePopupBtn.addEventListener("click", () => {
  togglePopup(imagePopup);
});

//Update profile
saveEditProfileBtn.addEventListener("click", (e) => {
  name.textContent = nameProfileInput.value;
  job.textContent = jobProfileInput.value;
  togglePopup(editProfilePopup);
  e.preventDefault();
});

//Create new place
createNewPlaceBtn.addEventListener("click", (e) => {
  renderCard(
    {
      name: nameNewPlaceInput.value,
      link: linkNewPlaceInput.value,
    },
    templateCardSelector
  );
  togglePopup(newPlacePopup);
  e.preventDefault();
});

//Close popups by clicking on overlay
document.addEventListener("click", (e) => {
  if (e.target.classList.contains(selectors.popupElementClass)) {
    togglePopup(e.target);
    e.preventDefault();
  }
});

//Init cards
initialCards.forEach((item) => renderCard(item, templateCardSelector));

//Validatу forms
editProfileValidator.enableValidation();
newPlaceValidator.enableValidation();

export { selectors };
