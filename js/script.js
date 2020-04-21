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

//Template
const cardTemplate = document.querySelector('#card').content;

//Cards container
const cardsContainer = document.querySelector('.cards');


//Button variables
const editButton = document.querySelector('.button_edit');
const closeButton = document.querySelector('.button_close');


//Profile fields
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');

//Details form fields
const popupDetails = document.querySelector('.popup_details');
const formDetails = popupDetails.querySelector('.popup__form');
const nameInput = popupDetails.querySelector('.popup__input_name');
const jobInput = popupDetails.querySelector('.popup__input_job');

//Change details
editButton.addEventListener('click', function(){
  toggleEditForm();
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
});

//Close details form
closeButton.addEventListener('click', toggleEditForm);


// Save details
formDetails.addEventListener('submit', function(e){
  if (nameInput.value !== '' && jobInput.value !== '') {
    name.textContent = nameInput.value;
    job.textContent = jobInput.value
  }
  toggleEditForm();
  e.preventDefault();
});

// Show/hide details form
function toggleEditForm() {
  popupDetails.classList.toggle('popup_opened');
}

// Like buttons change color on click / remove card
document.addEventListener('click', function(e){
  if (e.target.classList.contains('button_like')){
    e.target.classList.toggle('button_like-black');
  }

  if (e.target.classList.contains('button_delete')){
    e.target.parentElement.remove();
    console.log(e.target.parentElement);
  }
});

//Add a card with a template
function addCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.card__text').textContent = name;
  newCard.querySelector('.card__image').setAttribute('src', link);
  newCard.querySelector('.card__image').setAttribute('alt', `Pic: ${name}`);
  cardsContainer.prepend(newCard);
}

// Add initial cards
document.addEventListener('DOMContentLoaded', () => {
  initialCards.forEach((item)=>{
    addCard(item.name, item.link);
  });
});