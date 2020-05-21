let profileName = document.querySelector(".profile__name");
let profileAboutMe = document.querySelector(".profile__about-me");

let editButton = document.querySelector(".profile__edit-button");

let editFormSection = document.querySelector(".edit-form");
let editForm = editFormSection.querySelector(".edit-form__form");
let closeEditButton = editFormSection.querySelector(".edit-form__close");
let nameInput = editFormSection.querySelector(".edit-form__input_name");
let aboutMeInput = editFormSection.querySelector(".edit-form__input_about-me");


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
