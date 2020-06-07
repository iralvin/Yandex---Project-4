const profileName = document.querySelector(".profile__name");
const profileAboutMe = document.querySelector(".profile__about-me");

const editButton = document.querySelector(".profile__edit-button");
const editFormSection = document.querySelector(".popup_type_edit");
const editForm = editFormSection.querySelector(".popup__form");
const editCloseButton = editFormSection.querySelector(".popup__close_type_edit");
const saveButton = editForm.querySelector(".save-button");
const nameInput = editForm.querySelector(".popup__input_type_name");
const aboutMeInput = editForm.querySelector(".popup__input_type_about-me");

const addButton = document.querySelector(".profile__add-button");
const addFormSection = document.querySelector(".popup_type_add");
const addForm = addFormSection.querySelector(".popup__form");
const addCloseButton = addFormSection.querySelector(".popup__close_type_add");
const createButton = addForm.querySelector(".create-button");
const titleInput = addForm.querySelector(".popup__input_type_title");
const imageLinkInput = addForm.querySelector(".popup__input_type_image-link");

const elementsList = document.querySelector(".elements__list");

const imageCloseButton = document.querySelector(".popup__close_type_image");
const imagePopup = document.querySelector(".popup_type_image");

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

// Function to view larger image when clicked
function viewFullImage(e) {
  const imageContainer = imagePopup.querySelector(".popup__image-container");
  const fullSizeImage = imagePopup.querySelector(".popup__full-size-image");
  const imageCaption = imagePopup.querySelector(".popup__image-caption");

  imagePopup.classList.toggle("popup_opened");

  fullSizeImage.src = this.src;
  imageCaption.textContent = e.target.nextElementSibling.querySelector(".elements__location-name").textContent;
}

// Function to toggle liking picture when clicking like button (heart)
function toggleLikedPicture(e) {
  e.target.classList.toggle("elements__like_liked");
}

// Function to delete location cards when clicking trash icon
function deleteElementCard(e) {
  e.target.closest(".elements__list-item").remove();
}

// Function to toggle popups depending if edit menu, add location, or viewing full size image
function togglePopup(e) {
  if (e.target === editButton) {
    editFormSection.classList.toggle("popup_opened");
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
  } else if (e.target === editCloseButton || e.target === saveButton) {
    editFormSection.classList.toggle("popup_opened");
  } else if (e.target === addButton || e.target === addCloseButton || e.target === createButton) {
    addFormSection.classList.toggle("popup_opened");
  } else if (e.target === imageCloseButton) {
    imagePopup.classList.toggle("popup_opened");
  }
}

// Function to handle form when submitted. Edit form will save new name/about me. 
// Add form will create new location card based on name and image link.
function formSubmitHandler(e) {
  e.preventDefault();
  if (e.target === editForm) {
    if (nameInput.value.trim() !== "" && aboutMeInput.value.trim() !== "") {
      profileName.textContent = nameInput.value.trim();
      profileAboutMe.textContent = aboutMeInput.value.trim();
    }
  } else if (e.target === addForm) {
	if (titleInput.value.trim() !== "" && imageLinkInput.value.trim() !== "") {
	  createLocationCard(titleInput.value.trim(), imageLinkInput.value.trim());

	  titleInput.value = "";
	  imageLinkInput.value = "";
	}
  }
}

// Map through pre-existing locations to create initial location cards on page load
initialCards.map(function (location) {
  createLocationCard(location.name, location.link);
});

editButton.addEventListener("click", togglePopup);
editCloseButton.addEventListener("click", togglePopup);
saveButton.addEventListener("click", togglePopup);
editForm.addEventListener("submit", formSubmitHandler);

addButton.addEventListener("click", togglePopup);
addCloseButton.addEventListener("click", togglePopup);
createButton.addEventListener("click", togglePopup);
addForm.addEventListener("submit", formSubmitHandler);

imageCloseButton.addEventListener("click", togglePopup);
