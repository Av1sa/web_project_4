import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

import "../pages/index.css";

//Initial cards
let cards = [
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

//Initial popup image
const popupWithImage = new PopupWithImage(".popup_image", {
  name: "",
  link: "",
});

//Initial card list
const cardList = new Section(
  {
    items: cards,
    renderer: (item) => renderCard(item),
  },
  ".cards"
);

//Render card
const renderCard = ({ name, link }) => {
  const card = new Card(
    {
      data: { name, link },
      handleCardClick: ({ name, link }) => {
        popupWithImage.setFields({ name, link });
        popupWithImage.setEventListeners();
        popupWithImage.open();
      },
    },
    ".template-card"
  );
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
};

//Initialize cards
cardList.renderItems();

//DOM selectors for validation
const settingsObj = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_save",
  inactiveButtonClass: "button_save-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

//Profile data
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descSelector: ".profile__description",
});

//Buttons
const editProfileBtn = document.querySelector(".button_edit");
const newPlaceBtn = document.querySelector(".button_add");

//Popups
const editProfilePopup = new PopupWithForm(".popup_edit-profile", {
  handleFormValidation: () => {
    editProfileValidator.enableValidation();
  },
  handleFormSubmit: (data) => {
    userInfo.setUserInfo({
      name: data["name-input"],
      desc: data["desc-input"],
    });
  },
  handleInitialData: (form) => {
    const { name, desc } = userInfo.getUserInfo();
    form.querySelector(".popup__input_name").value = name;
    form.querySelector(".popup__input_desc").value = desc;
  },
});

const newPlacePopup = new PopupWithForm(".popup_new-place", {
  handleFormValidation: () => {
    newPlaceValidator.enableValidation();
  },
  handleFormSubmit: (data) => {
    renderCard({ name: data["title-input"], link: data["link-input"] });
  },
  handleInitialData: () => {},
});

//Validators
const editProfileValidator = new FormValidator(
  settingsObj,
  editProfilePopup.getFormElement()
);
const newPlaceValidator = new FormValidator(
  settingsObj,
  newPlacePopup.getFormElement()
);

//Event listeners for buttons and popups
editProfilePopup.setEventListeners();
newPlacePopup.setEventListeners();

editProfileBtn.addEventListener("click", () => {
  editProfilePopup.open();
  editProfileValidator.enableValidation();
});

newPlaceBtn.addEventListener("click", () => {
  newPlacePopup.open();
  newPlaceValidator.enableValidation();
});
