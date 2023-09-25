document.addEventListener("DOMContentLoaded", function () {
    
    ///////
    function eraseDropDownList() {
        document.querySelector(".drop_down_list").innerHTML = ``;
    }

    function fillDropDownList(donnee_ville) {
        document.querySelector("#city-select").innerHTML += 
            `
            <option value="${donnee_ville.code}">${donnee_ville.nom}</option>
            `;
    }

    function createDropDownList() {
        document.querySelector(".drop_down_list").innerHTML = 
            `<label for="city_select">Choisir une ville :</label>
            <select name="cities" id="city-select">
            </select>`;
    }
    ///////



    ///////
    function warnUserPostalCodeNotValid() {
        // Cree un signal visuel pour signaler à l'utilisateur un probleme
        console.error("Postal code not valid");
    }

    function warnUserPostalCodeNotExisting() {
        console.error("Postal code not existing");
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
                    for (let ville of data) {
                        fillDropDownList(ville);
                    }
                } else {
                    warnUserPostalCodeNotExisting();
                }
            })
            .catch(error => {
                console.error(error);
            });
        } else {
            eraseDropDownList();
            warnUserPostalCodeNotValid();
        }

        
        


    })

    document.querySelector("#researching").addEventListener("click", function() {
        console.log(document.querySelector("#city-select").value);
    });

});