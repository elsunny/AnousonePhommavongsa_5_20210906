// ///////////// js script for confirmation page confirmation.html //////////////////

// get the informations from localstorage
const orderConfirmation = JSON.parse(localStorage.getItem("orderId"));

console.log("order confirmation", orderConfirmation);

const message = `Nous vous remercions ${orderConfirmation.lastName} ${orderConfirmation.name} pour votre commande enregistrée sous le N°${orderConfirmation.orderID}`;
document.querySelector(".hero__title h1").textContent = message;