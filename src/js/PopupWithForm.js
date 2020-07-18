import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import { settingsObj } from "./index.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit, initialData }) {
    super(popupSelector);
    this._form = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
    this._initialData = initialData;
  }

  getInputValues() {
    const inputList = this._popupElement.querySelectorAll(".popup__input");
    this._inputValues = [];
    inputList.forEach((input) => (this._inputValues[input.id] = input.value));
    return this._inputValues;
  }

  getFormElement() {
    return this._form;
  }

  open() {
    if (this._initialData !== null) {
      this._form.querySelector(".popup__input_name").value = this._initialData.name;
      this._form.querySelector(".popup__input_desc").value = this._initialData.job;
    }
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      new FormValidator(settingsObj, this._form).enableValidation();
      this._handleFormSubmit(this.getInputValues());
      this.close();
    });
  }
}
