class Card {
  constructor(
    item,
    templateSelector,
    viewFullImage,
    deleteCardPopup,
    userID,
    handleAddLike,
    handleRemoveLike
  ) {
    this._card = item;
    this._locationTitle = item.name;
    this._locationLink = item.link;
    this._templateSelector = templateSelector;
    this._viewFullImage = viewFullImage;
    this._cardID = item._id;
    this._deleteCardPopup = deleteCardPopup;
    this._userID = userID;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    return this._templateSelector
      .querySelector(".elements__list-item")
      .cloneNode(true);
  }

  _toggleLikedPicture() {
    if (this._likeButton.classList.contains("elements__like_liked")) {
      this._handleRemoveLike(this._card)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            Promise.reject("Error " + res.statusText);
          }
        })
        .then((data) => {
          this._likeButton.classList.remove("elements__like_liked");
          this._numberLikesText.textContent = data.likes.length;

          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this._handleAddLike(this._card)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            Promise.reject("Error " + res.statusText);
          }
        })
        .then((data) => {
          this._likeButton.classList.add("elements__like_liked");
          this._numberLikesText.textContent = data.likes.length;

          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".elements__like");
    this._trashButton = this._cardElement.querySelector(".elements__trash");
    this._likeButton.addEventListener("click", () => {
      this._toggleLikedPicture();
    });

    if (this._userID === this._card.owner._id) {
      this._trashButton.addEventListener("click", () => {
        this._deleteCardPopup(this);
      });
    } else {
      this._trashButton.remove();
    }

    this._locationImage.addEventListener("click", this._viewFullImage);
  }

  _checkIfImageIsLiked() {
    this._card.likes.forEach((user) => {
      if (this._userID === user._id) {
        this._likeButton.classList.add("elements__like_liked");
      } else {
        this._likeButton.classList.remove("elements__like_liked");
      }
    });
  }

  _checkHowManyLikes() {
    this._numberLikesText.textContent = this._card.likes.length;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._locationImage = this._cardElement.querySelector(".elements__image");
    this._locationName = this._cardElement.querySelector(
      ".elements__location-name"
    );
    this._numberLikesText = this._cardElement.querySelector(
      ".elements__number-likes"
    );

    this._locationImage.src = this._locationLink;
    this._locationImage.alt = this._locationTitle;
    this._locationName.textContent = this._locationTitle;
    this._setEventListeners();
    this._checkIfImageIsLiked();
    this._checkHowManyLikes();
    return this._cardElement;
  }
}

export default Card;
