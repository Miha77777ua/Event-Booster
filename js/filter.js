import { allEvents } from './index.js';

const searchInput = document.querySelector('.header__input');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const list = document.querySelector('.cards');

let selectedCountry = '';
let searchQuery = '';

dropdownToggle.addEventListener('click', () => {
  dropdownMenu.classList.toggle('show');
});

function renderCountryDropdown() {
  const uniqueCountries = [...new Set(allEvents.map(e => e._embedded.venues[0].country?.name))];
  dropdownMenu.innerHTML = '';
  uniqueCountries.forEach(country => {
    const item = document.createElement('div');
    item.classList.add('dropdown-item');
    item.textContent = country;
    item.dataset.value = country;
    dropdownMenu.appendChild(item);
  });
}

dropdownMenu.addEventListener('click', e => {
  if (e.target.dataset.value) {
    selectedCountry = e.target.dataset.value;
    filterAndRender();
  }
});

searchInput.addEventListener('input', e => {
  searchQuery = e.target.value.trim().toLowerCase();
  filterAndRender();
});

function filterAndRender() {
  const filtered = allEvents.filter(event => {
    const country = event._embedded.venues[0].country?.name || '';
    const name = event.name.toLowerCase();
    return (!selectedCountry || country === selectedCountry) &&
           (!searchQuery || name.includes(searchQuery));
  });

  renderEvents(filtered);
}

function renderEvents(events) {
  list.innerHTML = '';
  events.forEach(el => {
    list.insertAdjacentHTML(
      "beforeend",
      `
      <li class="cards-item">
        <div class="cards-deco"></div>
        <img src="${el.images.find(img => img.width === 640 && img.height === 427)?.url}" class="cards-image">
        <h2 class="cards-title">${el.name}</h2>
        <p class="cards-date">${el.dates.start.localDate}</p>
        <p class="cards-place">${el._embedded.venues[0].name}</p>
      </li> 
      `
    );
  });
}

export { renderCountryDropdown, filterAndRender };