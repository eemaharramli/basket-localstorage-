const buyBtn = document.querySelectorAll(".product button");
const products = document.querySelectorAll(".product");
const openBtn = document.querySelector(".open");
const countSpan = document.querySelector("#productCount");
const basketIcon = document.querySelector(".basket");
let countOfProducts = 0;
const submitLogin = document.querySelector('input[type="submit"]');
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const form = document.querySelector("form");
let logedIn = false;
const BASKET = "BASKET";
const logout = document.querySelector("#logout");

window.addEventListener("DOMContentLoaded", () => {
  checkLogedIn();

  getBaskets();
});

/* Logins in the local storage */
const logins = [
  {
    username: "elnur",
    pass: 123123,
  },
  {
    username: "customer",
    pass: 1,
  },
];

// localStorage.setItem('logins', JSON.stringify(logins))

// let users = JSON.parse(localStorage.getItem('logins'))

submitLogin.addEventListener("click", function (e) {
  e.preventDefault();

  const findUser = logins.find(({ username: _USERNAME, pass: _PASS }) => {
    if (_USERNAME == username.value && _PASS == +password.value) {
      localStorage.setItem(
        "login_user",
        JSON.stringify({
          username: username.value,
          pass: +password.value,
        })
      );

      logedIn = true;

      document.querySelector(".main").style.display = "block";

      form.style.display = "none";
    }
  });

  clearInput();

  return findUser;

  // users.forEach(object=>{
  //     if ((object.username === username.value) && (object.pass === +password.value) ) {
  //         logedIn = true
  //         document.querySelector('.main').style.display = 'block'
  //         form.style.display = 'none'

  //     }else alert('Wrong username or password')
  // })
});

/* Check is user was loged in */

function checkLogedIn() {
  const loginControl = JSON.parse(localStorage.getItem("login_user"));

  return logins.find((user) => {
    if (
      user.username == loginControl?.username &&
      user.pass == loginControl?.pass
    ) {
      document.querySelector(".main").style.display = "block";
      form.style.display = "none";
    }
  });
}

/* Function to create cart */

function createCart() {
  const cart = document.createElement("div");
  const field = document.createElement("div");
  const title = document.createElement("h2");
  const closeBtn = document.createElement("button");

  cart.classList.add("cart");
  field.classList.add("cart-field");
  closeBtn.classList.add("close");

  title.textContent = "Basket list:";
  closeBtn.textContent = "Close";

  document.body.appendChild(cart);
  cart.appendChild(title);
  cart.appendChild(field);
  cart.appendChild(closeBtn);
}

createCart();

const cart = document.querySelector(".cart");
const field = document.querySelector(".cart-field");
const close = document.querySelector(".close");

/* Function to open the cart */

function openCart() {
  cart.style.display = "block";
}

/* Function to close the cart */

function closeCart() {
  cart.style.display = "none";
}

/* Open the basket list */
basketIcon.addEventListener("click", openCart);
openBtn.addEventListener("click", openCart);
close.addEventListener("click", closeCart);
logout.addEventListener("click", logOff);

function logOff() {
  const sessionUser = JSON.parse(localStorage.getItem("login_user"));

  if (sessionUser) {
    return logins.find((user) => {
      if (
        user.username == sessionUser.username &&
        user.pass == sessionUser.pass
      ) {
        localStorage.removeItem("login_user");

        document.querySelector(".main").style.display = "none";
        form.style.display = "block";
      }
    });
  }
}

/* Add products to basket */

buyBtn.forEach((item) => {
  // find user basket

  item.addEventListener("click", (e) => {
    let productID = e.target.parentNode.getAttribute("data-id");
    let itemIMG = e.target.parentNode.children[0].children[0].src;
    let basket = JSON.parse(localStorage.getItem(BASKET));

    if (basket == null) basket = [];

    if (item.textContent === "Buy!") {
      item.textContent = "Remove";

      countOfProducts++;

      countSpan.textContent = countOfProducts;

      let request = {
        username: "elnur",
        item: productID,
        img: itemIMG,
      };

      basket.push(request);

      localStorage.setItem(BASKET, JSON.stringify(basket));
    } else if (item.textContent === "Remove") {
      item.textContent = "Buy!";
      countOfProducts--;
      countSpan.textContent = countOfProducts;
    }
    field.appendChild(item.parentNode);
  });
});

function getBaskets() {
  //   openCart();

  const baskets = JSON.parse(localStorage.getItem("BASKET"));

  if (baskets?.length)
    baskets.forEach((item) => {
      field.innerHTML += `
       <div class="product" data-id="${item.item}">
          <div class="product-card">
            <img src='${item.img}' alt="mac" />
          </div>
          <button onclick="removeStorage(${item.item})">Remove</button>
        </div>
    `;
    });

  return baskets;
}

function removeStorage(id) {
  const baskets = JSON.parse(localStorage.getItem("BASKET"));

  const list = baskets.filter((data) => data.item != id);

  localStorage.setItem("BASKET", JSON.stringify(list));

  const parseList = JSON.parse(localStorage.getItem("BASKET"));

  return parseList.forEach((item) => {
    console.log("runn");
    console.log(field.childNodes);
  });
}

/* Clear input values - user after log in or logout */

function clearInput() {
  username.value = "";
  password.value = "";
}
