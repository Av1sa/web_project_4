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
const cardTemplate = document.querySelector('#card').content;
const popupFormTemplate = document.querySelector('#popup-form').content;
const popupImageTemplate = document.querySelector('#popup-image').content;

//Template containers
const cardsContainer = document.querySelector('.cards');
const popupDetailsContainer = document.querySelector('.popup_details');
const popupNewPlaceContainer = document.querySelector('.popup_new-place');
const popupImagesContainer = document.querySelector('.popup_image');

//Profile fields
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');

// Show/hide popup
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Buttons event listeners
document.addEventListener('click', (e)=>{
  // Change color of heart
  if (e.target.classList.contains('button_like')){
    e.target.classList.toggle('button_like-black');
  } else

  // Remove card
  if (e.target.classList.contains('button_delete')){
    e.target.parentElement.remove();
  } else

  // Close popup
  if (e.target.classList.contains('button_close')){
    togglePopup(e.target.parentElement.parentElement);
    //Remove if it was popup image
    if (e.target.parentElement.parentElement === popupImagesContainer) {
      popupImagesContainer.innerHTML = '';
    }
  } else

  // Open 'Details' popup
  if (e.target.classList.contains('button_edit')){
    togglePopup(popupDetailsContainer);
  } else

  // Open 'New Place' popup
  if (e.target.classList.contains('button_add')){
    togglePopup(popupNewPlaceContainer);
  } else

  // Show / hide popup image
  if (e.target.classList.contains('card__image')){
    togglePopup(popupImagesContainer);
    appendNode(popupImagesContainer, addPopupImage(e.target.parentElement));
  }
});

//Add card from template
function addCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.card__text').textContent = name;
  newCard.querySelector('.card__image').setAttribute('src', link);
  newCard.querySelector('.card__image').setAttribute('alt', `Pic: ${name}`);
  return newCard
}

//Add popup form from template
function addPopupForm(title, placeholderName, placeholderDesc, btnText, container) {
  const newPopup = popupFormTemplate.cloneNode(true);
  newPopup.querySelector('.popup__title').textContent = title;
  newPopup.querySelector('.popup__input_name').setAttribute('placeholder', placeholderName);
  newPopup.querySelector('.popup__input_desc').setAttribute('placeholder', placeholderDesc);
  newPopup.querySelector('.button_save').textContent = btnText;
  return newPopup;
}

//Add popup image from template
function addPopupImage(card) {
  const newPopupImage = popupImageTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  newPopupImage.querySelector('.popup__image').setAttribute('src', cardImage.getAttribute('src'));
  newPopupImage.querySelector('.popup__image').setAttribute('alt', `${cardImage.getAttribute('alt')}`);
  newPopupImage.querySelector('.popup__image-title').textContent = card.querySelector('.card__text').textContent;
  return newPopupImage
}

//Add node in the beginning of the container
function appendNode(container, node) {
  container.append(node);
}

//Add node at the end of the container
function prependNode(container, node) {
  container.prepend(node);
}

// Init
document.addEventListener('DOMContentLoaded', () => {

  //Create initial cards
  initialCards.forEach((item)=>{
    appendNode(cardsContainer, addCard(item.name, item.link));
  });

  //Create popups
  appendNode(popupDetailsContainer, addPopupForm('Edit profile', 'Edit name', 'Edit job', 'Save'));
  appendNode(popupNewPlaceContainer, addPopupForm('New place', 'Title', 'Image link', 'Create'));

  // Popup variables
  const nameDetailsInput = popupDetailsContainer.querySelector('.popup__input_name');
  const descDetailsInput = popupDetailsContainer.querySelector('.popup__input_desc');
  const saveDetailsBtn = popupDetailsContainer.querySelector('.button_save');
  const nameNewPlaceInput = popupNewPlaceContainer.querySelector('.popup__input_name');
  const descNewPlaceInput = popupNewPlaceContainer.querySelector('.popup__input_desc');
  const createNewPlaceBtn = popupNewPlaceContainer.querySelector('.button_save');

  // Save updated profile details
  saveDetailsBtn.addEventListener('click', (e)=>{
    console.log(nameDetailsInput.value, descDetailsInput);
    if (nameDetailsInput.value && descDetailsInput.value) {
      name.textContent = nameDetailsInput.value;
      job.textContent = descDetailsInput.value;
    }
    togglePopup(popupDetailsContainer);
    e.preventDefault();
  });

  // Add new place
  createNewPlaceBtn.addEventListener('click', (e)=>{
    if (nameNewPlaceInput.value && descNewPlaceInput.value) {
      prependNode(cardsContainer, addCard(nameNewPlaceInput.value, descNewPlaceInput.value));
    }
    togglePopup(popupNewPlaceContainer);
    e.preventDefault();
  });
});