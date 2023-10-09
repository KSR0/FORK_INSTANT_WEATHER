document.addEventListener("DOMContentLoaded", function () {

    ///////
    function changeBackgroundColorMouseEnter() {
        document.querySelector("#searchBtn").style.backgroundColor = "#0056b3";
        document.querySelector("#searchBtn").style.transform = "translateY(-2px)";
    }
    function changeBackgroundColorMouseLeave() {
        document.querySelector("#searchBtn").style.backgroundColor = "#007BFF";
        document.querySelector("#searchBtn").style.transform = "translateY(0px)";
    }
    ///////


    ///////
    function makeSearchBtnOn() {
        document.querySelector("#searchBtn").disabled = false;
        document.querySelector("#searchBtn").style.backgroundColor = "#007BFF";
        document.querySelector("#searchBtn").style.cursor = "pointer";
        
        document.querySelector("#searchBtn").addEventListener("mouseenter", changeBackgroundColorMouseEnter);
        document.querySelector("#searchBtn").addEventListener("mouseleave", changeBackgroundColorMouseLeave);
    }
    function makeSearchBtnOff() {
        try {
            document.querySelector("#searchBtn").disabled = true;
            document.querySelector("#searchBtn").style.backgroundColor = "grey";
            document.querySelector("#searchBtn").style.cursor = "not-allowed";
            document.querySelector("#searchBtn").removeEventListener("mouseenter", changeBackgroundColorMouseEnter);
            document.querySelector("#searchBtn").removeEventListener("mouseleave", changeBackgroundColorMouseLeave);
        } catch (error) {
            
        }
    }
    ///////

    
    ///////
    function makeModalBtnOffAndClearCards() {
        // Desactiver tous les filtres pour eviter un "bug graphique"
        document.querySelector("#latitude_checkbox").checked = false;
        document.querySelector("#longitude_checkbox").checked = false;
        document.querySelector("#rain_quantity_checkbox").checked = false;
        document.querySelector("#wind_speed_checkbox").checked = false;
        document.querySelector("#wind_angle_checkbox").checked = false;

        settings_button.style.display = "none";
        settings_button.style.cursor = "not-allowed";
        document.querySelector("#dropDownCard").innerHTML = "";
    }
    ///////
    const settings_button = document.querySelector("#settings_button");
    ///////


    ///////
    function eraseDropDownList() {
        document.querySelector("#drop_down_list").innerHTML = ``;
    }
    function fillDropDownList(donnee_ville) {
        document.querySelector("#city_select").innerHTML += 
            `
            <option value="${donnee_ville.code}" >${donnee_ville.nom}</option>
            `;
    }
    function createDropDownList() {
        document.querySelector("#drop_down_list").innerHTML = 
            `<label for="city_select" id="label_style">Choisissez une ville :</label>
            <select name="cities" id="city_select"></select>`;
    }
    ///////

    ///////
    function eraseDropDownListDay() {
        document.querySelector("#select_a_day_nb").innerHTML = ``;
    }
    function fillDropDownListDay() {
        document.querySelector("#day_number_select").innerHTML += 
            `
            <option value="0">-- Selectionnez une valeur --</option>
            <option value="1">Aujourd'hui</option>
            <option value="2">Aujourd'hui et demain</option>
            <option value="3">Les 3 prochains jours</option>
            <option value="4">Les 4 prochains jours</option>
            <option value="5">Les 5 prochains jours</option>
            <option value="6">Les 6 prochains jours</option>
            <option value="7">Les 7 prochains jours</option>
            `;
    }
    function createDropDownListDay() {
        document.querySelector("#select_a_day_nb").innerHTML = 
            `<label for="day_number_select" id="label_style">Afficher la météo pour :</label>
            <select name="dayNumber" id="day_number_select"></select>`;
    }
    ///////

    ///////
    function displayError() {
        document.querySelector("#errorWarning").style.display = "block";
        document.querySelector("#errorWarning").style.opacity = 1;
    }
    function hideError() {
        document.querySelector("#errorWarning").style.display = "none";
        document.querySelector("#errorWarning").style.opacity = 0;
    }
    function warnUserPostalCodeNotValid() {
        // Cree un signal visuel pour signaler à l'utilisateur un probleme
        document.querySelector("#p_error").innerHTML = "Code postal invalide !";
        displayError();
        makeSearchBtnOff(); // Permet de ne pas avoir le bouton encore actif après avoir changé le CP(car le cp n'est plus valide). 
    }
    function warnUserPostalCodeNotExisting() {
        // Cree un signal visuel pour signaler à l'utilisateur un probleme
        document.querySelector("#p_error").innerHTML = "Code postal inexistant !";
        //console.error("Postal code not existing");
        makeSearchBtnOff(); // Permet de ne pas avoir le bouton encore actif après avoir changé le CP(car le cp n'est plus valide).
        displayError();
    }
    ///////


    
    document.querySelector("#postal_code").addEventListener("input", function () {
        if (this.value.length == 5) {
            let url_commune = `https://geo.api.gouv.fr/communes?codePostal=${this.value}`;
            //console.log(url_commune);
            fetch(url_commune)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network reponse was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data != "") {
                    //console.log(data);
                    createDropDownList();
                    createDropDownListDay();
                    const citySelect = document.querySelector("#city_select");
                const dayNumberSelect = document.querySelector("#day_number_select");
                citySelect.innerHTML = `<option value="0">-- Selectionnez une ville --</option>`;
                for (let ville of data) {
                    fillDropDownList(ville);
                }
                fillDropDownListDay();
                const handleInputChange = () => {
                    const cityValue = citySelect.value;
                    const dayNumberValue = dayNumberSelect.value;
                    if (cityValue != 0 && dayNumberValue != 0) {
                        makeSearchBtnOn();
                    } else {
                        makeSearchBtnOff();
                        makeModalBtnOffAndClearCards();
                    }
                };
                citySelect.addEventListener("change", handleInputChange);
                dayNumberSelect.addEventListener("change", handleInputChange);
                    hideError();
                } else {
                    warnUserPostalCodeNotExisting();
                    makeModalBtnOffAndClearCards();
                }
            })
            .catch(error => {
                console.error(error);
            });
            hideError();
        } else {
            eraseDropDownList();
            eraseDropDownListDay();
            warnUserPostalCodeNotValid();
            makeModalBtnOffAndClearCards();
        }
       
    })
});