$(document).ready(function () {
    function ajaxGet(url) {
        return new Promise(function (resolve, reject) {
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
                console.error("Erreur réseau avec l'URL " + url + ". Veuillez vérifier que la connexion avec le server distant fonctionne correctement.");
            });
            req.send(null);
        })
    }

    var total_price_products = 0;

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
            // Page product END

            // Page panier START
            var cart_products = localStorage.getItem('teddy_id');
            var split_products = cart_products.split(',');
            var count_products = countProducts(split_products, ID._id);

            if (count_products > 0) {
                var price_products = price * count_products;
                $('.panier_content').append('<tr class="product_in_cart ' + ID._id + '"></tr>');
                $('.product_in_cart' + '.' + ID._id).append('<td class="product_in_cart_image"><img style="width: 60px;" src="' + ID.imageUrl + '"></td>');
                $('.product_in_cart' + '.' + ID._id).append('<td class="product_in_cart_name"><p>' + ID.name + '</p></td>');
                $('.product_in_cart' + '.' + ID._id).append('<td class="product_in_cart_price"><p>' + price + '€</p></td>');
                $('.product_in_cart' + '.' + ID._id).append('<td class="product_in_cart_quantity"><p>' + count_products + '</p></td>');
                $('.product_in_cart' + '.' + ID._id).append('<td class="product_in_cart_totalprice"><p>' + price_products + '.00€</p></td>');
                $('.product_in_cart' + '.' + ID._id).append('<td class="product_in_cart_changeqty"><button onClick="window.location.reload()" class="add_qty ' + ID._id + '">+</button><button onClick="window.location.reload()" class="remove_qty ' + ID._id + '">-</button></td>');

                total_price_products += price_products;
            }


        }); //end foreach


        $('.panier_content').append('<tr class="total_in_cart"><td></td><td></td><td></td><td></td></tr>');
        $('.total_in_cart').append('<td class="total_in_cart_price"><p>Prix total : ' + total_price_products + '.00€</p></td>');
        $('.total_in_cart').append('<td class="empty_cart"><button onClick="window.location.reload()" class="empty_cart">Vider le panier</button></td>');
        // Page panier END

        // Page confirmation de commande START
        var contact = localStorage.getItem('contact');
        var orderInfos = JSON.parse(contact);

        var date = new Date().toLocaleDateString('fr');

        $('.order-confirmation_title').append('Orinoco vous remercie pour votre commande n°' + orderInfos.order_id);
        $('.order-confirmation_message').append('Vous trouverez ci-dessous un récapitulatif de votre commande qui vous a également été envoyé par mail à l\'adresse ' + orderInfos.email);
        $('.order_date').append('Commande passée le ' + date);
        IDs.forEach(function (ID) {
            var cart_products = localStorage.getItem('teddy_id');
            var split_products = cart_products.split(',');
            var count_products = countProducts(split_products, ID._id);
            var price = getNumberWithCommas(ID.price);
            var price_products = price * count_products;

            if (count_products > 0) {
                $('.order_table').append('<tr class="order_product_info ' + ID._id + '"><td>' + ID.name + '</td></tr>');
                $('.order_product_info' + '.' + ID._id).append('<td>' + count_products + '</td>');
                $('.order_product_info' + '.' + ID._id).append('<td>' + price + '€ </td>');
                $('.order_product_info' + '.' + ID._id).append('<td>' + price_products + '.00€ </td>');
            }
        }); //end foreach

        $('.order_table').append('<tr><td></td></tr><tr><td></td></tr>');
        $('.order_table').append('<tr class="order_total_price"><td></td><td></td></tr>');
        $('.order_total_price').append('<td><i>Prix total de la commande :</i></td>');
        $('.order_total_price').append('<td><i>' + total_price_products + '.00€</i></td>');

        $('.order_contact_name').append(orderInfos.firstname + ' ' + orderInfos.lastname);
        $('.order_contact_address').append(orderInfos.address);
        $('.order_contact_city').append(orderInfos.zip + ' ' + orderInfos.city);
        // Page confirmation de commande END

    }).catch(function (err) {
        $('.container.main').load('error.html');
    }); // end ajax

    function getNumberWithCommas(number) {
        return number.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ".");
    }

    function countProducts(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

});


$(document).on('click', '.add_qty', function () {
    // We retrieve the product id which is stored in the class
    var split_class = this.className.split(' ');
    var this_id = split_class[1];
    var cartItems = localStorage.getItem('teddy_id');
    cartItems = cartItems ? cartItems.split(',') : [];
    cartItems.push(this_id);
    localStorage.setItem('teddy_id', cartItems.toString());
});

$(document).on('click', '.remove_qty', function () {
    // We retrieve the product id which is stored in the class
    var split_class = this.className.split(' ');
    var this_id = split_class[1];
    var cartItems = localStorage.getItem('teddy_id');
    cartItems = cartItems ? cartItems.split(',') : [];

    // This is the part that retrieve the product by his ID and delete all product with this specific ID
    cartItems.find( ( item, i ) => {
        if ( item === this_id ) {
            cartItems.splice( i, 1 );
            return true;
        }
        return false;
    });
    localStorage.setItem('teddy_id', cartItems.toString());
});


$(document).on('click', '.empty_cart', function () {
   //localStorage.clear();
    localStorage.setItem('teddy_id', "");
});