document.addEventListener("DOMContentLoaded", function () {

    ///////// Fonction pour changer la couleur de fond du bouton lorsqu'on survole
    function changeBackgroundColorMouseEnter() {
        document.querySelector("#searchBtn").style.backgroundColor = "#0b640e";
        document.querySelector("#searchBtn").style.transform = "translateY(-2px)";
    }

    // Fonction pour restaurer la couleur de fond du bouton lorsqu'on quitte le survol
    function changeBackgroundColorMouseLeave() {
        document.querySelector("#searchBtn").style.backgroundColor = "#0f7e13";
        document.querySelector("#searchBtn").style.transform = "translateY(0px)";
    }
    ///////


    ///////
    // Fonction pour activer le bouton de recherche
    function makeSearchBtnOn() {
        document.querySelector("#searchBtn").disabled = false;
        document.querySelector("#searchBtn").style.backgroundColor = "#0f7e13";
        document.querySelector("#searchBtn").style.cursor = "pointer";
        
        document.querySelector("#searchBtn").addEventListener("mouseenter", changeBackgroundColorMouseEnter);
        document.querySelector("#searchBtn").addEventListener("mouseleave", changeBackgroundColorMouseLeave);
    }

    // Fonction pour désactiver le bouton de recherche
    function makeSearchBtnOff() {
        try {
            document.querySelector("#searchBtn").disabled = true;
            document.querySelector("#searchBtn").style.backgroundColor = "717070";
            document.querySelector("#searchBtn").style.cursor = "not-allowed";
            document.querySelector("#searchBtn").removeEventListener("mouseenter", changeBackgroundColorMouseEnter);
            document.querySelector("#searchBtn").removeEventListener("mouseleave", changeBackgroundColorMouseLeave);
        } catch (error) {
            
        }
    }
    ///////

    
    ///////

    // Fonction pour désactiver le bouton des paramètres et vider la liste déroulante
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


    ///////

    const settings_button = document.querySelector("#settings_button");

    ///////


    ///////

    // Fonction pour effacer la liste déroulante
    function eraseDropDownList() {
        document.querySelector("#drop_down_list").innerHTML = ``;
    }

    // Fonction pour remplir la liste déroulante avec des données de ville
    function fillDropDownList(donnee_ville) {
        document.querySelector("#city_select").innerHTML += 
            `
            <option value="${donnee_ville.code}" >${donnee_ville.nom}</option>
            `;
    }

    // Fonction pour créer la liste déroulante
    function createDropDownList() {
        document.querySelector("#drop_down_list").innerHTML = 
            `<label for="city_select" id="label_style">Choisissez une ville :</label>
            <select name="cities" id="city_select"></select>`;
    }
    ///////


    ///////

    // Fonction pour effacer la liste déroulante de sélection de jour
    function eraseDropDownListDay() {
        document.querySelector("#select_a_day_nb").innerHTML = ``;
    }

    // Fonction pour remplir la liste déroulante de sélection de jour
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

    // Fonction pour créer la liste déroulante de sélection de jour
    function createDropDownListDay() {
        document.querySelector("#select_a_day_nb").innerHTML = 
            `<label for="day_number_select" id="label_style">Afficher la météo pour :</label>
            <select name="dayNumber" id="day_number_select"></select>`;
    }
    ///////


    ///////

    // Fonction pour afficher un message d'erreur
    function displayError() {
        document.querySelector("#errorWarning").style.display = "block";
        document.querySelector("#errorWarning").style.opacity = 1;
    }

    // Fonction pour cacher le message d'erreur
    function hideError() {
        document.querySelector("#errorWarning").style.display = "none";
        document.querySelector("#errorWarning").style.opacity = 0;
    }

    // Fonction pour avertir l'utilisateur que le code postal n'est pas valide
    function warnUserPostalCodeNotValid() {
        // Cree un signal visuel pour signaler à l'utilisateur un problème
        document.querySelector("#p_error").innerHTML = "Code postal invalide !";
        displayError();
        makeSearchBtnOff(); // Permet de ne pas avoir le bouton encore actif après avoir changé le CP (car le cp n'est plus valide). 
    }

    // Fonction pour avertir l'utilisateur que le code postal n'existe pas
    function warnUserPostalCodeNotExisting() {
        // Créer un signal visuel pour signaler à l'utilisateur un probleme
        document.querySelector("#p_error").innerHTML = "Code postal inexistant !";
        makeSearchBtnOff(); // Permet de ne pas avoir le bouton encore actif après avoir changé le CP (car le cp n'est plus valide).
        displayError();
    }
    ///////


    ///////

// Écouteur d'événement sur le champ de code postal
    document.querySelector("#postal_code").addEventListener("input", function () {
        if (this.value.length == 5) {
            let url_commune = `https://geo.api.gouv.fr/communes?codePostal=${this.value}`;
            fetch(url_commune)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network reponse was not ok");
                }
                return response.json();
            })
            .then(data => {
                if (data != "") {
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