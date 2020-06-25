const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

function showInputError(form, inputField, errorMessage, validationObject) {
  const errorField = form.querySelector(`#${inputField.id}-error`);
  inputField.classList.add(validationObject.inputErrorClass);
  errorField.classList.add(validationObject.errorClass);
  errorField.textContent = errorMessage;
}

function hideInputError(form, inputField, validationObject) {
  const errorField = form.querySelector(`#${inputField.id}-error`);
  inputField.classList.remove(validationObject.inputErrorClass);
  errorField.classList.remove(validationObject.errorClass);
  errorField.textContent = "";
}
function hasInvalidInput(inputList) {
  return inputList.some((inputField) => {
    if (inputField.validity.valid === false) {
      return true;
    }
  });
}

function toggleButtonState(inputList, buttonElement, validationObject) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationObject.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationObject.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function resetForm(form, validationObject) {
  const inputList = Array.from(form.querySelectorAll(validationObject.inputSelector));
  const buttonElement = form.querySelector(validationObject.submitButtonSelector);

  inputList.forEach((inputField) => {
    hideInputError(form, inputField, validationObject);
  });

  toggleButtonState(inputList, buttonElement, validationObject);
}

function checkValidity(form, inputField, validationObject) {
  if (!inputField.validity.valid) {
    showInputError(form, inputField, inputField.validationMessage, validationObject);
  } else {
    hideInputError(form, inputField, validationObject);
  }
}

function setEventListeners(form, validationObject) {
  const inputList = Array.from(form.querySelectorAll(validationObject.inputSelector));
  const buttonElement = form.querySelector(validationObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationObject);

  inputList.forEach((inputField) => {
    inputField.addEventListener("input", () => {
      checkValidity(form, inputField, validationObject);
      toggleButtonState(inputList, buttonElement, validationObject);
    });
  });
}

function enableValidation(validationObject) {
  const formsList = Array.from(
    document.querySelectorAll(validationObject.formSelector)
  );
  formsList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form, validationObject);
  });
}

enableValidation(settings);

addButton.addEventListener("click", () => {
  resetForm(addForm, settings);
});

editButton.addEventListener("click", () => {
  resetForm(editForm, settings);
});
