// const imagePopup = document.querySelector(".popup_type_image");

// function viewFullImage(e) {
//   const fullSizeImage = imagePopup.querySelector(".popup__full-size-image");
//   const imageCaption = imagePopup.querySelector(".popup__image-caption");
//   imagePopup.classList.toggle("popup_opened");

//   fullSizeImage.src = e.target.src;
//   imageCaption.textContent = e.target.nextElementSibling.querySelector(
//     ".elements__location-name"
//   ).textContent;
//   attachEscKeyListener();
// }

// function escapeKeyClose(e) {
//   if (e.key === "Escape") {
//     if (imagePopup.classList.contains("popup_opened")) {
//       imagePopup.classList.toggle("popup_opened");

//       document.removeEventListener("keyup", escapeKeyClose);
//     }
//   }
// }

// function attachEscKeyListener() {
//   document.addEventListener("keyup", escapeKeyClose);
// }

// export default viewFullImage;