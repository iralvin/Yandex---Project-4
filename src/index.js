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
};
const userInfoClass = new UserInfo(userInfoSelector);

const profilePic = document.querySelector(".profile__avatar");
let userID;

const api = new Api("https://around.nomoreparties.co/v1/group-3/", {
  headers: {
    authorization: "0519b525-02c0-4fb8-9c6d-6c37076de85e",
    "Content-Type": "application/json",
  },
});

function populateProfileEditForm() {
  const userInfo = userInfoClass.getUserInfo();
  nameInput.value = userInfo.name;
  aboutMeInput.value = userInfo.profession;
}

const handleEditFormSubmit = ({ name, profession }, submitButton) => {
  //////////// SAVE USER INFORMATION

  return api.setUserInfo({ name, profession }).then((res) => {
    if (res.ok) {
      submitButton.textContent = "Save";
      userInfoClass.setUserInfo(name, profession);
    }
    else {
      Promise.reject("Error " + res.statusText);
    }
  })
  .catch(err => {
    console.log(err);
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
const handleConfirmDeleteCard = () => {
  return api.deleteCard(cardToDelete).then((res) => {
    if (res.ok) {
      cardToDelete._cardElement.remove();
    }
    else {
      Promise.reject("Error " + res.statusText);
    }
  })
  .catch(err => {
    console.log(err);
  });
};

const handleChangeProfilePic = (newProfilePic, submitButton) => {
  return api
    .setUserAvatar(newProfilePic, submitButton)
    .then((res) => {
      if (res.ok) {
        submitButton.textContent = "Save";
        profilePic.src = newProfilePic["profile-pic"];
      } else {
        Promise.reject("Error " + res.statusText);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// ADD LOCATION FORM
const handleAddFormSubmit = (newLocationData, submitButton) => {
  return api
    .addNewCard(newLocationData)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      else {
        Promise.reject("Error " + res.statusText);
      }
    })
    .then((res) => {
      const card = new Card(
        res,
        locationTemplate,
        () => {
          popupWithImage.open(newLocationData);
        },
        (cardToBeDelete) => {
          deletePopupClass.open();
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
    })
    .catch(err => {
      console.log(err);
    });
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

const changeProfilePicPopupClass = new Popup(
  ".popup_type_profile-pic",
  handleResetForm
);
const changeProfilePicFormPopupClass = new PopupWithForm(
  ".popup_type_profile-pic",
  handleChangeProfilePic,
  handleResetForm
);
changeProfilePicFormPopupClass.setEventListeners();
changeProfilePictureButton.addEventListener("click", () => {
  changeProfilePicPopupClass.open();
});

const deletePopupClass = new Popup(".popup_type_delete");
const deletePopupWithDeleteClass = new PopupWithForm(
  ".popup_type_delete",
  handleConfirmDeleteCard
);
deletePopupWithDeleteClass.setEventListeners();

api.getUserInfo().then((result) => {
  profilePic.src = result.avatar;
  document.querySelector(".profile__name").textContent = result.name;
  document.querySelector(".profile__about-me").textContent = result.about;
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
            deletePopupClass.open();
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
