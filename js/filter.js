import { cards } from "./cards.js";
import data from "./countries.json";

const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

const search = document.querySelector(".header__input");

function renderByCountryCode(item) {
  if (item.textContent === "All") {
    dropdownToggle.textContent = "Choose country";
  } else {
    dropdownToggle.textContent = item.textContent;
  }
  cards(1);
  dropdownMenu.classList.toggle('show');
}

function setupDropdown() {
  data.forEach(el => {
    dropdownMenu.insertAdjacentHTML("beforeend", `<div class="dropdown-item">${el.name}</div>`);
  });

  dropdownMenu.insertAdjacentHTML("afterbegin", "<div class='dropdown-item'>All</div>");

  dropdownToggle.addEventListener('click', () => {
    dropdownMenu.classList.toggle('show');
  });

  dropdownMenu.addEventListener("click", (ev) => {
    if (ev.target.className === "dropdown-item") {
      renderByCountryCode(ev.target);
    }
  });
}

function setupSearch() {
  search.addEventListener("input", () => cards(1));

}

export { setupDropdown, setupSearch };

