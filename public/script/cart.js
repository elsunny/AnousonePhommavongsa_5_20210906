// ///////////// js script for cart page cart.html //////////////////

// get the informations from localhost
const cartProductId = localStorage.getItem ('productInCart');
const cartProductOption = localStorage.getItem ('optionInCart');

// get in variable the html content for the cart layout
const cartTemplate = document.querySelector('#cartTemplate');
console.log(cartTemplate);