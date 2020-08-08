export default class Api {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  //GET Get initial cards
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, { headers: this.headers })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }

  //GET Get user info
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }

  //PATCH Set user info
  setUserInfo({ name, about }) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }

  //PATCH Set user avatar
  setUserAvatar({ avatar }) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ avatar }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }

  //POST Add new place
  addCard({ name, link }) {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
      method: "POST",
      body: JSON.stringify({ name, link }),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }

  //DELETE Remove place
  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      headers: this.headers,
      method: "DELETE",
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }

  //PUT/DELETE Change Like status
  changeLikeCardStatus(cardId, method) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      headers: this.headers,
      method: method,
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.log(err));
  }

  //Get initial data
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }
}