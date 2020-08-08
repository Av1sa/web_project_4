export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
  }

  getUserId() {
    return this._id;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._aboutElement.textContent,
      avatar: this._avatarSelector.src,
    };
  }

  setUserInfo({ name, about, avatar, id }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarSelector.src = avatar;
    this._id = id;
  }
}
