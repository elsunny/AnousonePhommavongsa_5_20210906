// /////////////// js script on product details product.html //////////////////////

import {

    convertPrice,
    getProductData,
    backBtn,
    toastMessage,
    isInLocalStorage,
    setInLocalStorage,
    qtyToastMessage,
    
} from "./module.js";

// back button to previous history page
backBtn();

// get the node container for the options
const productOptions = document.querySelector(".options__product");

// get the html template for the options display to be clone
const optionsProductTemplate = document.querySelector("#optionTemplate");

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
    const productPrice = convertPrice(data.price, 100);
    // display the product selected with the server informations
    document.querySelector(".product__image").src = data.imageUrl;
    document.querySelector(".product__caption h1").innerText = data.name;
    document.querySelector(".product-details__description").innerText =
        data.description;
    document.querySelector(".products__card__price").innerText = productPrice;

    // dynamic display of the product options
    data.lenses.forEach((opt) => {
        const optionDisplay = optionsProductTemplate.content.cloneNode(true);
        optionDisplay.querySelector(".labelOption").setAttribute("for", opt);
        const oups = (optionDisplay.querySelector(
            ".labelOption span"
        ).innerText = opt);
        optionDisplay
            .querySelector(".labelOption input")
            .setAttribute("id", opt);
        optionDisplay
            .querySelector(".labelOption input")
            .setAttribute("value", opt);

        // insert the code in the container
        productOptions.appendChild(optionDisplay);
    });
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

// select the button "ajouter au panier" and add a listener
const addToCartBtn = document.querySelector(".product-details__add-btn");
addToCartBtn.addEventListener("click", () => {
    try {
        // get the option selected by user
        const optionSelection = document.querySelector(
            'input[type="radio"]:checked'
        ).value;

        // loading already bought object from localstorage
        const productsArray =
            isInLocalStorage("productInCart") || [];

        //looking for product with same id and option
        let productBought = productsArray.find((p) => {
            return p.id === productId && p.option === optionSelection;
        });

        // add new product if it unknown
        if (!productBought) {
            productBought = new ProductBought(productId, optionSelection);
            productsArray.push(productBought);
            toastMessage("Votre produit a été ajouté au panier", "", 1200);
        }

        // the product already exist, increase the quantity and limit the maximum to 10
        if (productBought.qty < 10) {

            productBought.qty += 1;
            setInLocalStorage("productInCart", productsArray);
            toastMessage("Votre produit a été ajouté au panier", "", 1200);

        } else {

            toastMessage(
                "L'achat est limité à 10 produits identiques",
                "red",
                2000
            );
        }
    } catch (error) {
        console.log("nous avons rencontré une erreur " + error);
        toastMessage("nous avons rencontré un problème!", "red", 5000);
    }
});

//show item number in the cart toast menu
const qtyStored = isInLocalStorage("quantite")
qtyToastMessage(qtyStored);
