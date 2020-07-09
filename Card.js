const imagePopup = document.querySelector(".popup_type_image");

class Card {
  constructor(locationTitle, locationLink, templateSelector) {
    this._locationTitle = locationTitle;
    this._locationLink = locationLink;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = this._templateSelector.cloneNode(true);

    return cardTemplate;
  }

  _toggleLikedPicture(e) {
    e.target.classList.toggle("elements__like_liked");
  }

  _deleteElementCard(e) {
    e.target.closest(".elements__list-item").remove();
  }

  _viewFullImage(e) {
    const fullSizeImage = imagePopup.querySelector(".popup__full-size-image");
    const imageCaption = imagePopup.querySelector(".popup__image-caption");
    imagePopup.classList.toggle("popup_opened");

    fullSizeImage.src = e.target.src;
    imageCaption.textContent = e.target.nextElementSibling.querySelector(
      ".elements__location-name"
    ).textContent;
  }

  _escapeKeyClose(e) {
    if (e.key === "Escape") {
      if (imagePopup.classList.contains("popup_opened")) {
        imagePopup.classList.toggle("popup_opened");

        document.removeEventListener("keyup", this._escapeKeyClose);
      }
    }
  }

  _attachEscKeyListener() {
    console.log("attached listenere");
    document.addEventListener("keyup", this._escapeKeyClose);
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".elements__like");
    this._trashButton = this._cardElement.querySelector(".elements__trash");

    this._likeButton.addEventListener("click", this._toggleLikedPicture);
    this._trashButton.addEventListener("click", this._deleteElementCard);

    this._locationImage.addEventListener("click", this._viewFullImage);
    this._locationImage.addEventListener("click", () => {
      this._attachEscKeyListener();
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._locationImage = this._cardElement.querySelector(".elements__image");
    this._locationName = this._cardElement.querySelector(
      ".elements__location-name"
    );

    this._locationImage.src = this._locationLink;
    this._locationName.textContent = this._locationTitle;
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;
