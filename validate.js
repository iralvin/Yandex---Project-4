const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

function showInputError(form, inputField, errorMessage, settings) {
  const errorField = form.querySelector(`#${inputField.id}-error`);
  inputField.classList.add(settings.inputErrorClass);
  errorField.classList.add(settings.errorClass);
  errorField.textContent = errorMessage;
}

function hideInputError(form, inputField, settings) {
  const errorField = form.querySelector(`#${inputField.id}-error`);
  inputField.classList.remove(settings.inputErrorClass);
  errorField.classList.remove(settings.errorClass);
  errorField.textContent = "";
}

function resetForm(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputField) => {
    hideInputError(form, inputField, settings);
  });

  toggleButtonState(inputList, buttonElement, settings);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputField) => {
    if (inputField.validity.valid === false) {
      return true;
    }
  });
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function checkValidity(form, inputField, settings) {
  if (!inputField.validity.valid) {
    showInputError(form, inputField, inputField.validationMessage, settings);
  } else {
    hideInputError(form, inputField, settings);
  }
}

function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputField) => {
    inputField.addEventListener("input", () => {
      checkValidity(form, inputField, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

function enableValidation(settings) {
  const formsList = Array.from(
    document.querySelectorAll(settings.formSelector)
  );
  formsList.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(form, settings);
  });
}

enableValidation(settings);

addButton.addEventListener("click", () => {
  resetForm(addForm, settings);
});

editButton.addEventListener("click", () => {
  resetForm(editForm, settings);
});
