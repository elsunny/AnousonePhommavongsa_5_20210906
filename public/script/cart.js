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
        cart.setAttribute("data-id", theId);
        cart.setAttribute("data-price", product.price);
        cart.querySelector(".product__caption h2").innerText = product.name;
        cart.querySelector(".product__caption h3").innerText =
            cartProduct.option;
        cart.querySelector(".products__card__price").innerText = convertPrice(
            product.price,
            100
        );
        cart.querySelector(".product img").src = product.imageUrl;
        cart.querySelector("select[name=qty]").value = cartProduct.qty;

        // insert the code in the container
        cartInsert.appendChild(cart);
    });
    
}

const displayTotal = () => {
    // const {cartNum, total} = cartProducts.reduce((acc, cartProduct) => {
    //     acc.cartNum += cartProduct.qty;
    //     acc.total += product.price * cartProduct.qty;
    //     return acc;
    // },{cartNum:0, total:0})

    let cartNum = 0;
    let cartTotal = 0;
    const cartNode = cartInsert.children;
    console.log(cartNode[1]);

    for (let i = 0; i < cartNode.length; i++) {
        console.log(cartNode[i]);
        // const qty = el.querySelector("select[name=qty]").value;
        // cartNum += qty;
    }
    // console.log("cartNum " + cartNum);

    // show the products number in the cart
    document.querySelector(
        ".subtotal__items"
    ).innerText = `(${cartNum} articles)`;

    //calcul subtotal price
    document.querySelector(".subtotal__amount").innerText = convertPrice(
        cartTotal,
        100
    );
};
displayTotal();

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

// sending the order to server
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // get the form informations filled by the customer
    let contact = new Customer(
        form.querySelector("input[name=nom]").value,
        form.querySelector("input[name=prenom]").value,
        form.querySelector("input[name=adresse]").value,
        form.querySelector("input[name=ville]").value,
        form.querySelector("input[name=email]").value
    );

    //product id from the customer cart
    const productId = cartProducts.map((p) => {
        return p.id;
    });

    // collect customer informations and products ordered
    let orderData = {
        contact: contact,
        products: productId,
    };

    // fetch("http://localhost:3000/api/cameras/order", init)
    //     // Converting to JSON
    //     .then((response) => response.json())

    //     // Displaying results to console
    //     .then((response) => console.log(response));

    // get order id information and store in localstorage order and customer details
    const data = await getOrderId(orderData);

    const customerOrder = {
        name: data.contact.firstName,
        lastName: data.contact.lastName,
        orderID: data.orderId,
    };
    localStorage.setItem("orderId", JSON.stringify(customerOrder));
});

async function getOrderId(orderData) {
    // option for the fetch with post method
    const init = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    };

    const reponse = await fetch(
        "http://localhost:3000/api/cameras/order",
        init
    );
    return reponse.json();
}
