const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const editButton = document.querySelector(".profile__edit-button");

const editFormSection = document.querySelector(".popup");
const editForm = editFormSection.querySelector(".popup__form");
const closeEditButton = editFormSection.querySelector(".popup__close");
const nameInput = editFormSection.querySelector(
  ".popup__input_type_name"
);
const aboutMeInput = editFormSection.querySelector(
  ".popup__input_type_about-me"
);

function showPopup() {
  editFormSection.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
}

function closePopup() {
  editFormSection.classList.remove("popup_opened");
}

function formSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAboutMe.textContent = aboutMeInput.value;
  closePopup();
}

editButton.addEventListener("click", showPopup);
closeEditButton.addEventListener("click", closePopup);
editForm.addEventListener("submit", formSubmitHandler);
