import weatherMap from "./weatherMap.js"
import iconsMap from "./iconsMap.js"
  
document.addEventListener("DOMContentLoaded", () => {
    let img = new Image();
    img.src = "../img/meteo.png";
    let cityInsee;

    const weatherTab = ["Soleil","Peu nuageux","Ciel voilé","Nuageux"];
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    document.querySelector("#searchBtn").addEventListener("click", function() {
        cityInsee = document.querySelector("#city_select").value;
        let div = document.getElementById("dropDownCard");

        fetch(`https://api.meteo-concept.com/api/forecast/daily?token=52ebc4fdc1af7f1041b873d5f7c3140eaa23454977b3519f5f1110a3a8176c48&insee=${cityInsee}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })

        .then(data => {

            console.log(data.forecast[0].weather)

            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds(); // Ajout des secondes
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Ajout des secondes

            const dayOfWeek = daysOfWeek[now.getDay()];
            const dayOfMonth = now.getDate();
            const month = months[now.getMonth()];
            const year = now.getFullYear();

            const formattedDate = `${dayOfWeek} ${dayOfMonth.toString().padStart(2, '0')} ${month} ${year}`;

            div.innerHTML = `
                <div id="dropDownCardChild">
                    <h2 id="day">${formattedDate}</h2>
                    <p id="city_selected" class="bold">${data.city.name}</p>
                    <p id="actual_weather">${weatherMap[data.forecast[0].weather]}</p>
                    
                    <div>
                            <i id="weather" class = "wi"></i>
                    </div>

                    <p class="temperature">
                        <i class="fa-solid fa-temperature-low fa-xl" style="color: #24e5ff;"></i>
                        <span id="temperature_min">${data.forecast[0].tmin}°C</span>
                    </p>

                    <p class="temperature">
                        <i class="fa-solid fa-temperature-high fa-xl" style="color: #ff5024;"></i>
                        <span id="temperature_max"> ${data.forecast[0].tmax}°C</span>
                    <p>

                    <div id="sun_and_rain">

                        <div id="sun_time">
                            <p>
                                <i class="fa-solid fa-sun fa-spin fa-xl" style="color: #ffe75f;"></i>
                                 Durée d'ensoleillement :<span id="sun_time_value" class="bold">${data.forecast[0].sun_hours}H</span>
                            </p>
                        </div>

                        <div id="raining_pourcentage">
                            <p>
                                <i class="fa-solid fa-droplet fa-beat-fade fa-xl" style="color: #c7d8fa;"></i>
                                   Pluie :<span id="raining_pourcentage_value" class="bold">${data.forecast[0].probarain}%</span>
                            </p>
                        </div>
                    
                    </div>

                </div>

                <p class="actualisation">Dernière actualisation à :<span class="actualisation bold">${formattedTime}</span></p>
            `;

            document.querySelector(".wi").classList.add(iconsMap[data.forecast[0].weather])
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        });
    });
});