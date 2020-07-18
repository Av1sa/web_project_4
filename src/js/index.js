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
  jobSelector: ".profile__description",
});

//Buttons
const editProfileBtn = document.querySelector(".button_edit");
const newPlaceBtn = document.querySelector(".button_add");

//Popups
const editProfilePopup = new PopupWithForm(".popup_edit-profile", {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data["name-input"], data["desc-input"]);
  },
  initialData: userInfo.getUserInfo(),
});

const newPlacePopup = new PopupWithForm(".popup_new-place", {
  handleFormSubmit: (data) => {
    renderCard({ name: data["title-input"], link: data["link-input"] });
  },
  initialData: null,
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

editProfileBtn.addEventListener("click", (e) => {
  editProfilePopup.open();
  editProfileValidator.enableValidation();
});

newPlaceBtn.addEventListener("click", (e) => {
  newPlacePopup.open();
  newPlaceValidator.enableValidation();
});

//Render card
const renderCard = ({ name, link }) => {
  const card = new Card(
    {
      data: { name, link },
      handleCardClick: ({ name, link }) => {
        const popupWithImage = new PopupWithImage(".popup_image", {
          name,
          link,
        });
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
const cardList = new Section(
  {
    items: cards,
    renderer: (item) => renderCard(item),
  },
  ".cards"
);

cardList.renderItems();

export { settingsObj };
