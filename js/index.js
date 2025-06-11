import { cards } from "./cards.js";
import { setupDropdown, setupSearch } from "./filter.js";
import { renderModalData } from "./modal.js";

setupDropdown();
setupSearch();
cards(1);
renderModalData();
