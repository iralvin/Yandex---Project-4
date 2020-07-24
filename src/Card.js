class Card {
  constructor({ name, link }, templateSelector, viewFullImage) {
    this._locationTitle = name;
    this._locationLink = link;
    this._templateSelector = templateSelector;
    this._viewFullImage = viewFullImage;
  }

  _getTemplate() {
    return this._templateSelector
      .querySelector(".elements__list-item")
      .cloneNode(true);
  }

  _toggleLikedPicture(e) {
    e.target.classList.toggle("elements__like_liked");
  }

  _deleteElementCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".elements__like");
    this._trashButton = this._cardElement.querySelector(".elements__trash");
    this._likeButton.addEventListener("click", this._toggleLikedPicture);
    this._trashButton.addEventListener("click", () => {
      this._deleteElementCard();
    });
    this._locationImage.addEventListener("click", this._viewFullImage);
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._locationImage = this._cardElement.querySelector(".elements__image");
    this._locationName = this._cardElement.querySelector(
      ".elements__location-name"
    );
    this._locationImage.src = this._locationLink;
    this._locationImage.alt = this._locationTitle;
    this._locationName.textContent = this._locationTitle;
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
