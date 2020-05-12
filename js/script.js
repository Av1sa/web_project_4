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

//Error image
const errorImageLink =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDDxuIkubELpYS3h54VsoXlcOGeMwwe0Plrx4cHH272FNDc366&usqp=CAU";

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

//Find element in DOM
const findElement = (parent, selector) => {
  return parent.querySelector(selector);
};

//Templates
const cardTemplate = document
  .querySelector(selectors.cardTemplateSelector)
  .content.querySelector(selectors.cardElementSelector);

//Wrappers
const cardsContainer = findElement(document, selectors.cardsWrapperSelector);
const popupImageContainer = findElement(document, selectors.imagePopupSelector);

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

//Open edit profile popup
editProfileBtn.addEventListener("click", () => {
  nameProfileInput.value = name.textContent;
  jobProfileInput.value = job.textContent;
  togglePopup(editProfilePopup);
  closePopupOnEscape();
  enableValidation(settingsObj);
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
  renderCard(nameNewPlaceInput.value, linkNewPlaceInput.value);
  togglePopup(newPlacePopup);
  e.preventDefault();
});

// Render card
function renderCard(name, link) {
  console.log(cardsContainer);
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
  const img = newCard.querySelector(selectors.cardImageSelector);
  img.addEventListener("error", () => {
    img.src = errorImageLink;
  });
  img.src = link;
  img.alt = `Pic: ${name}`;

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

//Close popup by pressing 'Escape'
const closePopupOnEscape = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const popup = findElement(document, selectors.popupIsOpenedSelector);
      togglePopup(popup);
    }
  });
};

//Init cards
initialCards.forEach((item) => renderCard(item.name, item.link));
