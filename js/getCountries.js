const VITE_API_KEY = "jb8WuckSdZIt1NKg3N7OLggB11Jhj1L2";

export async function loadAndPopulateCountries() {
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${VITE_API_KEY}&size=200`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    if (!data._embedded || !data._embedded.events) {
      console.log("No events found");
      return [];
    }

    const countries = [];

    data._embedded.events.forEach(event => {
      const venues = event._embedded?.venues;
      if (venues) {
        venues.forEach(venue => {
          if (venue.country) {
            countries.push(venue.country);
          }
        });
      }
    });

    const uniqueCountriesMap = new Map();
    countries.forEach(country => {
      if (!uniqueCountriesMap.has(country.countryCode)) {
        uniqueCountriesMap.set(country.countryCode, country.name);
      }
    });

    const uniqueCountries = Array.from(uniqueCountriesMap, ([code, name]) => ({ code, name }));

    // Тепер оновлюємо DOM
    const list = document.querySelector(".options");
    if (list) {
      list.innerHTML = "";
      uniqueCountries.forEach(country => {
        const li = document.createElement("li");
        li.className = "options-item";
        li.textContent = country.name;
        li.dataset.code = country.code;

        li.addEventListener("click", () => {
          const summary = document.getElementById("selected-option");
          summary.textContent = country.name;
          // додаємо назад svg
          const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
          svg.setAttribute("class", "custom-arrow");
          svg.setAttribute("width", "13");
          svg.setAttribute("height", "8");
          svg.setAttribute("viewBox", "0 0 13 8");
          svg.setAttribute("fill", "#939393");
          svg.innerHTML = '<path d="M6.5 8L0.00480968 0.5L12.9952 0.499999L6.5 8Z" fill="#939393" />';
          summary.appendChild(svg);

          summary.parentElement.open = false;
        });

        list.appendChild(li);
      });
    }

    return uniqueCountries;

  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}
