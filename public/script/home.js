// /////////////// js script on homepage index.html //////////////////////
import { convertPrice, toastMessage, qtyToastMessage, isInLocalStorage } from "./module.js";

// get the container in the DOM for the products cards
const productCards = document.querySelector(".products__card");

// put in a variable the html content for the product card layout that will be displayed
const productTemplate = document.querySelector("#productTemplate");

// function to get the product informations on the server and display it for all products
async function getAndDisplayProduct() {
    try {
        // get the informations and transform the json data to javascript data
        const reponse = await fetch("http://localhost:3000/api/cameras");
        const data = await reponse.json();

        // dynamique display of card for each product
        data.forEach((product) => {
            const productCard = productTemplate.content
                .querySelector(".products__card__item")
                .cloneNode(true);

            productCard.querySelector(".products__card__item__image img").src =
                product.imageUrl;
            productCard
                .querySelector(".products__card__item__link")
                .setAttribute("href", `product.html?_id=${product._id}`);
            productCard.querySelector(
                ".products__card__item__title"
            ).innerText = product.name;
            productCard.querySelector(".products__card__price").innerText =
                convertPrice(product.price, 100);

            // insert the code in the container DOM
            productCards.appendChild(productCard);
        });
    } catch (error) {
        console.log("Nous avons rencontré une erreur " + error);
        toastMessage("nous avons rencontré un problème!", "red", 5000);
    }
}

getAndDisplayProduct();


//show item number in the cart toast menu
const qtyStored = isInLocalStorage("quantite")
qtyToastMessage(qtyStored);