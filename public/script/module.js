// get the informations relative to the id on the server
export async function getProductData(idProduct) {
    // get the informations and transform the json data to javascript data
    const reponse = await fetch(
        `http://localhost:3000/api/cameras/${idProduct}`
    );
    const data = await reponse.json();
    return data;
}

// price conversion 
export const convertPrice = (price, coef) => {
    return price / coef + " \u20AC";
}
