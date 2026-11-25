let links = document.querySelectorAll("nav a");
let currentPage = window.location.pathname.split("/").pop();

for (let i = 0; i < links.length; i++) {
    if (links[i].getAttribute("href") === currentPage) {
        links[i].classList.add("active");
    }
}
let hour = new Date().getHours();
let message;

if (hour < 12) {
    message = "Good morning! Think twice before you buy.";
} else if (hour < 18) {
    message = "Good afternoon! Think twice before you buy.";
} else {
    message = "Good evening! Think twice before you buy.";
}

let title = document.querySelector("h1");
let welcome = document.createElement("p");
welcome.textContent = message;
title.insertAdjacentElement("afterend", welcome);

function toggleMenu() {
    let mainNav = document.getElementById("main-nav");
    mainNav.classList.toggle("open");
}

function changeTheme() {
    let themeBtn = document.getElementById("theme-toggle");

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.value = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");   
    } else {
        themeBtn.value = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    document.getElementById("theme-toggle").value = "☀️ Light Mode";
}
