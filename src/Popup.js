export default class Popup {
  constructor(popupSelector, formReset) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._formReset = formReset;
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      if (this._popupElement.classList.contains("popup_type_image")) {
        this.close();
      } else if (this._popupElement.classList.contains("popup")) {
        this.close();
        this._formReset(this._popupElement);
      }
    }
  }

  setEventListeners() {
    this._popupElement
      .querySelector(".popup__close")
      .addEventListener("click", () => {
        this.close();
      });

    this._popupElement.addEventListener("click", (e) => {
      const targetElement = e.target;
      console.log("exited");
      if (targetElement.classList.contains("popup_type_image")) {
        this.close();
      } else if (targetElement.classList.contains("popup")) {
        this.close();
        this._formReset(this._popupElement);
      }
    });
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    this.setEventListeners();
    document.addEventListener("keyup", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }
}
