// /////////////// js script on homepage index.html //////////////////////

// container for the products cards
const productCards = document.querySelector(".products__card");

// get in variable the html content for the product card layout
const productTemplate = document.querySelector("#productTemplate");


// function to get the product informations on the server and display it for all products 
async function getAndDisplayProduct() {

    // get the informations and transform the json data to javascript data
    const reponse = await fetch("http://localhost:3000/api/cameras");
    const data = await reponse.json();

    // dynamique display of card for each product
    data.forEach((product) => {
        const productCard = productTemplate.content
            .querySelector(".products__card__item")
            .cloneNode(true);
        // const productCard = document.importNode(productTemplate.content, true)
        productCard.querySelector(".products__card__item__image img").src =
            product.imageUrl;
        productCard.querySelector(".products__card__item__link").setAttribute('href', `product.html?_id=${product._id}`);
        productCard.querySelector(".products__card__item__title").innerText = product.name;
        productCard.querySelector(".products__card__price").innerText = product.price;

        // insert the code in the container 
        productCards.appendChild(productCard);
    });
}

getAndDisplayProduct();



