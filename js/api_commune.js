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

        modalWindowBtn.style.display = "none";
        modalWindowBtn.style.cursor = "not-allowed";
        document.querySelector("#dropDownCard").innerHTML = "";
    }
    ///////


    ///////
    const modalWindowBtn = document.querySelector("#modalWindowBtn");
    function makeSearchBtnEnable() {
        
        if (document.querySelector("#city_select").value != 0) {
            makeSearchBtnOn();
        } else {
            makeSearchBtnOff();
        }
    }
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
            <select name="cities" id="city_select">
            </select>`;
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
                    document.querySelector("#city_select").innerHTML = `<option value="0">-- Selectionnez une ville --</option>`;
                    for (let ville of data) {
                        fillDropDownList(ville);
                    }
                    document.querySelector("#city_select").addEventListener("change", () => {
                        makeSearchBtnEnable();
                    });
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
            warnUserPostalCodeNotValid();
            makeModalBtnOffAndClearCards();
        }
       
    })
});