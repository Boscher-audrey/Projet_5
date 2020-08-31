$(document).ready(function () {
    function ajaxGet(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.open("GET", url);
            req.addEventListener("load", function () {
                if (req.status >= 200 && req.status < 400) {
                    resolve(req.responseText);
                } else {
                    reject(req.status);
                    console.error(req.status + " " + req.statusText + " " + url);
                }
            });
            req.addEventListener("error", function () {
                console.error("Erreur réseau avec l'URL " + url);
            });
            req.send(null);
        })
    }



    ajaxGet("http://localhost:3000/api/teddies").then(function (reponse) {
        var IDs = JSON.parse(reponse);
        IDs.forEach(function (ID) {
            // Page catalogue START
            $('.products').append('<div class="product ' + ID._id + '"></div>');
            $('.product' + '.' + ID._id).append('<a class="myprod ' + ID._id + '" href="product.html?id=' + ID._id + '" title="Plus d\'informations sur ' + ID.name + '"></a>');
            $('.myprod' + '.' + ID._id).append('<div class="border_product ' + ID._id + '"></div>');
            $('.border_product' + '.' + ID._id).append('<img class="image_product ' + ID._id + '" src="' + ID.imageUrl + '">');
            $('.border_product' + '.' + ID._id).append('<div class="info_product ' + ID._id + '"></div>');
            $('.info_product' + '.' + ID._id).append('<p class="name_product ' + ID._id + '">' + ID.name + '</p>');
            var price = getNumberWithCommas(ID.price);
            $('.info_product' + '.' + ID._id).append('<p class="price_product ' + ID._id + '">' + price + '€ </p>');
            $('.info_product' + '.' + ID._id).append('<p class="colorBox ' + ID._id + '">Colori(s) disponible(s) :<br></p>');
            var colors = ID.colors.map(v => v.toLowerCase());
            for (var i = 0; i < ID.colors.length; i++) {
                $('.colorBox' + '.' + ID._id).append('<span class="product_color ' + colors[i] + '" title="' + colors[i] + '"></span>');
            }
            $('.info_product' + '.' + ID._id).append('<p class="button_product">En savoir plus</p>');
            // Page catalogue END

            // Page product START
            var url_id = window.location.search;
            var id = url_id.split('?id=').pop();
            if (ID._id === id) {
                $('.head_title').html(ID.name);
                $('.page_product').append('<h1 class="catalogue_title">' + ID.name + '</h1>');
                $('.page_product').append('<div class="border_product"></div>');
                $('.border_product').append('<img class="image_product" src="' + ID.imageUrl + '">');
                $('.border_product').append('<div class="info_product"></div>');
                $('.info_product').append('<p class="price_product">' + price + '€</p>');
                $('.info_product').append('<p class="description_product">' + ID.description + '</p>');
                $('.info_product').append('<div class="dropdown dropdown_product"></div>');
                $('.dropdown_product').append('<p class="dropdown_cursor dropdown_text">Coloris disponibles <span class="v">v</span></p>');
                $('.dropdown_product').append('<div class="dropdown_content content_product"></div>');
                for (var i = 0; i < ID.colors.length; i++) {
                    $('.content_product').append('<div class="dropdown_color"><span class="product_color ' + colors[i] + '" title="' + colors[i] + '"></span><span class="product_color_text">' + colors[i] + '</span></div>');
                }
                $('.info_product').append('<p class="button_product add-cart"><a class="set-cart-info" href="panier.html">Ajouter au panier</a></p>');
                // Page product END
                $('.dropdown_color').click(function () {
                    var newContent = $(this).find('.product_color_text').text();
                    $('.dropdown_text').html('<span class="product_color ' + newContent + '"></span><span class="product_color_text">' + newContent + '</span>');
                    $('.dropdown_text').css('margin', '7px 0')
                });
            }
        }); //end foreach
    }).catch(function(err) {
        $('.container.main').load('error.html');
    }); // end ajax

    function getNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".");
    }


});