import { cards } from "./cards.js";
import { setupDropdown, setupSearch } from "./filter.js";
import { renderModalData } from "./modal.js";

setupDropdown();
setupSearch();
renderModalData();
cards(1);

setTimeout(() => {
  document.querySelector(".overlay").classList.add("hidden");
  document.querySelector(".cards").classList.remove("hidden");
}, 1700);
