//récupération des données sur le serveur
fetch("http://localhost:3000/api/cameras")
    .then (data => data.json())
    .then (jsonCameraItems => {
        console.log(jsonCameraItems);
    });