// ///////////// js script for cart page cart.html //////////////////
import { getProductData } from "./module.js";

// get the informations from localstorage
const cartProducts = JSON.parse(localStorage.getItem("productInCart"));
// get the html content for the cart layout to be displayed
const cartTemplate = document.querySelector("#cartTemplate");
// get the template insertion point
const cartInsert = document.querySelector(".carts");
// subtotal price
let subtotalPrice = 0;

// show message if cart is empty otherwise show the cart
if (cartProducts == null) {
    document.querySelector(".cart__message").innerText =
        "votre panier est vide";
} else {
    // replace the template value by the server value
    // dynamique display of card for each product
    cartProducts.forEach(async (cartProduct) => {
        const theId = cartProduct.id;
        const product = await getProductData(theId);
        const cart = cartTemplate.content
            .querySelector(".product")
            .cloneNode(true);
        cart.querySelector(".product__caption h2").innerText = product.name;
        cart.querySelector(".product__caption h3").innerText =
            cartProduct.option;
        cart.querySelector(".products__card__price").innerText = product.price;
        cart.querySelector(".product img").src = product.imageUrl;

        // insert the code in the container
        cartInsert.appendChild(cart);

        // show the products number in the cart
        let cartProductNum = cartProducts.length;
        document.querySelector(
            ".subtotal__items"
        ).innerText = `(${cartProductNum} articles)`;

        //calcul subtotal price
        subtotalPrice += product.price;
        document.querySelector(".subtotal__amount").innerText = subtotalPrice;
    });
}

// remove a product

// calculate the sum of cart products price

// display the price

// get the number of cart item

// products array is grouped by id

//increase decrease quantity
//remove article
//send to server form and cart order
