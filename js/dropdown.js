export function initDropdown() {
    const dropdown = document.querySelector(".dropdown");
    const summary = document.getElementById("selected-option");
    const list = dropdown.querySelector(".options");

    if (!list || !summary || !dropdown) return;

    
    const items = Array.from(list.querySelectorAll("li"));
    const sortedItems = items.sort((a, b) => a.textContent.localeCompare(b.textContent));


    list.innerHTML = "";
    sortedItems.forEach(el => {
        list.appendChild(el);

        el.addEventListener("click", () => {
            summary.textContent = el.textContent;
            dropdown.removeAttribute("open");
        });
    });
}
