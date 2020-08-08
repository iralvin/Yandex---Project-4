export default class Popup {
  constructor(popupSelector, formReset) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._formReset = formReset;
  }


  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
      // this._formReset(this._popupElement);
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
      if (targetElement.classList.contains("popup")) {
        this.close();
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
