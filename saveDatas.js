$(document).on('click', '.set-cart-info', function () {
    // We retrieve the product id which is stored in the url
    var url_id = window.location.search;
    var id = url_id.split('?id=').pop();
    // We retrieve the data from the localStorage
    var cartItems = localStorage.getItem('teddy_id');
    // If there is no data, we create an array
    cartItems = cartItems ? cartItems.split(',') : [];
    // Add the new data to the array
    cartItems.push(id);
    // We save the data in the localStorage
    localStorage.setItem('teddy_id', cartItems.toString());
});