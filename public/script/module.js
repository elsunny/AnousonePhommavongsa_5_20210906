// function who gives informations found on the server regarding an id parameter
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

// function who convert the price and add € sign
export const convertPrice = (price, coef) => {
    return price / coef + " \u20AC";
};

// function who manage the back button to history
export const backBtn = () => {
    document.querySelector(".previous__btn").addEventListener("click", () => {
        window.history.back();
    });
};

// function who creates a toast message then remove it
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

// function who gives the items quantity already in cart, it is shown close to cart icon
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
        showQtyToast.appendChild(toastDiv);
    }
};

// function who gives the products stored in localStorage
export const isInLocalStorage = (item) => {
    return JSON.parse(localStorage.getItem(item));
};

// function who stores the products in localStorage
export const setInLocalStorage = (clef, item) => {
    localStorage.setItem(clef, JSON.stringify(item));
};
