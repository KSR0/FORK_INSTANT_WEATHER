document.addEventListener("DOMContentLoaded",() => {

    let ciytName = document.getElementById("")

    fetch('https://api.meteo-concept.com/api/location/city?token=52ebc4fdc1af7f1041b873d5f7c3140eaa23454977b3519f5f1110a3a8176c48&insee=35238')

    .then(response => {
        if (!response.ok) {
            throw new Error('Networj response was not ok');
        }
        return response.json();
    })

    .then(data => {
        console.log(data);
    })

    .catch(error => {
        console.error('There was a problem with the fetch operation',error);
    })
})