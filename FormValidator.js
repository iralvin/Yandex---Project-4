class FormValidator {
  constructor(settings, form) {
    this._validationObject = settings;
    this._form = form;
  }

  _hideInputError(form, inputField, validationObject) {
    const errorField = form.querySelector(`#${inputField.id}-error`);
    inputField.classList.remove(validationObject.inputErrorClass);
    errorField.classList.remove(validationObject.errorClass);
    errorField.textContent = "";
  }

  _showInputError(form, inputField, errorMessage, validationObject) {
    const errorField = form.querySelector(`#${inputField.id}-error`);
    inputField.classList.add(validationObject.inputErrorClass);
    errorField.classList.add(validationObject.errorClass);
    errorField.textContent = errorMessage;
  }

  _checkValidity(form, inputField, validationObject) {
    if (!inputField.validity.valid) {
      this._showInputError(
        form,
        inputField,
        inputField.validationMessage,
        validationObject
      );
    } else {
      this._hideInputError(form, inputField, validationObject);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputField) => {
      if (inputField.validity.valid === false) {
        return true;
      }
    });
  }

  _toggleButtonState(inputList, buttonElement, validationObject) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationObject.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(validationObject.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners(validationObject, form) {
    const inputList = Array.from(
      form.querySelectorAll(validationObject.inputSelector)
    );
    const buttonElement = form.querySelector(
      validationObject.submitButtonSelector
    );
    this._toggleButtonState(inputList, buttonElement, validationObject);

    inputList.forEach((inputField) => {
      inputField.addEventListener("input", () => {
        this._checkValidity(form, inputField, validationObject);
        this._toggleButtonState(inputList, buttonElement, validationObject);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._setEventListeners(this._validationObject, this._form);
  }
}

export default FormValidator;
