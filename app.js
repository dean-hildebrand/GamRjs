//  variables

const cartBtn = document.querySelector("cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart items array
let cart = [];
// all the buttons
let buttonsDOM = [];

// getting the products from json file ----------------------------------
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();

      let products = data.items;

      products = products.map((item) => {
        //   // destructuring object
        const { title, price } = item.fields;
        const { id } = item.sys;
        const { image } = item.fields;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      console.log(error);
    }
  }
}
// ------------------------------------------------------------------
// display products -----------------------------------------------
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
      <!-- single product -->
      <article class="product">
        <div class="img-container">
          <img
            src=${product.image.fields.file.url}
            alt="product"
            class="product-img"
          />
          <button class="bag-btn" data-id=${product.id}>
            <i class="fas fa-shopping-cart"></i>Add to cart
          </button>
        </div>
        <h3>${product.title}</h3>
        <h4>$${product.price}</h4>
      </article>
      <!-- end of single product -->
      `;
    });
    productsDOM.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    // adds all the buttons to global variable to use in multiple functions
    buttonsDOM = buttons
    buttons.forEach((button) => {
      let id = button.dataset.id;
      // checks the id's in the cart with the button id
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;
        // get the product
        let cartItem = {...Storage.getProduct(id), amount: 1}
        // add product to cart
        cart = [...cart, cartItem]
        console.log(cart);
        // save cart in local storage
        // set cart values
        // display cart item
        // show the cart with overlay
      });
    });

    // console.log(buttons);
  }
}
// end UI class to display products---------------------------------------------------
// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id) {
    // use localstorage to find the product clicked on by the id
    let products = JSON.parse(localStorage.getItem('products'))
    return products.find(product => product.id === id)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons(() => {});
    });
});
