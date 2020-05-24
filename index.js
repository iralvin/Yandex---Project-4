const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const editButton = document.querySelector(".profile__edit-button");

const editFormSection = document.querySelector(".edit-form");
const editForm = editFormSection.querySelector(".edit-form__form");
const closeEditButton = editFormSection.querySelector(".edit-form__close");
const nameInput = editFormSection.querySelector(
  ".edit-form__input[name='name']"
);
const aboutMeInput = editFormSection.querySelector(
  ".edit-form__input[name='about-me']"
);

function showPopup() {
  editFormSection.classList.add("popup-opened");
  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
}

function closePopup() {
  editFormSection.classList.remove("popup-opened");
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
