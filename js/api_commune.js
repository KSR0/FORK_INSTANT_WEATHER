document.addEventListener("DOMContentLoaded", function () {

    const url_commune = "https://geo.api.gouv.fr/communes?codePostal=78000";
    console.log("true");
    
    document.querySelector("#postal_code").addEventListener("input", function () {
        console.log(this.value);
    })

    



});