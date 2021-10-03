// ///////////// js script for cart page cart.html //////////////////

// fetch request for a specific product id
import { getProductData } from "./module.js";
import { convertPrice } from "./module.js";

// get the informations from localstorage
const cartProducts = JSON.parse(localStorage.getItem("productInCart"));

// get the node for html template to display the cart content layout
const cartTemplate = document.querySelector("#cartTemplate");

// get the node for html insertion point
const cartInsert = document.querySelector(".carts");

// get the node for button send order
const sendOrder = document.querySelector(".subtotal__btn");

// product quantity
let cartProductNum = 0;

// subtotal price
let subtotalPrice = 0;

// ///////////////// show message if cart is empty otherwise show the cart /////////////
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
        cart.querySelector(".products__card__price").innerText = convertPrice(
            product.price,
            1000
        );
        cart.querySelector(".product img").src = product.imageUrl;
        cart.querySelector("select[name=qty]").value = cartProduct.qty;

        // insert the code in the container
        cartInsert.appendChild(cart);

        // show the products number in the cart
        cartProductNum += cartProduct.qty;
        document.querySelector(
            ".subtotal__items"
        ).innerText = `(${cartProductNum} articles)`;

        //calcul subtotal price
        subtotalPrice += product.price * cartProduct.qty;
        document.querySelector(".subtotal__amount").innerText = convertPrice(
            subtotalPrice,
            1000
        );
    });
}                                                                                                                                                                                                                                                                                                              



// //////////// remove a product //////////////////

// /////////////// send to server form and cart order //////////////////////

const form = document.getElementById("cartForm");

class Customer {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

//product id from the customer cart
const productId = cartProducts.map((p) => {
    return p.id;
});

// sending the order to server
form.querySelector(".btn__order").addEventListener("submit", (e) => {
    e.preventDefault();

    // get the form informations filled by the customer
    let contact = new Customer(
        form.querySelector("input[name=nom]").value,
        form.querySelector("input[name=prenom]").value,
        form.querySelector("input[name=adresse]").value,
        form.querySelector("input[name=ville]").value,
        form.querySelector("input[name=email]").value
    );

    // collect customer informations and products ordered
    let orderData = {
        contact: contact,
        products: productId,
    };

    // option for the fetch with post method
    const init = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    };

    fetch("http://localhost:3000/api/cameras/order", init)
        // Converting to JSON
        .then((response) => response.json())

        // Displaying results to console
        .then((json) => console.log(json));
});
