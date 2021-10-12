// ///////////// js script for confirmation page confirmation.html //////////////////
import { backBtn, toastMessage } from "./module.js";

// back button call
backBtn();


try {

    // get the informations from localstorage
    const orderConfirmation = JSON.parse(localStorage.getItem("orderId"));
    const totalAmount = JSON.parse(localStorage.getItem("orderAmount"));
    
    const message = `Nous vous remercions ${orderConfirmation.lastName} ${orderConfirmation.name} pour votre commande enregistrée sous le N°${orderConfirmation.orderID} et d'un montant total de ${totalAmount}`;
    document.querySelector(".hero__title h1").textContent = message;
    
} catch (error) {
    console.log("Nous avons rencontré une erreur " + error);
    toastMessage("nous avons rencontré un problème!", "red", 5000);
}