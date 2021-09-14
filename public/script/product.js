// /////////////// js script on product details product.html //////////////////////

// get window url
const getWindowUrl = window.location;

// searh for a string in the url
const urlParams = (new URL(document.location)).searchParams;
const productId = urlParams.get('_id');

// function to get the product informations on the server and display it for a product
async function getAndDisplayProduct() {

    // get the informations and transform the json data to javascript data
    const reponse = await fetch("http://localhost:3000/api/cameras");
    const data = await reponse.json();
    
    // search the id in the url window
    function filtrerParId(obj) {
        if (obj._id === productId) {
          return true;
        } else {
          return false;
        }
      }
    
    // isolate the object with the good id
    var arrById = data.filter(filtrerParId);
    console.log(arrById[0].imageUrl);
    
    const productImage = document.querySelector(".product__image");
    console.log(productImage);
    // !!!! devrait remplacer l'image sur la page produit par la bonne image mais ça ne marche pas
    productImage.src = arrById[0].imageUrl;
   
}

getAndDisplayProduct();
