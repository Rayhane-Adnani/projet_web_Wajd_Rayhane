
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
