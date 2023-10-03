document.addEventListener("DOMContentLoaded", () => {
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
            if (data.city.insee.length !== 5) {
                console.log(data);
                return;
            }

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
                <p id="city_selected">Ville sélectionnée :<span class="bold underline">${data.city.name}</span></p>

                <div id="dropDownCardChild">
                    <h2 id="day" class="underline">${formattedDate}</h2>
                    <p id="temperature">Temp° minimale : <span id="temperature_min">${data.forecast[0].tmin}°C</span></p>
                    <p id="temperature">Temp° maximale : <span id="temperature_max"> ${data.forecast[0].tmax}°C</span></p>
                    <p>${weatherTab[data.forecast[0].weather]}
                        <span>Ensoleillement ${data.forecast[0].sun_hours}H</span>
                        <span>Pluie ${data.forecast[0].probarain}%</span>
                    </p>
                </div>

                <p id="actualisation">Dernière actualisation à :<span class="bold underline">${formattedTime}</span></p>
            `;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation', error);
        });
    });
});