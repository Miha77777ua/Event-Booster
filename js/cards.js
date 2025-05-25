async function cards(page) {
  const list = document.querySelector(".cards");

  const data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?source=ticketmaster&size=20&page=${page}&apikey=${import.meta.env.VITE_API_KEY}`);
  const cards = await data.json();

  cards._embedded.events.forEach(el => {
    list.insertAdjacentHTML(
      "beforeend",
      `
      <li class="cards-item">
        <div class="cards-deco"></div>
        <img src="${el.images.find(el => el.width === 640 && el.height === 427).url}" class="cards-image">
        <h2 class="cards-title">${el.name}</h2>
        <p class="cards-date">${el.dates.start.localDate}</p>
        <p class="cards-place">${el._embedded.venues[0].name}</p>
      </li> 
      `
    )
  });
}

export default cards;
