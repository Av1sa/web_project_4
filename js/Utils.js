import { selectors } from "./script.js";

//Error image
const errorImageLink =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTDDxuIkubELpYS3h54VsoXlcOGeMwwe0Plrx4cHH272FNDc366&usqp=CAU";

//Find element in DOM
const findElement = (parent, selector) => {
  return parent.querySelector(selector);
};

// Show/hide popup
const togglePopup = (popup) => {
  popup.classList.toggle(selectors.popupIsOpenedClass);
};

export { findElement, errorImageLink, togglePopup };
