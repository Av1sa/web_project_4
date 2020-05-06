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

//Selectors
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

//Templates
const cardTemplate = document
  .querySelector(selectors.cardTemplateSelector)
  .content.querySelector(selectors.cardElementSelector);

//Wrappers
const cardsContainer = document.querySelector(selectors.cardsWrapperSelector);
const popupImageContainer = document.querySelector(
  selectors.imagePopupSelector
);

//Popups
const editProfilePopup = document.querySelector(selectors.profilePopupSelector);
const newPlacePopup = document.querySelector(selectors.newPlacePopupSelector);
const imagePopup = document.querySelector(selectors.imagePopupSelector);

//Buttons
const editProfileBtn = document.querySelector(selectors.editBtnSelector);
const newPlaceBtn = document.querySelector(selectors.addBtnSelector);
const closeEditProfileBtn = editProfilePopup.querySelector(
  selectors.closeBtnSelector
);
const closeNewPlaceBtn = newPlacePopup.querySelector(
  selectors.closeBtnSelector
);
const saveEditProfileBtn = editProfilePopup.querySelector(
  selectors.saveBtnSelector
);
const createNewPlaceBtn = newPlacePopup.querySelector(
  selectors.saveBtnSelector
);
const closeImagePopupBtn = imagePopup.querySelector(selectors.closeBtnSelector);

//Popup Fileds
const nameProfileInput = editProfilePopup.querySelector(
  selectors.nameInputSelector
);
const jobProfileInput = editProfilePopup.querySelector(
  selectors.descInputSelector
);
const nameNewPlaceInput = newPlacePopup.querySelector(
  selectors.nameInputSelector
);
const linkNewPlaceInput = newPlacePopup.querySelector(
  selectors.linkInputSelector
);

//Profile fields
const name = document.querySelector(selectors.nameProfileSelector);
const job = document.querySelector(selectors.descProfileSelector);



//Open edit profile popup
editProfileBtn.addEventListener("click", (e) => {
  nameProfileInput.value = name.textContent;
  jobProfileInput.value = job.textContent;
  togglePopup(editProfilePopup);
});

//Open new place popup
newPlaceBtn.addEventListener("click", (e) => {
  togglePopup(newPlacePopup);
});

//Close profile popup
closeEditProfileBtn.addEventListener("click", (e) => {
  togglePopup(editProfilePopup);
});

//Close new place popup
closeNewPlaceBtn.addEventListener("click", (e) => {
  togglePopup(newPlacePopup);
});

//Close image popup
closeImagePopupBtn.addEventListener("click", (e) => {
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
  renderCard(nameNewPlaceInput.value, linkNewPlaceInput.value);
  togglePopup(newPlacePopup);
  e.preventDefault();
});

// Render card
function renderCard(name, link) {
  prependNode(cardsContainer, addCard(name, link));
}

// Show/hide popup
function togglePopup(popup) {
  popup.classList.toggle(selectors.popupIsOpenedClass);
}

//Add card from template
function addCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector(selectors.cardTextSelector).textContent = name;
  newCard.querySelector(selectors.cardImageSelector).src = link;
  newCard.querySelector(selectors.cardImageSelector).alt = `Pic: ${name}`;

  // Change color of heart on click
  newCard
    .querySelector(selectors.likeBtnSelector)
    .addEventListener("click", (e) => {
      e.target.classList.toggle(selectors.likeBlackBtnSelector);
    });

  // Remove card
  newCard
    .querySelector(selectors.deleteBtnSelector)
    .addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });

  // Show popup image
  newCard
    .querySelector(selectors.cardImageSelector)
    .addEventListener("click", (e) => {
      popupImageContainer.querySelector(
        selectors.popupImageSelector
      ).src = link;
      popupImageContainer.querySelector(
        selectors.popupImageSelector
      ).alt = `Pic: ${name}`;
      popupImageContainer.querySelector(
        selectors.popupImageTitleSelector
      ).textContent = name;
      togglePopup(popupImageContainer);
    });
  return newCard;
}

//Add node at the end of the container
function prependNode(container, node) {
  container.prepend(node);
}

//Close popups by clicking on overlay
document.addEventListener("click", (e) => {
  if (e.target.classList.contains(selectors.popupElementClass)) {
    togglePopup(e.target);
    e.preventDefault();
  }
});

//Close popups by pressing 'Escape'
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const popup = document.querySelector(selectors.popupIsOpenedSelector);
    if (popup) {
      togglePopup(popup);
    }
  }
});

//Init cards
initialCards.forEach((item) => renderCard(item.name, item.link));

//Make submit button in profile popup enabled after page is loaded
nameProfileInput.value = name.textContent;
jobProfileInput.value = job.textContent;
