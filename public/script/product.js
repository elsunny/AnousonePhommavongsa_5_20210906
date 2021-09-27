// /////////////// js script on product details product.html //////////////////////
import { getProductData } from "./module.js";

// get window url window.location
// searh for a string in the url with get
const urlParams = new URL(window.location).searchParams;
const productId = urlParams.get("_id");

// display the product in the page
const runProductDisplay = async () => {
    const data = await getProductData(productId);
    // display the product selected with the server informations
    document.querySelector(".product__image").src = data.imageUrl;
    document.querySelector(".product__caption h1").innerText = data.name;
    document.querySelector(".product-details__description").innerText =
        data.description;
    document.querySelector(".products__card__price").innerText = data.price;
};
runProductDisplay();

let qty = 0;

//create product class object
class ProductBought {
    constructor(id, option, qty) {
        this.id = id;
        this.option = option;
        this.qty = qty;
    }
}



// array loading already bought object from localstorage
let productsArray = [];
let productAlreadyInCart = JSON.parse(localStorage.getItem("productInCart"));

if (productAlreadyInCart != null) {
    // concats array with previous array
    productsArray = [...productAlreadyInCart];
}

// ///////////////////////////////////////
//    action add product to cart
// //////////////////////////////////////

const addToCartBtn = document.querySelector(".product-details__add-btn");
addToCartBtn.addEventListener("click", () => {
    // get the option selected by user
    const optionSelection = document.querySelector(
        'input[type="radio"]:checked'
    ).value;

    // array loading already bought object from localstorage
    let productsArray = [];
    let productAlreadyInCart = JSON.parse(
        localStorage.getItem("productInCart")
    );
    const productBought = new ProductBought(productId, optionSelection, 0);

    // check if something is already in cart
    if (productAlreadyInCart !== null) {
        // take in consideration the products already in cart 
        productsArray = [...productAlreadyInCart];
        // loop over the cart products
        let putInCart = productAlreadyInCart.find((p) => {
            //looking for product with same id and option
            if (
                p.id === productBought.id &&
                p.option === productBought.option
            ) {
                // true then increase the quantity of product and store it
                let index = productsArray.indexOf(productBought);
                // let updateQty = productsArray[index].qty;
                console.log(productsArray[index].qty);
                // localStorage.setItem(
                //     "productInCart",
                //     JSON.stringify(productsArray)
                // );
            } else {
                // false then create a new product in the cart
                productsArray.push(productBought);
                localStorage.setItem(
                    "productInCart",
                    JSON.stringify(productsArray)
                );
            }
        });
    } else {
        // nothing in the cart, first product is here added
        productsArray.push(productBought);
        localStorage.setItem("productInCart", JSON.stringify(productsArray));
    }
});
// localStorage.clear();
