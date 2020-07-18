export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("popup_is-opened");
    document.addEventListener("keyup", this._handleEscClose);
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) {
        this.close();
        e.preventDefault();
      }
    });
  }

  close() {
    this._popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    const closeBtn = this._popupElement.querySelector(".button_close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });
  }
}
