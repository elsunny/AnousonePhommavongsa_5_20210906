// ///////////// js script for cart page cart.html //////////////////
import { getProductData } from "./module.js";


// get the informations from localstorage
const cartProducts = JSON.parse(localStorage.getItem ('productInCart'));
// get in variable the html content for the cart layout to be displayed
const cartTemplate = document.querySelector('#cartTemplate');
// get in a variable the template insertion point
const cartInsert = document.querySelector('.carts'); 




// // get the informations relative to the id on the server
// async function getProductData(idProduct) {
//     // get the informations and transform the json data to javascript data
//     const reponse = await fetch(
//         `http://localhost:3000/api/cameras/${idProduct}`
//     );
//     const data = await reponse.json();
//     return data;
// }
// replace the template value by the server value
// dynamique display of card for each product
cartProducts.forEach(async (cartProduct) => {
    const theId = cartProduct.id;
    const product = await getProductData(theId);
    console.log(product);
    const cart = cartTemplate.content
        .querySelector(".product")
        .cloneNode(true);
    cart.querySelector(".product__caption h2").innerText = product.name;
    cart.querySelector(".products__card__price").innerText = product.price;
    cart.querySelector(".product img").src = product.imageUrl;

    // insert the code in the container 
    cartInsert.appendChild(cart);
})




// calculate the sum of cart products price
// display the price
// display the number of item



