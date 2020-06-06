import { errorImageLink, findElement, togglePopup } from "./Utils.js";
import { selectors } from "./script.js";

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = templateSelector;
  }

  // Change color of heart on click
  _handleHeartButton = (card) => {
    card
      .querySelector(selectors.likeBtnSelector)
      .addEventListener("click", (e) => {
        e.target.classList.toggle(selectors.likeBlackBtnSelector);
      });
  };

  // Remove card
  _handleDeleteButton = (card) => {
    card
      .querySelector(selectors.deleteBtnSelector)
      .addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });
  };

  // Show popup image
  _handlePopupImage = (card) => {
    const popupImageContainer = findElement(
      document,
      selectors.imagePopupSelector
    );
    card
      .querySelector(selectors.cardImageSelector)
      .addEventListener("click", () => {
        popupImageContainer.querySelector(
          selectors.popupImageSelector
        ).src = this._link;
        popupImageContainer.querySelector(
          selectors.popupImageSelector
        ).alt = `Pic: ${name}`;
        popupImageContainer.querySelector(
          selectors.popupImageTitleSelector
        ).textContent = name;
        togglePopup(popupImageContainer);
      });
  };

  //Event listeners for card's buttons
  _setEventListeners = (card) => {
    this._handleHeartButton(card);
    this._handleDeleteButton(card);
    this._handlePopupImage(card);
  };

  //Create card from template
  createCard = () => {
    const newCard = this._template.content
      .querySelector(selectors.cardElementSelector)
      .cloneNode(true);
    newCard.querySelector(selectors.cardTextSelector).textContent = this._name;
    const img = newCard.querySelector(selectors.cardImageSelector);
    img.addEventListener("error", () => {
      img.src = errorImageLink;
    });
    img.src = this._link;
    img.alt = `Pic: ${this._name}`;

    this._setEventListeners(newCard);
    return newCard;
  };
}
