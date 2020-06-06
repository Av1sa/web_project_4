import Utils from "./Utils.js";

const utils = new Utils();

export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._template = templateSelector;
  }

  //Add card from template
  _addCard = (name, link) => {
    const newCard = this._template.content
      .querySelector(utils.selectors.cardElementSelector)
      .cloneNode(true);
    newCard.querySelector(utils.selectors.cardTextSelector).textContent = name;
    const img = newCard.querySelector(utils.selectors.cardImageSelector);
    img.addEventListener("error", () => {
      img.src = utils.errorImageLink;
    });
    img.src = link;
    img.alt = `Pic: ${name}`;

    // Change color of heart on click
    newCard
      .querySelector(utils.selectors.likeBtnSelector)
      .addEventListener("click", (e) => {
        e.target.classList.toggle(utils.selectors.likeBlackBtnSelector);
      });

    // Remove card
    newCard
      .querySelector(utils.selectors.deleteBtnSelector)
      .addEventListener("click", (e) => {
        e.target.parentElement.remove();
      });

    // Show popup image
    const popupImageContainer = utils.findElement(
      document,
      utils.selectors.imagePopupSelector
    );
    newCard
      .querySelector(utils.selectors.cardImageSelector)
      .addEventListener("click", (e) => {
        popupImageContainer.querySelector(
          utils.selectors.popupImageSelector
        ).src = link;
        popupImageContainer.querySelector(
          utils.selectors.popupImageSelector
        ).alt = `Pic: ${name}`;
        popupImageContainer.querySelector(
          utils.selectors.popupImageTitleSelector
        ).textContent = name;
        utils.togglePopup(popupImageContainer);
      });

    return newCard;
  };

  // Render card
  renderCard = () => {
    const cardsContainer = utils.findElement(
      document,
      utils.selectors.cardsWrapperSelector
    );
    cardsContainer.prepend(this._addCard(this._name, this._link));
  };
}
