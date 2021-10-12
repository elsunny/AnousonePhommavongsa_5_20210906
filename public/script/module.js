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

// toast message function
// export const toastMessage = (info) => {
//     const msg = document.querySelector("#divMsg");
//     msg.innerHTML = `<span>${info}</span>`;
//     msg.setAttribute("class", "msgAddToCart");
//     setTimeout(() =>{
//         msg.setAttribute("class", "");
//         msg.innerHTML = "";
//     }, 1200)

// }

export const toastMessage = (info, clr, time) => {
    const toastDiv = document.createElement("div");
    toastDiv.innerHTML = `<span>${info}</span>`;
    toastDiv.setAttribute("class", "toastMessage");
    setTimeout(() => {
        toastDiv.setAttribute("class", "");
        toastDiv.innerHTML = "";
    }, time);
    toastDiv.style.backgroundColor = clr;
    document.body.appendChild(toastDiv);
};
