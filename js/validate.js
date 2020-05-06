//Settings Object
const formSelectors = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_save",
  inactiveButtonClass: "button_save-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
}

//Show error
const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(formSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formSelectors.errorClass);
};

//Hide error
const hideInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(formSelectors.inputErrorClass);
  errorElement.classList.remove(formSelectors.errorClass);
  errorElement.textContent = "";
};

//Check form field
const isValid = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input, input.validationMessage);
  }
};

//Check all fields in form
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll(formSelectors.inputSelector));
  const submitBtn = form.querySelector(formSelectors.submitButtonSelector);
  toggleButtonState(inputList, submitBtn);

  inputList.forEach((input) => {
    isValid(form, input);
    input.addEventListener("input", () => {
      isValid(form, input);
      toggleButtonState(inputList, submitBtn);
    });
  });
};

//Check if any field from list is invalid
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

//Toggle submit button depending on validity of fields
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(formSelectors.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(formSelectors.inactiveButtonClass);
    button.disabled = false;
  }
};

//Check all forms
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(formSelectors.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form);
  });
};

enableValidation();
