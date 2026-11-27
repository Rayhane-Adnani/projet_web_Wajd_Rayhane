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
let productName = params.get("name");
let productPrice = params.get("price");
if (productName) {
    document.getElementById("product").value = productName;
}
if (productPrice) {
    document.getElementById("price").value = productPrice;
}
function showVerdict() {
    let product = document.getElementById("product").value;
    let price = document.getElementById("price").value;
    let budget = document.getElementById("budget").value;
    let frequency = document.getElementById("frequency").value;
    let reason = document.getElementById("reason").value;
    let own = document.getElementById("own").value;
    let error = document.getElementById("error");
    let result = document.getElementById("result");
    if (product === "" || price === "" || budget === "" || frequency === "" || reason === "" || own === "") {
        error.classList.remove("hidden");
        result.classList.add("hidden");
        return;
    }
    error.classList.add("hidden");
    let needScore = Number(frequency) + Number(reason) + Number(own);
    let budgetOk = Number(budget) >= Number(price);
    let suitable = needScore >= 3;
    let littleOver = Number(price) <= Number(budget) * 1.5;
    let title = document.getElementById("result-title");
    let text = document.getElementById("result-text");
    let buyBtn = document.getElementById("buy-btn");
    let instBtn = document.getElementById("inst-btn");
    let altBtn = document.getElementById("alt-btn");
    result.classList.remove("buy", "wait", "think");
    buyBtn.classList.add("hidden");
    instBtn.classList.add("hidden");
    altBtn.classList.add("hidden");
    if (suitable && budgetOk) {
        title.textContent = "✅ BUY NOW";
        text.textContent = product + " matches your needs and your budget. You can go straight to checkout.";
        result.classList.add("buy");
        buyBtn.classList.remove("hidden");
    } else if (suitable && littleOver) {
        let part = Math.ceil(Number(price) / 3);
        title.textContent = "💳 PAY IN INSTALLMENTS";
        text.textContent = product + " is suitable, but your budget is tight. " +
            "Pay in 3 installments of " + part + " DT and get it now.";
        result.classList.add("wait");
        instBtn.classList.remove("hidden");
    } else {
        title.textContent = "💡 BETTER OPTION";
        text.textContent = "Your budget is not enough for " + product + ". " +
            "We have a more suitable option in our store for you.";
        result.classList.add("think");
        altBtn.classList.remove("hidden");
    }
    result.classList.remove("hidden");
    result.scrollIntoView({ behavior: "smooth" });
}
function buyNow() {
    let product = {
        name: document.getElementById("product").value,
        price: document.getElementById("price").value
    };
    localStorage.setItem("order", JSON.stringify(product));
    window.location.href = "buy.html";
}
function payInstallments() {
    let price = Number(document.getElementById("price").value);
    let product = {
        name: document.getElementById("product").value,
        price: price,
        installments: 3,
        part: Math.ceil(price / 3)
    };
    localStorage.setItem("order", JSON.stringify(product));
    window.location.href = "installments.html";
}
function seeAlternatives() {
    window.location.href = "home.html";
}
