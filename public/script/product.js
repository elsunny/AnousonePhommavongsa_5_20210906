// /////////////// js script on product details product.html //////////////////////

// get window url
const getWindowUrl = window.location;

// searh for a string in the url
const urlParams = new URL(document.location).searchParams;
const productId = urlParams.get("_id");
// function to get the product informations on the server and display it for a product
async function getAndDisplayProduct() {
    // get the informations and transform the json data to javascript data
    const reponse = await fetch(
        `http://localhost:3000/api/cameras/${productId}`
    );
    const data = await reponse.json();

    // display the product selected with the server informations
    document.querySelector(".product__image").src = data.imageUrl;
    document.querySelector(".product__caption h1").innerText = data.name;
    document.querySelector(".product-details__description").innerText =
        data.description;
    document.querySelector(".products__card__price").innerText = data.price;
}

getAndDisplayProduct();

// // A voir avec Aurelien
// // function returning the server informations for one product
// async function getAndDisplayProduct(idParam) {
//     const reponse = await fetch(`http://localhost:3000/api/cameras/${idParam}`);
//     const productData = await reponse.json();
//     return productData;
// }

// const data = getAndDisplayProduct(productId);
// console.log("data " + data);

//  // display the product selected with the server informations
//  document.querySelector(".product__image").src = data.imageUrl;
//  document.querySelector(".product__caption h1").innerText = data.name;
//  document.querySelector(".product-details__description").innerText =
//      data.description;
//  document.querySelector(".products__card__price").innerText = data.price;


//create product class object
class ProductBought {
    constructor(id, option) {
        this.id = id;
        this.option = option;
    }    
}

let productsArray = [];

// array loading already bought object from localstorage
const productAlreadyInCart = JSON.parse(localStorage.getItem('productInCart'));
if (productAlreadyInCart != null) {
    // concats array with previous array
    productsArray = [...productAlreadyInCart];
} 


// action add product to cart
// button selection
const addToCartBtn = document.querySelector(".product-details__add-btn");
addToCartBtn.addEventListener("click", () => {
    // get the option selected by user
    const selected = document.querySelector('input[type="radio"]:checked');
    const optionSelection = selected.parentElement.textContent;

    //adding in localstorage the couple product id/option  as object
    const productBought = new ProductBought(productId, optionSelection);
    console.log(productBought);
    productsArray.push(productBought);
    localStorage.setItem('productInCart', JSON.stringify(productsArray));
});










// // add product to cart
// const addToCartBtn = document.querySelector(".product-details__add-btn");
// addToCartBtn.addEventListener("click", () => {
//     // store the product id
//     // localStorage.setItem("productInCart", `${productId}`);
//     productsArray.push(`${productId}`);
//     localStorage.setItem("productInCart", JSON.stringify(productsArray));
//     // store the option lenses
//     const selected = document.querySelector('input[type="radio"]:checked');
//     const optionSelection = selected.parentElement.textContent;
//     localStorage.setItem("optionInCart", `${optionSelection}`);
    
// });