import weatherMap from "./weatherMap.js"
import iconsMap from "./iconsMap.js"

document.addEventListener("DOMContentLoaded", () => {

    let img = new Image();
    img.src = "../img/meteo.png";
    let cityInsee;

    document.querySelector("#searchBtn").addEventListener("click", function() {
        cityInsee = document.querySelector("#city_select").value;
        let div = document.getElementById("dropDownCard")

        fetch(`https://api.meteo-concept.com/api/forecast/daily?token=52ebc4fdc1af7f1041b873d5f7c3140eaa23454977b3519f5f1110a3a8176c48&insee=${cityInsee}`)

        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(data => {

            console.log(data.forecast[0].weather)
            if(!data.city.insee.length > 5 || !data.city.insee.length <5) 
            {
                div.innerHTML = `
                <div id="dropDownCardChild">
                    <h1>${data.city.name}</h1>
                    <h3>${weatherMap[data.forecast[0].weather]}
                        <span>Ensoleillement ${data.forecast[0].sun_hours}H</span>
                        <span>Pluie ${data.forecast[0].probarain}%</span>
                    </h3>
                    <h2>Minimale</h2>
                    <h2>${data.forecast[0].tmin}°C</h2>
                    <h2>Maximale</h2>
                    <h2>${data.forecast[0].tmax}°C</h2>
                    <i class = "wi"></i>
                </div>
                `
                document.querySelector(".wi").classList.add(iconsMap[data.forecast[0].weather])
            }
        })

        .catch(error => {
            console.error('There was a problem with the fetch operation',error);
        })
    });

})