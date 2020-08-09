import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { name, link }) {
    super(popupSelector);
    this._caption = name;
    this._link = link;
  }

  setFields({ name, link }) {
    this._caption = name;
    this._link = link;
  }

  open() {
    const popupImage = this._popupElement.querySelector(".popup__image");
    const popupImageTitle = this._popupElement.querySelector(
      ".popup__image-title"
    );
    popupImage.src = this._link;
    popupImage.alt = `Pic: ${this._caption}`;
    popupImageTitle.textContent = this._caption;
    super.open();
  }
}
