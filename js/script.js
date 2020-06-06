import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Utils from "./Utils.js";

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

const utils = new Utils();

//Popups
const editProfilePopup = utils.findElement(
  document,
  utils.selectors.profilePopupSelector
);
const newPlacePopup = utils.findElement(
  document,
  utils.selectors.newPlacePopupSelector
);
const imagePopup = utils.findElement(
  document,
  utils.selectors.imagePopupSelector
);

//Buttons
const editProfileBtn = utils.findElement(
  document,
  utils.selectors.editBtnSelector
);
const newPlaceBtn = utils.findElement(document, utils.selectors.addBtnSelector);
const closeEditProfileBtn = utils.findElement(
  editProfilePopup,
  utils.selectors.closeBtnSelector
);
const closeNewPlaceBtn = utils.findElement(
  newPlacePopup,
  utils.selectors.closeBtnSelector
);
const saveEditProfileBtn = utils.findElement(
  editProfilePopup,
  utils.selectors.saveBtnSelector
);
const createNewPlaceBtn = utils.findElement(
  newPlacePopup,
  utils.selectors.saveBtnSelector
);
const closeImagePopupBtn = utils.findElement(
  imagePopup,
  utils.selectors.closeBtnSelector
);

//Popup Fileds
const nameProfileInput = utils.findElement(
  editProfilePopup,
  utils.selectors.nameInputSelector
);
const jobProfileInput = utils.findElement(
  editProfilePopup,
  utils.selectors.descInputSelector
);
const nameNewPlaceInput = utils.findElement(
  newPlacePopup,
  utils.selectors.nameInputSelector
);
const linkNewPlaceInput = utils.findElement(
  newPlacePopup,
  utils.selectors.linkInputSelector
);

//Profile fields
const name = utils.findElement(document, utils.selectors.nameProfileSelector);
const job = utils.findElement(document, utils.selectors.descProfileSelector);

//Open edit profile popup
editProfileBtn.addEventListener("click", () => {
  nameProfileInput.value = name.textContent;
  jobProfileInput.value = job.textContent;
  utils.togglePopup(editProfilePopup);
  closePopupOnEscape();
  editProfileValidator.enableValidation();
});

//Open new place popup
newPlaceBtn.addEventListener("click", () => {
  utils.togglePopup(newPlacePopup);
  closePopupOnEscape();
});

//Close profile popup
closeEditProfileBtn.addEventListener("click", () => {
  utils.togglePopup(editProfilePopup);
});

//Close new place popup
closeNewPlaceBtn.addEventListener("click", () => {
  utils.togglePopup(newPlacePopup);
});

//Close image popup
closeImagePopupBtn.addEventListener("click", () => {
  utils.togglePopup(imagePopup);
});

//Update profile
saveEditProfileBtn.addEventListener("click", (e) => {
  name.textContent = nameProfileInput.value;
  job.textContent = jobProfileInput.value;
  utils.togglePopup(editProfilePopup);
  e.preventDefault();
});

//Create new place
createNewPlaceBtn.addEventListener("click", (e) => {
  //renderCard(nameNewPlaceInput.value, linkNewPlaceInput.value);
  new Card(
    {
      name: nameNewPlaceInput.value,
      link: linkNewPlaceInput.value,
    },
    templateCardSelector
  ).renderCard();
  utils.togglePopup(newPlacePopup);
  e.preventDefault();
});

//Close popups by clicking on overlay
document.addEventListener("click", (e) => {
  if (e.target.classList.contains(utils.selectors.popupElementClass)) {
    utils.togglePopup(e.target, utils.selectors.popupIsOpenedClass);
    e.preventDefault();
  }
});

//Close popup by pressing 'Escape'
const closePopupOnEscape = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const popup = findElement(
        document,
        utils.selectors.popupIsOpenedSelector
      );
      utils.togglePopup(popup, utils.selectors.popupIsOpenedClass);
    }
  });
};

//Init cards
const templateCardSelector = utils.findElement(
  document,
  utils.selectors.cardTemplateSelector
);
initialCards.forEach((item) =>
  new Card(item, templateCardSelector).renderCard()
);

const settingsObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_save",
  inactiveButtonClass: "button_save-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const editProfileValidator = new FormValidator(settingsObj, editProfilePopup);
const newPlaceValidator = new FormValidator(settingsObj, newPlacePopup);

editProfileValidator.enableValidation();
newPlaceValidator.enableValidation();
