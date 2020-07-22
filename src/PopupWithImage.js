import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCaption = this._popupElement.querySelector(
      ".popup__image-caption"
    );
    this._fullSizeImage = this._popupElement.querySelector(
      ".popup__full-size-image"
    );
  }

  open({ name, link }) {
    super.open();

    this._imageCaption.textContent = name;
    this._fullSizeImage.src = link;
  }
}
