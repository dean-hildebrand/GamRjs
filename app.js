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

      products = products.map(item => {
      //   // destructuring object
        const { title, price } = item.fields;
        const { id } = item.sys;
        const { image } = item.fields.image.fields.file.url
        return { title, price, id, image};
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
  // displayProducts(products) {
  //   let result = "";
  //   products.forEach(product => {
  //     result += `
  //     <!-- single product -->
  //     <article class="product">
  //       <div class="img-container">
  //         <img
  //           src=${product.image}
  //           alt="product"
  //           class="product-img"
  //         />
  //         <button class="bag-btn" data-id=${product.id}>
  //           <i class="fas fa-shopping-cart"></i>Add to cart
  //         </button>
  //       </div>
  //       <h3>${product.title}</h3>
  //       <h4>$${product.price}</h4>
  //     </article>
  //     <!-- end of single product -->
  //     `;
  //   })
  //   productsDOM.innerHTML = result
  // }
}
// end UI class to display products---------------------------------------------------
class Storage {

}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  products.getProducts().then(data => console.log(data))

});
