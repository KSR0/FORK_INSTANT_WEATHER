import weatherMap from "./weatherMap.js" // Importe le module weatherMap.js
import iconsMap from "./iconsMap.js" // Importe le module iconsMap.js
  
document.addEventListener("DOMContentLoaded", () => {

    const settingsElement = document.getElementById('settings');
    settingsElement.style.display = 'none';

    // Fonction pour activer le bouton de paramètres
    function makeSettingsBtnOn() {
        settings_button.style.display = "contents";
        settings_button.style.cursor = "pointer";
    }

    let img = new Image();
    img.src = "img/meteo.png";
    let cityInsee;

    // Tableaux pour les jours de la semaine et les mois
    const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    // Événement de clic sur le bouton de recherche
    document.querySelector("#searchBtn").addEventListener("click", function() 
    {
        // Récupère la valeur sélectionnée dans la liste déroulante de la ville
        cityInsee = document.querySelector("#city_select").value;
        let div = document.getElementById("dropDownCard");

        // Appel à l'API météo avec la valeur de la ville
        fetch(`https://api.meteo-concept.com/api/forecast/daily?token=76b2e76768f5e4533afe38c9d014c4a11bb761d64cae45fa56f033aa8bc0910a&insee=${cityInsee}`)
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
            const seconds = now.getSeconds();
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            let date;

            const selectedValue = parseInt(document.querySelector("#day_number_select").value);
        
            if (selectedValue >= 1 && selectedValue <= 7) {
                const limit = selectedValue;
                const dropDownCard = document.getElementById("dropDownCard");
                dropDownCard.innerHTML = "";

                // Boucle pour générer les cartes en fonction du nombre de jours sélectionnés
                for (let i = 0; i < limit; i++) {
                    let cpt = i + 1;
                    date = new Date(data.forecast[i].datetime);
                    // Utilisation des données pour remplir les éléments HTML
                    // Ajout de classes et d'icônes basées sur les données météo
                    dropDownCard.innerHTML += `<div id="dropDownCardChild">
                    <div id="page_actualisation">
                        <p class="actualisation">Dernière actualisation à :<span class="actualisation bold">${formattedTime}</span></p>
                    </div>

                    <h2 id="day">${daysOfWeek[date.getDay()]} ${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]} ${date.getFullYear()}</h2>
                    <h3 id="city_selected" class="bold">${data.city.name}</h3>
                    
                    <div>
                        <i id="weather${cpt}" class = "wi icon_weather"></i>
                    </div>
                    
                    <p id="actual_weather">${weatherMap[data.forecast[i].weather]}</p>
                    
                    <div id="temperature">

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

                    <div class="customized_weather_informations">
                        
                    </div>
                </div>
                <br>`;

                document.querySelector(`#weather${cpt}`).classList.add(iconsMap[data.forecast[i].weather])
                }
            } else {
                console.error("La valeur sélectionnée n'est pas valide.");
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        });

        // Appel de la fonction pour activer le bouton de paramètres
        makeSettingsBtnOn();
    });
});