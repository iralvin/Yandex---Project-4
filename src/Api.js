export default class Api {
  constructor(baseUrl, options) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  getUserInfo() {
    this._options.method = "GET";
    return fetch(`${this._baseUrl}users/me`, this._options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject("Error " + res.statusText);
        }
      })
      .catch((err) => {
        console.log("logged " + err);
      });
  }

  getInitialCards() {
    this._options.method = "GET";
    return fetch(`${this._baseUrl}cards`, this._options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          Promise.reject("Error " + res.statusText);
        }
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addNewCard(newLocationData) {
    this._options.method = "POST";
    this._options.body = JSON.stringify({
      name: newLocationData.name,
      link: newLocationData.link,
    });

    return fetch(`${this._baseUrl}cards`, this._options);
  }

  deleteCard(cardToDelete) {
    this._options.method = "DELETE";
    return fetch(`${this._baseUrl}cards/${cardToDelete._cardID}`, this._options);
  }

  setUserAvatar(newProfilePic) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({
      avatar: newProfilePic["profile-pic"],
    });

    return fetch(`${this._baseUrl}users/me/avatar`, this._options);
  }

  setUserInfo({ name, profession }) {
    this._options.method = "PATCH";
    this._options.body = JSON.stringify({
      name: name,
      about: profession,
    });

    return fetch(`${this._baseUrl}users/me`, this._options);
  }

  setLikeForImage(card) {
    this._options.method = "PUT";

    return fetch(`${this._baseUrl}cards/likes/${card._id}`, this._options);
  }

  removeLikeForImage(card) {
    this._options.method = "DELETE";

    return fetch(`${this._baseUrl}cards/likes/${card._id}`, this._options);
  }
}
