// /////////////// js script on product details product.html //////////////////////
import { getProductData } from "./module.js";

// get window url window.location
// searh for a string in the url with get
const urlParams = new URL(window.location).searchParams;
const productId = urlParams.get("_id");

if (!productId) {
    window.location = "/";
}

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

//create product class object
class ProductBought {
    constructor(id, option, qty = 0) {
        this.id = id;
        this.option = option;
        this.qty = qty;
    }
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
    const productsArray =
        JSON.parse(localStorage.getItem("productInCart")) || [];

    let productBought = productsArray.find((p) => {
        //looking for product with same id and option
        return p.id === productId && p.option === optionSelection;
    });

    if (!productBought) {
        productBought = new ProductBought(productId, optionSelection);
        productsArray.push(productBought);
    }
    productBought.qty += 1;
    localStorage.setItem("productInCart", JSON.stringify(productsArray));

    
});

