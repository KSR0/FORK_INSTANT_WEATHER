document.addEventListener("DOMContentLoaded", function () {

    const settings_button = document.querySelector("#settings_button");
    const dropDownCard = document.querySelector("#dropDownCard");

    settings_button.addEventListener("click", function () {
    });

    let latitudeState;
    let longitudeState;
    let rainState;
    let windSpeedState;
    let windAngleState;
    
    // Permet de savoir ce que l'utilisateur veut voir
    function checkOptionsSelected() {
        latitudeState = document.querySelector("#latitude_checkbox").checked;
        longitudeState = document.querySelector("#longitude_checkbox").checked;
        rainState = document.querySelector("#rain_quantity_checkbox").checked;
        windSpeedState = document.querySelector("#wind_speed_checkbox").checked;
        windAngleState = document.querySelector("#wind_angle_checkbox").checked;
    }


    let cityInsee;
    let cmpt = 0;
    function displayWeatherInformations() {
        for (let i = 0; i < dropDownCard.children.length - 1; i++) {
            if (i%2 == 0) {
                for (let j = 0; j < dropDownCard.children[i].children.length; j++) {
                    if (dropDownCard.children[i].children[j].className == "customized_weather_informations") {
                        dropDownCard.children[i].children[j].innerHTML = "";
                    }
                }
            }
        }
        cityInsee = document.querySelector("#city_select").value;
        
        fetch(`https://api.meteo-concept.com/api/forecast/daily?token=76b2e76768f5e4533afe38c9d014c4a11bb761d64cae45fa56f033aa8bc0910a&insee=${cityInsee}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        
        .then(data => {
            
            for (let i = 0; i < dropDownCard.children.length - 1; i++) {
                if (i%2 == 0) {
                    for (let j = 0; j < dropDownCard.children[i].children.length; j++) {
                        if (dropDownCard.children[i].children[j].className == "customized_weather_informations") {
                            if (latitudeState && longitudeState) {
                                dropDownCard.children[i].children[j].innerHTML += `
                                <div id="latitude_longitude">
                                    <div id="latitude">
                                        <p>Latitude décimale : <span id="latitude_value" class="bold">${data.forecast[cmpt].latitude}</span></p>
                                    </div>

                                    <div id="longitude">
                                        <p>Longitude décimale : <span id="longitude_value" class="bold">${data.forecast[cmpt].longitude}</span></p>
                                    </div>
                                </div>`;
                            }
                            else if (latitudeState) {
                                dropDownCard.children[i].children[j].innerHTML += `
                                <div id="latitude1">
                                    <p>Latitude décimale : <span id="latitude_value" class="bold">${data.forecast[cmpt].latitude}</span></p>
                                </div>`;
                            }
                            else if (longitudeState) {
                                dropDownCard.children[i].children[j].innerHTML += `
                                <div id="longitude1">
                                    <p>Longitude décimale : <span id="longitude_value" class="bold">${data.forecast[cmpt].longitude}</span></p>
                                </div>`;
                            }


                            if (windSpeedState && windAngleState) {
                                dropDownCard.children[i].children[j].innerHTML += `
                                <div id="vent">
                                    <div id="vent_moyen">
                                        <p>Vent moyen à 10m : <span id="vent_moyen_value" class="bold">${data.forecast[cmpt].wind10m}km/h</span></p>
                                    </div>

                                    <div id="direction_vent">
                                        <p>Direction du vent : <span id="direction_vent_value" class="bold">${data.forecast[cmpt].dirwind10m}°</span></p>
                                    </div>
                                </div>`;
                            }
                            else if (windSpeedState) {
                                dropDownCard.children[i].children[j].innerHTML += `
                                <div id="vent_moyen1">
                                    <p>Vent moyen à 10m : <span id="vent_moyen_value" class="bold">${data.forecast[cmpt].wind10m}km/h</span></p>
                                </div>`;
                            }
                            else if (windAngleState) {
                                dropDownCard.children[i].children[j].innerHTML += `
                                <div id="direction_vent1">
                                    <p>Direction du vent : <span id="direction_vent_value" class="bold">${data.forecast[cmpt].dirwind10m}°</span></p>
                                </div>`;
                            }


                            if (rainState) {
                                dropDownCard.children[i].children[j].innerHTML += `
                                <div id="cumul_pluie">
                                    <p>Cumul de pluie sur la journée : <span id="cumul_pluie_value" class="bold">${data.forecast[cmpt].rr1}mm</span></p>
                                </div>`;
                            }
                            cmpt++;
                        }
                    }
                    
                }
                
            }
            cmpt = 0;
        })
        
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        });
    }

    document.getElementById('settings_button').addEventListener('click', function() {
        var settings_button = document.getElementById('settings');
        settings_button.style.display = (settings_button.style.display == 'block') ? 'none' : 'block';
        checkOptionsSelected();
        displayWeatherInformations();
    });

    document.querySelector("#latitude_checkbox").addEventListener("change", function () {
        checkOptionsSelected();
        displayWeatherInformations();
    });

    document.querySelector("#longitude_checkbox").addEventListener("change", function () {
        checkOptionsSelected();
        displayWeatherInformations();
    });

    document.querySelector("#rain_quantity_checkbox").addEventListener("change", function () {
        checkOptionsSelected();
        displayWeatherInformations();
    });

    document.querySelector("#wind_speed_checkbox").addEventListener("change", function () {
        checkOptionsSelected();
        displayWeatherInformations();
    });

    document.querySelector("#wind_angle_checkbox").addEventListener("change", function () {
        checkOptionsSelected();
        displayWeatherInformations();
    });

});