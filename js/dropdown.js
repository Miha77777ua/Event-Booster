const opinions = document.querySelectorAll(".options li");
const summary = document.querySelector(".dropdown summary");
opinions.forEach((el) => {
    el.addEventListener("click", () => {
        summary.textContent = el.textContent;
    });
});
