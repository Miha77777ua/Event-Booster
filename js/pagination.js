import { cards } from "./cards.js";

function renderPagination(currentPage, totalPages) {
  const pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  const createPageBtn = (page, text = page) => {
    return `<li class="pagination-button ${page === currentPage ? "active" : ""}" data-page="${page}">${text}</li>`;
  };
  if (currentPage > 3) {
    pagination.insertAdjacentHTML("beforeend", createPageBtn(1));
    if (currentPage > 4) pagination.insertAdjacentHTML("beforeend", `<li class="dots">...</li>`);
  }
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i > 0 && i <= totalPages) {
      pagination.insertAdjacentHTML("beforeend", createPageBtn(i));
    }
  }

}


document.querySelector(".pagination").addEventListener("click", (e) => {
  if (e.target.classList.contains("pagination-button")) {
    const newPage = parseInt(e.target.dataset.page);
    if (!isNaN(newPage)) {
      cards(newPage);
    }
  }
});

export { renderPagination };
