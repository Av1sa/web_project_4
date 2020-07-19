export default class UserInfo {
  constructor({ nameSelector, descSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descElement = document.querySelector(descSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      desc: this._descElement.textContent,
    };
  }

  setUserInfo({ name, desc }) {
    this._nameElement.textContent = name;
    this._descElement.textContent = desc;
  }
}
