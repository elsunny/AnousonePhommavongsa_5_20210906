// ///////////// js script for confirmation page confirmation.html //////////////////
import { backBtn, toastMessage, isInLocalStorage, } from "./module.js";

// back button call
backBtn();

try {
    // get the informations from localstorage
    const orderConfirmation = isInLocalStorage("orderId");
    const totalAmount = isInLocalStorage("orderAmount");


    // order confirmation message
    const message = `Nous vous remercions ${orderConfirmation.lastName} ${orderConfirmation.name} pour votre commande enregistrée sous le N°${orderConfirmation.orderID} et d'un montant total de ${totalAmount}`;
    document.querySelector(".hero__title p").textContent = message;
} catch (error) {
    console.log("Nous avons rencontré une erreur " + error);
    toastMessage("nous avons rencontré un problème!", "red", 5000);
}
