import { cards } from "./cards";

const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
const headerInput = document.querySelector(".header-input");
const modalCloseBtn = document.querySelector(".modal-close-btn");

const cardList = document.querySelector(".cards");

function renderModal(data) {
  const modalImg = document.querySelector(".modal-img");
  const modalWrapImg = document.querySelector(".modal-wrap-img");
  const modalList = document.querySelector(".modal-list");
  modalList.innerHTML = "";

  modalWrapImg.src = data._embedded.events[0].images.find(el => el.width === 640 && el.height === 427).url;
  modalImg.src = data._embedded.events[0].images.find(el => el.width === 205 && el.height === 115).url;

  if (data === "Data not found!") {
    modalList.insertAdjacentHTML("beforeend", `<h1 class="error">${data} Please, try something else!</h1>`)
    return;
  }

  modalList.insertAdjacentHTML(
    "beforeend",
    `
            <li class="modal-list-item">
              <h2 class="modal-list-title">WHEN</h2>
              <p class="modal-list-desc">${data._embedded.events[0].dates.start.localDate === undefined ? "Not found" : data._embedded.events[0].dates.start.localDate}</p>
              <p class="modal-list-desc time-desc">${data._embedded.events[0].dates.start.localTime === undefined ? "Not found" : data._embedded.events[0].dates.start.localTime}(${data._embedded.events[0].dates.timezone === undefined ? "Not found" : data._embedded.events[0].dates.timezone})</p>
            </li>
            <li class="modal-list-item">
              <h2 class="modal-list-title">WHERE</h2>
              <p class="modal-list-desc">${data._embedded.events[0].dates.timezone === undefined ? "Not found" : data._embedded.events[0].dates.timezone}</p>
              <p class="modal-list-desc location-desc">${data._embedded.events[0]._embedded.venues[0].name === undefined ? "Not found" : data._embedded.events[0]._embedded.venues[0].name}</p>
            </li>
            <li class="modal-list-item">
              <h2 class="modal-list-title">WHO</h2>
              <p class="modal-list-desc author-desc">${data._embedded.events[0]._embedded.attractions[0].name === undefined ? "Not found" : data._embedded.events[0]._embedded.attractions[0].name}</p>
            </li>
            `
  );
};

async function searchModalData(id) {
  let data;


  data = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?id=${id}&apikey=${import.meta.env.VITE_API_KEY}`);

  const modalData = await data.json();

  renderModal(modalData);

  modal.style.display = "block";
  backdrop.style.display = "block";

  setTimeout(() => {
    modal.style.opacity = "1";
    backdrop.style.opacity = "1";
  }, 200);
}



function closeModal() {
  modal.style.opacity = "0";
  backdrop.style.opacity = "0";


  setTimeout(() => {
    modal.style.display = "none";
    backdrop.style.display = "none";
  }, 400);
}

function onCloseBackdropClick(e) {
  if (e.currentTarget === e.target) {
    closeModal();
  }
}

function onCloseEscapeClick(e) {
  if (e.key === "Escape") {
    closeModal();
  }
}


cardList.addEventListener("click", (e) => {
  if (e.target.tagname !== "UL") {
    if (e.target.tagname === "LI") {
      searchModalData(e.target.getAttribute("data-id"));
    }
    else {
      searchModalData(e.target.parentElement.getAttribute("data-id"));
    }
  }
});

function renderModalData() {
  document.querySelector(".modal-author-btn").addEventListener("click", moreFromThisAuthor);
  backdrop.addEventListener("click", onCloseBackdropClick);
  document.addEventListener("keyup", onCloseEscapeClick);
  modalCloseBtn.addEventListener("click", closeModal);
}

function moreFromThisAuthor(e) {
  headerInput.value = e.target.parentElement.children[1].querySelector(".author-desc").innerHTML;
  cards(1);
  closeModal();
}

export { renderModalData };

