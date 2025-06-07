import cards from "./cards.js";
import { initDropdown } from "./dropdown.js";
import { loadAndPopulateCountries } from "./getCountries.js";

initDropdown();

loadAndPopulateCountries().then(() => {
  cards(1);
});

