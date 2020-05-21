const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const editButton = document.querySelector(".profile__edit-button");

const editFormSection = document.querySelector(".edit-form");
const editForm = editFormSection.querySelector(".edit-form__form");
const closeEditButton = editFormSection.querySelector(".edit-form__close");
const nameInput = editFormSection.querySelector(".edit-form__input_name");
const aboutMeInput = editFormSection.querySelector(".edit-form__input_about-me");


editButton.addEventListener("click", function () {
  editFormSection.classList.add("popup_opened");

  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
});

closeEditButton.addEventListener("click", closeEditForm);

editForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let newName = nameInput.value;
  let newAboutMe = aboutMeInput.value;

  profileName.textContent = newName;
  profileAboutMe.textContent = newAboutMe;
  nameInput.value = "";
  aboutMeInput.value = "";

  closeEditForm();

});

function closeEditForm() {
  editFormSection.classList.remove("popup_opened");
}