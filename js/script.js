//Button variables
let editButton = document.querySelector('.button_edit');
let closeButton = document.querySelector('.button_close');

//Profile fields
let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');

//Popup fields
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');


editButton.addEventListener('click', function(){
  toggleEditForm();
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
});

closeButton.addEventListener('click', toggleEditForm);

form.addEventListener('submit', function(e){
  if (nameInput.value !== '' && jobInput.value !== '') {
    name.textContent = nameInput.value;
    job.textContent = jobInput.value
  }
  e.preventDefault();
});

// Show/hide edit form
function toggleEditForm() {
  popup.classList.toggle('popup_opened');
}

