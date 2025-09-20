
// Get cart from local storage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Add product to cart
function addToCart(productId) {
    const cart = getCart();
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart updated:', getCart());
    alert('Product added to cart!');
}

// Remove product from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update product quantity in cart
function updateQuantity(productId, quantity) {
    let cart = getCart();
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity = quantity;
    }

    if (product.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
