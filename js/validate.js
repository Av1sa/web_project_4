//Show error
const showInputError = (form, input, errorMessage, settings) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

//Hide error
const hideInputError = (form, input, settings) => {
  const errorElement = form.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

//Check form field
const isValid = (form, input, settings) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, settings);
  } else {
    hideInputError(form, input, settings);
  }
};

//Check all fields in form
const setEventListeners = (form, settings) => {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitBtn = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, submitBtn, settings);

  inputList.forEach((input) => {
    isValid(form, input, settings);
    input.addEventListener("input", () => {
      isValid(form, input, settings);
      toggleButtonState(inputList, submitBtn, settings);
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
const toggleButtonState = (inputList, button, settings) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
  }
};

//Check all forms
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form, settings);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".button_save",
  inactiveButtonClass: "button_save-inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
});
