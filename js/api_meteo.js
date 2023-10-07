import weatherMap from "./weatherMap.js"
import iconsMap from "./iconsMap.js"
  
document.addEventListener("DOMContentLoaded", () => {
    let img = new Image();
    img.src = "../img/meteo.png";
    let cityInsee;

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

            
            let date;

            for(let i = 0 ; i < 7 ; i++) {
                let cpt = i + 1;
                date = new Date(data.forecast[i].datetime);
                dropDownCard.innerHTML += `<div id="dropDownCardChild">
                    <h2 id="day">${daysOfWeek[date.getDay()]} ${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}</h2>
                    <p id="city_selected" class="bold">${data.city.name}</p>
                    
                    <div>
                        <i id="weather${cpt}" class = "wi"></i>
                    </div>
                    
                    <p id="actual_weather">${weatherMap[data.forecast[i].weather]}</p>
                    
                    <div class="temperature">

                        <div id="temp_min">
                            <p title="Température minimale">
                                <i class="fa-solid fa-temperature-low fa-xl" style="color: #24e5ff;"></i>
                                <span id="temperature_min">${data.forecast[i].tmin}°C</span>
                            </p>
                        </div>

                        <div id="temp_max">
                            <p title="Température maximale">
                                <i class="fa-solid fa-temperature-high fa-xl" style="color: #fd6464;"></i>
                                <span id="temperature_max"> ${data.forecast[i].tmax}°C</span>
                            <p>
                        </div>

                    </div>

                    <div id="sun_and_rain">

                        <div id="sun_time">
                            <p>
                                <i id="sun_img" class="fa-solid fa-sun fa-xl" style="color: #ffe75f;"></i>
                                Temps d'ensoleillement :<span id="sun_time_value" class="bold">${data.forecast[i].sun_hours}h</span>
                            </p>
                        </div>

                        <div id="raining_pourcentage">
                            <p>
                                <i id="droplet_img" class="fa-solid fa-droplet fa-xl" style="color: #c7d8fa;"></i>
                                % de précipitation :<span id="raining_pourcentage_value" class="bold">${data.forecast[i].probarain}%</span>
                            </p>
                        </div>
                    
                    </div>

                </div>
                <br>`;

                document.querySelector(`#weather${cpt}`).classList.add(iconsMap[data.forecast[i].weather])
            }
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        });
    });
});