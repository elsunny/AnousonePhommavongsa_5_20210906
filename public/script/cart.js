// ///////////// js script for cart page cart.html //////////////////

import { getProductData } from "./module.js";
import { convertPrice } from "./module.js";

// get the informations from localstorage
const cartProducts = JSON.parse(localStorage.getItem("productInCart"));

// get the node for html
const cartTemplate = document.querySelector("#cartTemplate");
const cartInsert = document.querySelector(".carts");

// collect the products with all details on the server
const serverProducts = [];



// dynamique display of card for each product
    cartProducts.forEach(async (cartProduct) => {

        try {

            // get the server product informations for the product in the cart
            const product = await getProductData(cartProduct.id);
            serverProducts.push(product);

            // clone the html template
            const cartPublish = cartTemplate.content
                .querySelector(".product")
                .cloneNode(true);

            // replace the html template value by the product in cart value
            cartPublish.querySelector(".product__caption h2").innerText = product.name;
            cartPublish.querySelector(".product__caption h3").innerText =
                cartProduct.option;
            cartPublish.querySelector(".products__card__price").innerText =
                convertPrice(product.price, 100);
            cartPublish.querySelector(".product img").src = product.imageUrl;
            cartPublish.querySelector("select[name=qty]").value = cartProduct.qty;

            // set dataset attribute to each product of the cart, it will help while updating the quantity
            cartPublish.setAttribute("data-id", cartProduct.id);
            cartPublish.setAttribute("data-option", cartProduct.option);

            // add listener event on the product quantity selector
            cartPublish.querySelector("select[name=qty]").addEventListener("change", (e)=>{
                e.preventDefault();
                // get the new quantity
                const qtyUpdated = e.target.value;
                // refresh the calculation

                // get the price, the id and option of the product whom quantity has been updated
                // get the price
                let productPrice = cartPublish.querySelector(".products__card__price").textContent;
                productPrice = parseInt(productPrice.replace(' €',""));

                //get the id and option
                const productId = cartPublish.getAttribute("data-id");
                const productOption = cartPublish.getAttribute("data-option");
                

                // update the quantity localstorage
                // cherche dans le localStorage où se trouve le produit dont la quantité a changée
                const isInProducts = (pdt) => {
                    return pdt.id === productId && pdt.option === productOption;
                }
                const productIndex = cartProducts.findIndex(isInProducts);
                cartProducts[productIndex].qty = parseInt(qtyUpdated);
                localStorage.setItem("productInCart", JSON.stringify(cartProducts));

                // update the amount and quantity display
                displayTotal();
                
            })

            //remove the product
            cartPublish.querySelector(".product__delete").addEventListener("click", (e)=>{
                e.preventDefault();
                const qtyUpdated = 0;
                //get the id and option
                const productId = cartPublish.getAttribute("data-id");
                const productOption = cartPublish.getAttribute("data-option");
                

                // delete the product in localstorage
                const isInProducts = (pdt) => {
                    return pdt.id === productId && pdt.option === productOption;
                }
                const productIndex = cartProducts.findIndex(isInProducts);
                cartProducts.splice(productIndex, 1);
                localStorage.setItem("productInCart", JSON.stringify(cartProducts));

                // update the amount and quantity display
                displayTotal();
                console.log("html product", cartPublish);
                cartPublish.remove();
            })

            // insert the code in the html
            cartInsert.appendChild(cartPublish);

            // call display total items number and total price amount
            displayTotal();

        } catch (error) {
            error;
        }

    });
    
    // function definition display total items number and total price amount
    const displayTotal = () => {
        const { cartNum, cartTotal } = cartProducts.reduce(
            (acc, cartProduct) => {
                const myProduct = serverProducts.find((p)=> {
                    return (p._id === cartProduct.id)
                })
                acc.cartNum += cartProduct.qty;
                if (myProduct) {
                    acc.cartTotal += myProduct.price * cartProduct.qty;
                }
                return acc;
            },
            { cartNum: 0, cartTotal: 0 }
        );

        // show the products number in the cart
        document.querySelector(
            ".subtotal__items"
        ).innerText = `(${cartNum} articles)`;

        //calcul subtotal price
        document.querySelector(".subtotal__amount").innerText = convertPrice (cartTotal, 100);
    };




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
