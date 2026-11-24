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

let params = new URLSearchParams(window.location.search);
let cat = params.get("cat");

if (cat) {
    let cards = document.querySelectorAll(".product-card");
    let first = null;

    for (let i = 0; i < cards.length; i++) {
        let cardCat = cards[i].querySelector(".product-cat").textContent;

        if (cardCat.toLowerCase() === cat.toLowerCase()) {
            cards[i].classList.add("selected");

            if (first === null) {
                first = cards[i];
            }
        }
    }

    if (first !== null) {
        first.scrollIntoView({ behavior: "smooth", block: "center" });
    }
}

let categoryLinks = document.querySelectorAll(".dropdown a");
let pageName = window.location.pathname.split("/").pop();

for (let i = 0; i < categoryLinks.length; i++) {
    if (categoryLinks[i].getAttribute("href") === pageName) {
        categoryLinks[i].classList.add("active");
    }
}

let thinkButtons = document.querySelectorAll(".think-btn");

for (let i = 0; i < thinkButtons.length; i++) {
    let card = thinkButtons[i].closest(".product-card");
    let name = card.querySelector("h3").textContent;
    let priceText = card.querySelector(".price").textContent;   
    let price = priceText.replace("DT", "").split(" ").join("");

    thinkButtons[i].href = "form.html?name=" + encodeURIComponent(name) + "&price=" + price;
}

function addToBasket(name, price) {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket.push({ name: name, price: price });
    localStorage.setItem("basket", JSON.stringify(basket));
}

let basketCards = document.querySelectorAll(".product-card");

for (let i = 0; i < basketCards.length; i++) {
    let name = basketCards[i].querySelector("h3").textContent.trim();
    let priceText = basketCards[i].querySelector(".price").textContent;
    let price = Number(priceText.replace(/[^0-9]/g, ""));  

    let btn = document.createElement("input");
    btn.type = "button";
    btn.className = "basket-btn";
    btn.value = "🧺 Add to basket";

    btn.onclick = function () {
        addToBasket(name, price);
        btn.value = "✅ Added!";
        setTimeout(function () {
            btn.value = "🧺 Add to basket";
        }, 1500);
    };

    basketCards[i].querySelector(".think-btn").insertAdjacentElement("afterend", btn);
}

    thinkButtons[i].href = "form.html?name=" + encodeURIComponent(name) + "&price=" + price;
}
