function formValidate() {
    var lastname = document.getElementById("lastname");
    var firstname = document.getElementById("firstname");
    var email = document.getElementById("email");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var zip = document.getElementById("zip");

    var order_id = orderNumber();

    var regex_string = /^(([\p{L}]+['-]?[ ]?|[\p{L}]+['-]?)+)$/u;
    var regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+?\.[a-zA-Z0-9-]+$/;
    var regex_address = /(\d+)?\,?\s?(bis|ter|quater)?\,?\s?(rue|avenue|boulevard|r|av|ave|bd|bvd|square|sente|impasse|cours|esplanade|allée|résidence|parc|rond-point|chemin|côte|place|cité|quai|passage|lôtissement|hameau)?\s([a-zA-Zà-ÿ0-9\s]{2,})+$/gi;
    var regex_zip = /^(([0-8][0-9])|(9[0-8]))[0-9]{3}$/;


    if (regex_string.test(lastname.value) === false) {
        alert("Veuillez saisir un nom dans un format valide.");
        lastname.focus();
        return false;
    } else if (regex_string.test(firstname.value) === false) {
        alert("Veuillez saisir un prénom dans un format valide.");
        firstname.focus();
        return false;
    } else if (regex_email.test(email.value) === false) {
        alert("Veuillez saisir un e-mail dans un format valide.");
        email.focus();
        return false;
    } else if (regex_address.test(address.value) === false) {
        alert("Veuillez saisir une adresse postale dans un format valide.");
        address.focus();
        return false;
    } else if (regex_string.test(city.value) === false) {
        alert("Veuillez saisir un nom de ville dans un format valide.");
        city.focus();
        return false;
    } else if (regex_zip.test(zip.value) === false) {
        alert("Veuillez saisir un code postal dans un format valide.");
        zip.focus();
        return false;
    } else {
        var contact = {
            lastname: lastname.value,
            firstname: firstname.value,
            email: email.value,
            address: address.value,
            city: city.value,
            zip: zip.value,
            order_id: order_id,
        };
        var obj = JSON.stringify(contact);
        localStorage.setItem('contact', obj);
        return true;
    }

}

function orderNumber() {
    var now = Date.now().toString();
    // pad with extra random digit
    now += now + Math.floor(Math.random() * 10);
    // format
    return [now.slice(0, 4), now.slice(4, 10), now.slice(10, 14)].join('-');
}

