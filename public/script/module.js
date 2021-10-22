// get the informations relative to the id on the server
export async function getProductData(idProduct) {
    try {
        // get the informations and transform the json data to javascript data
        const reponse = await fetch(
            `http://localhost:3000/api/cameras/${idProduct}`
        );
        const data = await reponse.json();
        return data;
    } catch (error) {
        console.log("Nous avons rencontré une erreur " + error);
    }
}

// price conversion
export const convertPrice = (price, coef) => {
    return price / coef + " \u20AC";
};

// back button to history
export const backBtn = () => {
    document.querySelector(".previous__btn").addEventListener("click", () => {
        window.history.back();
    });
};

// toast message
export const toastMessage = (info, clr, time) => {
    const toastDiv = document.createElement("div");
    toastDiv.innerHTML = `<span>${info}</span>`;
    toastDiv.setAttribute("class", "toastMessage");
    setTimeout(() => {
        toastDiv.parentNode.removeChild(toastDiv);
    }, time);
    toastDiv.style.backgroundColor = clr;
    document.body.appendChild(toastDiv);
};

// give the items quantity waiting close to cart icon
export const qtyToastMessage = (nb) => {
    if (nb === null) {
        setInLocalStorage("quantite", 0);
        qtyToastMessage(0);
    } else {
        const toastDiv = document.createElement("i");
        toastDiv.innerHTML = `<span>${nb}</span>`;
        toastDiv.setAttribute("class", "qtyToastMessage");
        const showQtyToast = document.querySelector(
            ".header__nav__button--cart__icon"
        );
        // toastDiv.style.backgroundColor = clr;
        showQtyToast.appendChild(toastDiv);
    }
};

// get the products from localStorage
export const isInLocalStorage = (item) => {
    return JSON.parse(localStorage.getItem(item));
};

// send the products in localStorage
export const setInLocalStorage = (clef, item) => {
    localStorage.setItem(clef, JSON.stringify(item));
};
