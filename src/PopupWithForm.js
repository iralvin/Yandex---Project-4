import Popup from "./Popup.js";

let inputValues = {};

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit, formReset = () => {}) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._formReset = formReset;
  }
  _getInputValues() {
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._inputList = Array.from(
      this._popupForm.querySelectorAll(".popup__input")
    );
    this._formInputs = {};
    this._inputList.forEach((input) => {
      this._formInputs[input.name] = input.value.trim();
    });
    inputValues = this._formInputs;
    return this._formInputs;
  }

  

  setEventListeners() {
    super.setEventListeners();
    this._popupElement
      .querySelector(".popup__form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const submitButton = this._popupElement.querySelector(".popup__submit");
        submitButton.textContent = "Saving...";
        this._formSubmit(this._getInputValues(), submitButton).then(() => {
          this.close();
        });
      });


  }

  open(){
    super.open();
  }

  close() {
    super.close();
    this._formReset(this._popupElement);
  }
}
