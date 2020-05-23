const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const editButton = document.querySelector(".profile__edit-button");

const editFormSection = document.querySelector(".edit-form");
const editForm = editFormSection.querySelector(".edit-form__form");
const closeEditButton = editFormSection.querySelector(".edit-form__close");
const nameInput = editFormSection.querySelector("#name-input");
const aboutMeInput = editFormSection.querySelector("#about-me-input");

editButton.addEventListener("click", showPopup);

function showPopup() {
  editFormSection.classList.add("popup_opened");

  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
}

closeEditButton.addEventListener("click", closeEditForm);

function closeEditForm() {
  editFormSection.classList.remove("popup_opened");
}

editForm.addEventListener("submit", formSubmitHandler);

function formSubmitHandler(e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutMeInput.value;

  closeEditForm();
}
