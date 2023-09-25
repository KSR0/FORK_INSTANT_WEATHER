document.addEventListener("DOMContentLoaded", function () {
    
    ///////
    function createDropDownList() {
        
    }
    ///////
    ///////
    function warnUserPostalCodeNotValid() {
        console.error("Postal code not valid");
    }

    function onlyAllowPostalCode(postal_code) {
        if (postal_code <= 0 || postal_code > 95999) {
            warnUserPostalCodeNotValid();
        }
    }
    ///////
    
    
    document.querySelector("#postal_code").addEventListener("input", function () {
        onlyAllowPostalCode(this.value);

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
            createDropDownList();
            console.log(data[0].nom);
        })
        .catch(error => {
            console.error(error);
        });
        

    })

});