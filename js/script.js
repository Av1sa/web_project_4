//Initial cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

//Templates
const cardTemplate = document.querySelector('.template-card').content.querySelector('.card');

//Wrappers
const cardsContainer = document.querySelector('.cards');
const popupImageContainer = document.querySelector('.popup_image');

//Popups
const editProfilePopup = document.querySelector('.popup_edit-profile');
const newPlacePopup = document.querySelector('.popup_new-place');
const imagePopup = document.querySelector('.popup_image');

//Buttons
const editProfileBtn = document.querySelector('.button_edit');
const newPlaceBtn = document.querySelector('.button_add');
const closeEditProfileBtn = editProfilePopup.querySelector('.button_close');
const closeNewPlaceBtn = newPlacePopup.querySelector('.button_close');
const saveEditProfileBtn = editProfilePopup.querySelector('.button_save');
const createNewPlaceBtn = newPlacePopup.querySelector('.button_save');
const closeImagePopupBtn = imagePopup.querySelector('.button_close');

//Popup Fileds
const nameProfileInput = editProfilePopup.querySelector('.popup__input_name');
const jobProfileInput = editProfilePopup.querySelector('.popup__input_desc');
const nameNewPlaceInput = newPlacePopup.querySelector('.popup__input_name');
const linkNewPlaceInput = newPlacePopup.querySelector('.popup__input_link');

//Profile fields
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');

// Event listeners
editProfileBtn.addEventListener('click', (e) => {
  nameProfileInput.value = name.textContent;
  jobProfileInput.value = job.textContent;
  togglePopup(editProfilePopup);
});

newPlaceBtn.addEventListener('click', (e) => {
  togglePopup(newPlacePopup);
});

closeEditProfileBtn.addEventListener('click', (e) => {
  togglePopup(editProfilePopup);
});

closeNewPlaceBtn.addEventListener('click', (e) => {
  togglePopup(newPlacePopup);
});

closeImagePopupBtn.addEventListener('click', (e) => {
  togglePopup(imagePopup);
});

saveEditProfileBtn.addEventListener('click', (e) => {
  if (nameProfileInput.value && jobProfileInput.value) {
    name.textContent = nameProfileInput.value;
    job.textContent = jobProfileInput.value;
  }
  togglePopup(editProfilePopup);
  e.preventDefault();
});

createNewPlaceBtn.addEventListener('click', (e) => {
  renderCard(nameNewPlaceInput.value, linkNewPlaceInput.value);
  togglePopup(newPlacePopup);
  e.preventDefault();
});

// Render card
function renderCard(name, link) {
  if (name && link) {
    prependNode(cardsContainer, addCard(name, link));
  }
}

// Show/hide popup
function togglePopup(popup) {
  popup.classList.toggle('popup_is-opened');
}

//Add card from template
function addCard(name, link) {
  
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.card__text').textContent = name;
  newCard.querySelector('.card__image').src = link;
  newCard.querySelector('.card__image').alt = `Pic: ${name}`;

  // Change color of heart on click
  newCard.querySelector('.button_like').addEventListener('click', (e) => {
    e.target.classList.toggle('button_like-black');
  });

  // Remove card
  newCard.querySelector('.button_delete').addEventListener('click', (e) => {
    e.target.parentElement.remove();
  });

  // Show popup image
  newCard.querySelector('.card__image').addEventListener('click', (e) => {
    popupImageContainer.querySelector('.popup__image').src = link;
    popupImageContainer.querySelector('.popup__image').alt = `Pic: ${name}`;
    popupImageContainer.querySelector('.popup__image-title').textContent = name;
    togglePopup(popupImageContainer);
  });
  return newCard
}

//Add node in the beginning of the container
function appendNode(container, node) {
  container.append(node);
}

//Add node at the end of the container
function prependNode(container, node) {
  container.prepend(node);
}

initialCards.forEach((item) => renderCard(item.name, item.link));