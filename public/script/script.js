//récupération des données sur le serveur
// fetch("http://localhost:3000/api/cameras")
//     .then (data => data.json())
//     .then (jsonCameraItems => {
//         console.log(jsonCameraItems);
//         console.log(jsonCameraItems[1].name);
//     });

const productTitle = document.querySelector('.products__card__item__title');
const productImage = document.querySelector('.products__card__item__image');
console.log(productImage);

fetch('http://localhost:3000/api/cameras')
    .then(res => res.json())
    .then(data => productTitle.textContent = data[1].name)
    .then(data => console.log(data[1].name))
     