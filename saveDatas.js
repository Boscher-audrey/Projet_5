$(document).on('click', '.set-cart-info', function () {
    // On récupère l'id du produit qui est stockée dans l'url
    var url_id = window.location.search;
    var id = url_id.split('?id=').pop();

    // On récupère les données du localStorage
    var cartItems = localStorage.getItem('teddy_id');
    // S'il n'y a pas de données, on créer un tableau
    cartItems = cartItems ? cartItems.split(',') : [];
    // On ajoute les nouvelles données au tableau
    cartItems.push(id);
    // On sauvegarde les données dans le localStorage
    localStorage.setItem('teddy_id', cartItems.toString());
    console.log(localStorage.getItem('teddy_id'));
});