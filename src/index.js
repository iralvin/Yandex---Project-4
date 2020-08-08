import Section from "./Section.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import "./pages/index.css"; // add import of the main stylesheets file

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editForm = editPopup.querySelector(".popup__form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const aboutMeInput = editForm.querySelector(".popup__input_type_about-me");

const addButton = document.querySelector(".profile__add-button");

const elementsList = document.querySelector(".elements__list");

const locationTemplate = document.querySelector("#location-template").content;

const changeProfilePictureButton = document.querySelector(
  ".profile__avatar-button"
);

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
  profileAvatar: ".profile__avatar",
};
const userInfoClass = new UserInfo(userInfoSelector, nameInput, aboutMeInput);

const profilePic = document.querySelector(".profile__avatar");
let userID;

const api = new Api("https://around.nomoreparties.co/v1/group-3/", {
  headers: {
    authorization: "0519b525-02c0-4fb8-9c6d-6c37076de85e",
    "Content-Type": "application/json",
  },
});

const handleEditFormSubmit = ({ name, profession }, submitButton) => {
  //////////// SAVE USER INFORMATION

  return api.setUserInfo({ name, profession }).then(() => {
    submitButton.textContent = "Save";
    userInfoClass.setUserInfo(name, profession);
  });
};

const handleResetForm = (popup) => {
  formValidator._closeFormHandler(popup);
};

const handleAddImageLike = (card) => {
  return api.setLikeForImage(card);
};

const handleRemoveImageLike = (card) => {
  return api.removeLikeForImage(card);
};

let cardToDelete;
const handleConfirmDeleteCard = ({}, submitButton) => {
  return api.deleteCard(cardToDelete).then(() => {
    cardToDelete._cardElement.remove();
    submitButton.textContent = "Yes";

  });
};

const handleChangeProfilePic = (newProfilePic, submitButton) => {
  return api.setUserAvatar(newProfilePic, submitButton).then(() => {
    submitButton.textContent = "Save";
    userInfoClass.setUserAvatar(newProfilePic["profile-pic"]);
  });
};

// ADD LOCATION FORM
const handleAddFormSubmit = (newLocationData, submitButton) => {
  return api
    .addNewCard(newLocationData)
    .then((res) => {
      const card = new Card(
        res,
        locationTemplate,
        () => {
          popupWithImage.open(newLocationData);
        },
        (cardToBeDelete) => {
          deletePopupWithDeleteClass.open();
          cardToDelete = cardToBeDelete;
        },
        userID,
        handleAddImageLike,
        handleRemoveImageLike
      );
      const newCard = card.generateCard();

      elementsList.prepend(newCard);
    })
    .then(() => {
      submitButton.textContent = "Create";
    });
};

const editPopupFormClass = new PopupWithForm(
  ".popup_type_edit",
  handleEditFormSubmit,
  handleResetForm
);
editPopupFormClass.setEventListeners();
editButton.addEventListener("click", () => {
  userInfoClass.setUserInputValues();
  editPopupFormClass.open();
});

const addPopupFormClass = new PopupWithForm(
  ".popup_type_add",
  handleAddFormSubmit,
  handleResetForm
);
addPopupFormClass.setEventListeners();
addButton.addEventListener("click", () => {
  addPopupFormClass.open();
});

const changeProfilePicFormPopupClass = new PopupWithForm(
  ".popup_type_profile-pic",
  handleChangeProfilePic,
  handleResetForm
);
changeProfilePicFormPopupClass.setEventListeners();
changeProfilePictureButton.addEventListener("click", () => {
  changeProfilePicFormPopupClass.open();
});

const deletePopupWithDeleteClass = new PopupWithForm(
  ".popup_type_delete",
  handleConfirmDeleteCard
);
deletePopupWithDeleteClass.setEventListeners();

api.getUserInfo().then((result) => {
  userInfoClass.setUserAvatar(result.avatar);
  userInfoClass.setUserInfo(result.name, result.about);
  userID = result._id;
});

api.getInitialCards().then((result) => {
  const initialCardsSection = new Section(
    {
      items: result,
      renderer: (item) => {
        const card = new Card(
          item,
          locationTemplate,
          () => {
            popupWithImage.open(item);
          },
          (cardToBeDelete) => {
            deletePopupWithDeleteClass.open();
            cardToDelete = cardToBeDelete;
          },
          userID,
          handleAddImageLike,
          handleRemoveImageLike
        );
        const newCard = card.generateCard();
        initialCardsSection.addItem(newCard);
      },
    },
    "elements__list"
  );

  initialCardsSection.renderItems();
});

//  ENABLE FORM VALIDATION
formsList.forEach((form) => {
  const newFormValidator = new FormValidator(settings, form);
  newFormValidator.enableValidation();
});
