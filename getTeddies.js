$(document).ready(function () {
    // Exécute un appel AJAX GET
    // Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
    function ajaxGet(url, callback) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.addEventListener("load", function () {
            if (req.status >= 200 && req.status < 400) {
                // Appelle la fonction callback en lui passant la réponse de la requête
                callback(req.responseText);
            } else {
                console.error(req.status + " " + req.statusText + " " + url);
            }
        });
        req.addEventListener("error", function () {
            console.error("Erreur réseau avec l'URL " + url);
        });
        req.send(null);
    }


    ajaxGet("http://localhost:3000/api/teddies", function (reponse) {
        var IDs = JSON.parse(reponse);
        IDs.forEach(function (ID) {
            $('.products').append('<div class="product ' + ID._id + '"></div>');
            $('.product' + '.' + ID._id).append('<a class="myprod ' + ID._id + '" href="product.html" title="Plus d\'informations sur ' + ID.name + '"></a>');
            $('.myprod' + '.' + ID._id).append('<div class="border_product ' + ID._id + '"></div>');
            $('.border_product' + '.' + ID._id).append('<img class="image_product ' + ID._id + '" src="' + ID.imageUrl + '">');
            $('.border_product' + '.' + ID._id).append('<div class="info_product ' + ID._id + '"></div>');
            $('.info_product' + '.' + ID._id).append('<p class="name_product ' + ID._id + '">' + ID.name + '</p>');
            var price = getNumberWithCommas(ID.price);
            $('.info_product' + '.' + ID._id).append('<p class="price_product ' + ID._id + '">' + price + '€ </p>');
            $('.info_product' + '.' + ID._id).append('<p class="colorBox ' + ID._id + '">Colori(s) disponible(s) :<br></p>');
            var colors = ID.colors.map(v => v.toLowerCase())
            for (var i = 0; i < ID.colors.length; i++) {
                $('.colorBox' + '.' + ID._id).append('<span class="product_color ' + colors[i] + '" title="' + colors[i] + '"></span>');
            }
            $('.info_product' + '.' + ID._id).append('<p class="button_product">En savoir plus</p>');
        }); //end foreach
    }); // end ajax

    function getNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".");
    }
});