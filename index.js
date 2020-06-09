const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const editButton = document.querySelector(".profile__edit-button");
const editFormSection = document.querySelector(".popup_type_edit");
const editForm = editFormSection.querySelector(".popup__form");
const editCloseButton = editFormSection.querySelector(".popup__close");
const saveButton = editForm.querySelector(".save-button");
const nameInput = editForm.querySelector(".popup__input_type_name");
const aboutMeInput = editForm.querySelector(".popup__input_type_about-me");

const addButton = document.querySelector(".profile__add-button");
const addFormSection = document.querySelector(".popup_type_add");
const addForm = addFormSection.querySelector(".popup__form");
const addCloseButton = addFormSection.querySelector(".popup__close");
const createButton = addForm.querySelector(".create-button");
const titleInput = addForm.querySelector(".popup__input_type_title");
const imageLinkInput = addForm.querySelector(".popup__input_type_image-link");

const elementsList = document.querySelector(".elements__list");

const imagePopup = document.querySelector(".popup_type_image");
const imageCloseButton = imagePopup.querySelector(".popup__close");

const locationTemplate = document.querySelector("#location-template").content;

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },

  {
    name: "Vanois National Park",
    link: "https://code.s3.yandex.net/web-code/vanois.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
];

// Function to toggle full size image
function toggleImage() {
  imagePopup.classList.toggle("popup_opened");
}

// Function to view larger image when clicked
function viewFullImage(e) {
  const fullSizeImage = imagePopup.querySelector(".popup__full-size-image");
  const imageCaption = imagePopup.querySelector(".popup__image-caption");
  toggleImage();
  fullSizeImage.src = this.src;
  imageCaption.textContent = e.target.nextElementSibling.querySelector(
    ".elements__location-name"
  ).textContent;
}

// Function to toggle liking picture when clicking like button (heart)
function toggleLikedPicture(e) {
  e.target.classList.toggle("elements__like_liked");
}

// Function to delete location cards when clicking trash icon
function deleteElementCard(e) {
  e.target.closest(".elements__list-item").remove();
}

// Function to create new location cards
function createLocationCard(locationTitle, locationLink) {
  const locationClone = locationTemplate.cloneNode(true);

  const locationImage = locationClone.querySelector(".elements__image");
  const locationName = locationClone.querySelector(".elements__location-name");
  const likeButton = locationClone.querySelector(".elements__like");
  const trashButton = locationClone.querySelector(".elements__trash");

  locationImage.src = locationLink;
  locationImage.addEventListener("click", viewFullImage);

  locationName.textContent = locationTitle;
  likeButton.addEventListener("click", toggleLikedPicture);

  trashButton.addEventListener("click", deleteElementCard);

  elementsList.prepend(locationClone);
}

// Function to populate edit form when opened
function populateProfileEditForm() {
  nameInput.value = profileName.textContent;
  aboutMeInput.value = profileAboutMe.textContent;
}

// Function to toggle popup edit menu
function toggleEdit() {
  editFormSection.classList.toggle("popup_opened");
}

// Function to toggle popup add location menu
function toggleAdd() {
  addFormSection.classList.toggle("popup_opened");
}

// Function to handle edit form when submitted. Edit form will save new name/about me.
function editFormSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value.trim();
  profileAboutMe.textContent = aboutMeInput.value.trim();
  toggleEdit();
}

// Function to handle add location form when submitted. Will create new location card.
function addFormSubmitHandler(e) {
  e.preventDefault();
  createLocationCard(titleInput.value.trim(), imageLinkInput.value.trim());
  addForm.reset();
  toggleAdd();
}

// Iterate through pre-existing locations with forEach to create initial location cards on page load
initialCards.forEach((location) => {
  createLocationCard(location.name, location.link);
});

editButton.addEventListener("click", populateProfileEditForm);
editButton.addEventListener("click", toggleEdit);
editCloseButton.addEventListener("click", toggleEdit);
editForm.addEventListener("submit", editFormSubmitHandler);

addButton.addEventListener("click", toggleAdd);
addCloseButton.addEventListener("click", toggleAdd);
addForm.addEventListener("submit", addFormSubmitHandler);

imageCloseButton.addEventListener("click", toggleImage);
