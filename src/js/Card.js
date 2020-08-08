const errorImageLink =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDDxuIkubELpYS3h54VsoXlcOGeMwwe0Plrx4cHH272FNDc366&usqp=CAU";

export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, handleLikeIcon },
    templateSelector,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isCreatedByCurrentUser =
      data.owner._id === currentUserId ? true : false;
    this._likes = data.likes.length;
    this._isLikedByCurrentUser = data.likes.some(
      (item) => item._id === currentUserId
    );
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeIcon = handleLikeIcon;
    this._templateSelector = templateSelector;
  }

  //Get card id
  getId() {
    return this._id;
  }

  //Get card template
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    cardElement.id = this._id;
    if (!this._isCreatedByCurrentUser) {
      cardElement
        .querySelector(".button_delete")
        .classList.add("button_delete-inactive");
    }
    return cardElement;
  }

  //Change color of heart on click
  _toggleLikeIcon(like) {
    if (like) {
      this._element
        .querySelector(".button_like")
        .classList.add("button_like-black");
    } else {
      this._element
        .querySelector(".button_like")
        .classList.remove("button_like-black");
    }
  }

  //Event listeners
  _setEventListeners() {
    this._element
      .querySelector(".button_like")
      .addEventListener("click", () => this._handleLikeIcon(this));
    if (this._isCreatedByCurrentUser) {
      this._element
        .querySelector(".button_delete")
        .addEventListener("click", () => this._handleDeleteClick(this));
    }
    this._element.querySelector(".card__image").addEventListener("click", () =>
      this._handleCardClick({
        name: this._name,
        link: this._link,
      })
    );
  }

  //Show number of likes
  _renderLikes(num) {
    this._element.querySelector(".card__likes-text").textContent = num;
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
    this._renderLikes(this._likes);
    this._toggleLikeIcon(this._isLikedByCurrentUser);
    this._setEventListeners();
    return this._element;
  }
}
