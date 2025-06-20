import dataFromJSON from "./countries.json";
import { renderPagination } from "./pagination.js";

function render(data) {
  const list = document.querySelector(".cards");
  list.innerHTML = "";

  if (data === "Data not found!") {
    list.insertAdjacentHTML("beforeend", `<h1 class="error">${data} Please, try something else!</h1>`)
    return;
  }

  data._embedded.events.forEach(el => {
    list.insertAdjacentHTML(
      "beforeend",
      `
      <li class="cards-item" data-id="${el.id}">
        <div class="cards-deco"></div>
        <img src="${el.images.find(el => el.width === 640 && el.height === 427).url}" class="cards-image">
        <h2 class="cards-title">${el.name}</h2>
        <p class="cards-date">${el.dates.start.localDate}</p>
        <p class="cards-place">${el._embedded.venues[0].name || "Not found :("}</p>
      </li> 
      `
    )
  });
}

async function cards(page) {
  const country = document.querySelector(".dropdown-toggle").textContent;
  const searchValue = document.querySelector(".header-input").value;

  try {
    let data;

    if (country === "Choose country") {
      if (searchValue !== "") {
        data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=20&keyword=${searchValue}&page=${page}&apikey=${import.meta.env.VITE_API_KEY}`);
      } else {
        data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=20&page=${page}&apikey=${import.meta.env.VITE_API_KEY}`);
      }

      const cards = await data.json();

      render(cards);
      renderPagination(cards.page.number + 1, cards.page.totalPages);
    } else {
      const code = dataFromJSON.find(el => el.name === country).countryCode;

      let data;

      if (searchValue !== "") {
        data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=20&keyword=${searchValue}&countryCode=${code}&page=${page}&apikey=${import.meta.env.VITE_API_KEY}`);
      } else {
        data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?size=20&countryCode=${code}&page=${page}&apikey=${import.meta.env.VITE_API_KEY}`);
      }

      const json = await data.json();

      render(json);
      renderPagination(json.page.number + 1, json.page.totalPages);
    }
  } catch (err) {
    render("Data not found!");
  }
}

export { cards, render };
