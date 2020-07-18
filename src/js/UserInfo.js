export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    return {
      name: document.querySelector(this._nameSelector).textContent,
      job: document.querySelector(this._jobSelector).textContent,
    };
  }

  setUserInfo(newName, newJob) {
    document.querySelector(this._nameSelector).textContent = newName;
    document.querySelector(this._jobSelector).textContent = newJob;
  }
}
