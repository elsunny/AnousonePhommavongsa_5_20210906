// /////////////// js script on product details product.html //////////////////////
import { convertPrice, getProductData, backBtn } from "./module.js";


// back button call
backBtn();

// container for the options
const productOptions = document.querySelector(".options__product");

// get the html template for the options display
const optionsProductTemplate = document.querySelector("#optionTemplate")

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
        const oups = optionDisplay.querySelector(".labelOption span").innerText = opt;
        optionDisplay.querySelector(".labelOption input").setAttribute("id", opt);
        optionDisplay.querySelector(".labelOption input").setAttribute("value", opt);

        // insert the code in the container 
        productOptions.appendChild(optionDisplay);
    })
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


    // ============= message pop up product added to cart ===============
    showMessage();
    
});

const showMessage = () => {
    const msg = document.querySelector("#divMsg");
    msg.innerHTML = "<span>Votre produit a été ajouté au panier</span>";
    msg.setAttribute("class", "msgAddToCart");
    setTimeout(() =>{
        msg.setAttribute("class", "");
        msg.innerHTML = "";
    }, 1200)

}


