/* jshint esversion:6 */

function calcTotalPrice() {
    let burgerPrice = 1200;
    let quantityInput = document.querySelector("input[name='quantity']");
    let quantity = parseInt(quantityInput.value);
    let totalPrice = quantity * burgerPrice;
    let message = document.getElementById('message');

    // totalPrice.textContent = 'Ár: ' + totalPrice + ' Ft';
    // ` (backquote/backtick) -> ó
    message.textContent = `Ár: ${totalPrice} Ft`;
}

/* document.addEventListener("DOMContentLoaded", function() {
    calcTotalPrice();
}); */

// html-ben onclick="calcTotalPrice" itt csak "click"
document.querySelector("button[type='submit']").addEventListener("click", function(evt) {
    evt.preventDefault();
    calcTotalPrice();
});