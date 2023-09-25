document.addEventListener("DOMContentLoaded",() => {

    document.querySelector("#searchBtn").addEventListener("click", function() {
        cityInsee = document.querySelector("#city-select").value;
        let div = document.getElementById("dropDownCard")

        fetch(`https://api.meteo-concept.com/api/forecast/daily?token=52ebc4fdc1af7f1041b873d5f7c3140eaa23454977b3519f5f1110a3a8176c48&insee=${cityInsee}`)

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(data => {
            if(!data.city.insee.length > 5 || !data.city.insee.length <5) 
            {
                div.innerHTML += `<ul> Temperature à ${data.city.name} <li> Température minimale : ${data.forecast[0].tmin}°C </li><li> Température maximale : ${data.forecast[0].tmax}°C </li><li> Heures d'ensoleillement : ${data.forecast[0].sun_hours}H </li><li> Probabilité de pluie : ${data.forecast[0].tmax}% </li>`
            }
        })

        .catch(error => {
            console.error('There was a problem with the fetch operation',error);
        })
    });

})