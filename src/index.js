import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import "./pages/index.css"; // add import of the main stylesheets file

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = editPopup.querySelector(".popup__form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const aboutMeInput = editForm.querySelector(".popup__input_type_about-me");

const addButton = document.querySelector(".profile__add-button");

const elementsList = document.querySelector(".elements__list");

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

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const formsList = Array.from(document.forms);
const formValidator = new FormValidator(settings);

const popupWithImage = new PopupWithImage(".popup_type_image");

// EDIT FORM
const userInfoSelector = {
  profileName: ".profile__name",
  profileProfession: ".profile__about-me",
};
const userInfoClass = new UserInfo(userInfoSelector);

function populateProfileEditForm() {
  const userInfo = userInfoClass.getUserInfo();
  nameInput.value = userInfo.name;
  aboutMeInput.value = userInfo.profession;
}

const handleEditFormSubmit = ({ name, profession }) => {
  userInfoClass.setUserInfo(name, profession);
};

const handleResetForm = (popup) => {
  formValidator._closeFormHandler(popup);
};

const editPopupClass = new Popup(".popup_type_edit", handleResetForm);

const editPopupFormClass = new PopupWithForm(
  ".popup_type_edit",
  handleEditFormSubmit,
  handleResetForm
);
editPopupFormClass.setEventListeners();

editButton.addEventListener("click", () => {
  populateProfileEditForm();
  editPopupClass.open();
});

// ADD LOCATION FORM
const handleAddFormSubmit = (locationData) => {
  const card = new Card(locationData, locationTemplate, () => {
    popupWithImage.open(locationData);
  });
  const newCard = card.generateCard();

  elementsList.prepend(newCard);
};

const addPopupClass = new Popup(".popup_type_add", handleResetForm);
const addPopupFormClass = new PopupWithForm(
  ".popup_type_add",
  handleAddFormSubmit,
  handleResetForm
);

addPopupFormClass.setEventListeners();

addButton.addEventListener("click", () => {
  addPopupClass.open();
});

// POPULATE INITIAL CARDS
const initialCardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, locationTemplate, () => {
        popupWithImage.open(item);
      });
      const newCard = card.generateCard();
      initialCardsSection.addItem(newCard);
    },
  },
  "elements__list"
);
initialCardsSection.renderItems();

//  ENABLE FORM VALIDATION
formsList.forEach((form) => {
  const newFormValidator = new FormValidator(settings, form);
  newFormValidator.enableValidation();
});
