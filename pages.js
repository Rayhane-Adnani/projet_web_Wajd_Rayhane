function toggleMenu() {
    document.getElementById("main-nav").classList.toggle("open");
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

function getOrder() {
    return JSON.parse(localStorage.getItem("order"));
}

function showOrder() {
    let order = getOrder();

    if (!order) {
        document.getElementById("checkout").classList.add("hidden");
        document.getElementById("empty-msg").classList.remove("hidden");
        return;
    }

    document.getElementById("o-name").textContent = order.name;
    document.getElementById("o-price").textContent = order.price;
    document.getElementById("o-total").textContent = order.price;

    if (document.getElementById("p1")) {
        let price = Number(order.price);
        let part = Math.ceil(price / 3);
        document.getElementById("p1").textContent = part;
        document.getElementById("p2").textContent = part;
        document.getElementById("p3").textContent = price - 2 * part;
    }
}

function confirmOrder() {
    let name = document.getElementById("d-name").value;
    let phone = document.getElementById("d-phone").value;
    let address = document.getElementById("d-address").value;
    let city = document.getElementById("d-city").value;

    if (name === "" || phone === "" || address === "" || city === "") {
        document.getElementById("error").classList.remove("hidden");
        return;
    }

    let order = getOrder();
    if (order && order.fromBasket) {
        localStorage.removeItem("basket");
    }
    localStorage.removeItem("order");
    document.getElementById("checkout").classList.add("hidden");
    document.getElementById("success").classList.remove("hidden");
}

function getBasket() {
    return JSON.parse(localStorage.getItem("basket")) || [];
}

function showBasket() {
    let basket = getBasket();
    let list = document.getElementById("basket-list");

    if (basket.length === 0) {
        document.getElementById("basket-empty").classList.remove("hidden");
        document.getElementById("basket-full").classList.add("hidden");
        return;
    }

    document.getElementById("basket-empty").classList.add("hidden");
    document.getElementById("basket-full").classList.remove("hidden");
    list.innerHTML = "";

    let total = 0;

    for (let i = 0; i < basket.length; i++) {
        total = total + Number(basket[i].price);

        let row = document.createElement("div");
        row.className = "item";

        let name = document.createElement("span");
        name.textContent = basket[i].name;

        let right = document.createElement("span");
        right.textContent = basket[i].price + " DT ";

        let del = document.createElement("input");
        del.type = "button";
        del.className = "remove-btn";
        del.value = "✖";
        del.onclick = function () {
            removeItem(i);
        };

        right.appendChild(del);
        row.appendChild(name);
        row.appendChild(right);
        list.appendChild(row);
    }

    document.getElementById("b-total").textContent = total;
}

function removeItem(index) {
    let basket = getBasket();
    basket.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
    showBasket();
}

function emptyBasket() {
    localStorage.removeItem("basket");
    showBasket();
}

function checkoutBasket(installments) {
    let basket = getBasket();
    let total = 0;

    for (let i = 0; i < basket.length; i++) {
        total = total + Number(basket[i].price);
    }

    let name = basket[0].name;
    if (basket.length > 1) {
        name = basket.length + " products";
    }

    let order = { name: name, price: total, fromBasket: true };

    if (installments) {
        order.installments = 3;
        order.part = Math.ceil(total / 3);
    }

    localStorage.setItem("order", JSON.stringify(order));

    if (installments) {
        window.location.href = "installments.html";
    } else {
        window.location.href = "buy.html";
    }
}

function sendMessage() {
    let name = document.getElementById("c-name").value;
    let email = document.getElementById("c-email").value;
    let message = document.getElementById("c-message").value;

    if (name === "" || email === "" || message === "") {
        document.getElementById("error").classList.remove("hidden");
        return;
    }

    document.getElementById("contact-form").classList.add("hidden");
    document.getElementById("success").classList.remove("hidden");
}

if (document.getElementById("checkout")) {
    showOrder();
}
if (document.getElementById("basket-full")) {
    showBasket();
}
