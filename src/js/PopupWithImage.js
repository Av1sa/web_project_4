import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._caption = name;
    this._link = link;
  }

  open() {
    this._popupElement.querySelector(".popup__image").src = this._link;
    this._popupElement.querySelector(
      ".popup__image"
    ).alt = `Pic: ${this._caption}`;
    this._popupElement.querySelector(
      ".popup__image-title"
    ).textContent = this._caption;
    super.open();
  }
}
