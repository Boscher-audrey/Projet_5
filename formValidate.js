function formValidate() {
    var lastname = document.getElementById("lastname").value;
    var firstname = document.getElementById("lastname").value;
    var email = document.getElementById("lastname").value;
    var address = document.getElementById("lastname").value;
    var city = document.getElementById("lastname").value;
    var zip = document.getElementById("lastname").value;

    // remplacer avec switch case

    console.log("lastname =" + lastname);
    if (typeof lastname != 'string') {
        alert("Veuillez saisir votre nom.");
        lastname.focus();
        return false;
    } else if (firstname === "") {
        alert("Veuillez saisir votre prénom.");
        lastname.focus();
        return false;
    } else if (email === "") {
        alert("Veuillez saisir votre email.");
        lastname.focus();
        return false;
    } else if (address === "") {
        alert("Veuillez saisir votre adresse.");
        lastname.focus();
        return false;
    } else if (city === "") {
        alert("Veuillez saisir votre ville.");
        lastname.focus();
        return false;
    } else if (zip === "") {
        alert("Veuillez saisir votre code postal.");
        lastname.focus();
        return false;
    } else {
        return true;
    }

}

