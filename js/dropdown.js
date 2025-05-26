export function initDropdown() {
    const opinions = document.querySelectorAll(".options li");
    const dropdown = document.querySelector(".dropdown");
    const summary = document.getElementById("selected-option"); 

    if (!opinions.length || !summary || !dropdown) return;

    opinions.forEach((el) => {
        el.addEventListener("click", () => {
            summary.textContent = el.textContent;
            dropdown.removeAttribute("open");
        });
    });
}