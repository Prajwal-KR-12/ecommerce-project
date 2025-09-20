
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const messageContainer = document.getElementById('checkout-message');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Basic validation check
            if (checkoutForm.checkValidity()) {
                messageContainer.style.color = 'green';
                messageContainer.textContent = 'Order placed successfully! Redirecting to home page...';

                // Clear the cart
                clearCart();

                // Redirect to home page after 3 seconds
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000);

            } else {
                messageContainer.style.color = 'red';
                messageContainer.textContent = 'Please fill out all fields correctly.';
            }
        });
    }
});

function clearCart() {
    localStorage.removeItem('cart');
}
