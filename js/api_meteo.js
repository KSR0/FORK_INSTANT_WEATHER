document.addEventListener("DOMContentLoaded", () => {

    searchBtn = document.querySelector("#searchBtn")

    let img = new Image();
    img.src = "../img/meteo.png";

    const weatherTab = ["Soleil","Peu nuageux","Ciel voilé","Nuageux","Très nuageux","Couvert","Brouillard","Brouillard givrant"]

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
            if(!data.city.insee.length > 5 || !data.city.insee.length <5) 
            {
                div.innerHTML = `
                <div id="dropDownCardChild">
                    <h1>${data.city.name}</h1>
                    <h3>${weatherTab[data.forecast[0].weather]}
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

                function changeClass(change) {
                    document.querySelector(".wi").classList.add(change)
                }

                switch(data.forecast[0].weather) {
                    case 0:
                        changeClass("wi-day-sunny")
                        break;
                    case 1:
                        changeClass("wi-day-cloudy")
                        break;
                    case 2:
                        changeClass("wi-day-cloudy-high")
                        break;
                    case 3:
                        changeClass("wi-cloud")
                        break;
                    case 4-5:
                        changeClass("wi-cloudy")
                        break;
                    case 6-7:
                        changeClass("wi-fog")
                        break;
                    case 10-15,30-32:
                        changeClass("wi-rain-mix")
                        break;
                    case 16:
                        changeClass("wi-hail")
                        break;
                    case 20-22,142,220-222:
                        changeClass("wi-snow")
                        break;
                    case 40-78:
                        changeClass("wi-rain")
                        break;
                    case 100-138:
                        changeClass("wi-lgihning")
                        break;
                    case 142,220-232:
                        changeClass("wi-snow")
                        break;
                }
            }
        })

        .catch(error => {
            console.error('There was a problem with the fetch operation',error);
        })
    });

})