const imagePopup = document.querySelector(".popup_type_image");

class Utils {
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
}

export default Utils;
