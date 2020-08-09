import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    { handleFormSubmit, handleInitialData, handleFormValidation }
  ) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._textSubmitButton = this._form.querySelector(
      ".button_save"
    ).textContent;
    this._handleFormSubmit = handleFormSubmit;
    this._handleInitialData = handleInitialData;
    this._handleFormValidation = handleFormValidation;
  }

  getInputValues() {
    const inputList = this._popupElement.querySelectorAll(".popup__input");
    this._inputValues = {};
    inputList.forEach((input) => (this._inputValues[input.id] = input.value));
    return this._inputValues;
  }

  getFormElement() {
    return this._form;
  }

  open() {
    this._handleInitialData();
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  toggleLoading(isLoading) {
    let saveBtn = this._form.querySelector(".button_save");
    isLoading
      ? (saveBtn.textContent = "Saving...")
      : (saveBtn.textContent = this._textSubmitButton);
  }

  setEventListeners() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormValidation();
      this._handleFormSubmit(this.getInputValues());
    });
    super.setEventListeners();
  }
}
