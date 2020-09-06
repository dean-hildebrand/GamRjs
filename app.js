//  variables

const cartBtn = document.querySelector('cart-btn')
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart items array
let cart = []
// all the buttons
let buttonsDOM = []

// getting the products from json file ----------------------------------
class Products {
  async getProducts(){
  try {
    let result = await fetch("products.json")
    let data = await result.json()
    console.log(data);
  } catch (e) {

  } finally {

  }
  }
}
// ------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products()
  products
  .getProducts()
})
