const errorImageLink =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDDxuIkubELpYS3h54VsoXlcOGeMwwe0Plrx4cHH272FNDc366&usqp=CAU";

export default class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
  }

  //Get card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  //Change color of heart on click
  _handleLikeIcon() {
    this._element
      .querySelector(".button_like")
      .classList.toggle("button_like-black");
  }

  //Remove card
  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  //Event listeners
  _setEventListeners() {
    this._element
      .querySelector(".button_like")
      .addEventListener("click", () => this._handleLikeIcon());
    this._element
      .querySelector(".button_delete")
      .addEventListener("click", () => this._handleDeleteButton());
    this._element.querySelector(".card__image").addEventListener("click", () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    );
  }

  //Create card from template
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__text").textContent = this._name;
    const img = this._element.querySelector(".card__image");
    img.addEventListener("error", () => {
      img.src = errorImageLink;
    });
    img.src = this._link;
    img.alt = `Pic: ${this._name}`;

    this._setEventListeners();
    return this._element;
  }
}
