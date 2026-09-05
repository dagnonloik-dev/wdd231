const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.querySelector("span").textContent = isOpen ? "✕" : "☰";
});


// Display the current year
const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


// Display the last modified date
document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;