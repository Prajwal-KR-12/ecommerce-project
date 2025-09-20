
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalContainer = document.getElementById('cart-total');
    const allProducts = [];

    // First, fetch all product data
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            allProducts.push(...products);
            renderCart();
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            cartItemsContainer.innerHTML = '<p>Error loading cart.</p>';
        });

    function renderCart() {
        const cart = getCart();
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let total = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartTotalContainer.textContent = '$0.00';
            return;
        }

        cart.forEach(cartItem => {
            const product = allProducts.find(p => p.id == cartItem.id);
            if (!product) return;

            const itemTotal = product.price * cartItem.quantity;
            total += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <div class="cart-item-info">
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h4>${product.name}</h4>
                        <p>$${product.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <input type="number" class="quantity" value="${cartItem.quantity}" min="1" data-id="${product.id}">
                    <button class="remove-item" data-id="${product.id}">Remove</button>
                </div>
                <div class="cart-item-total">
                    <p>$${itemTotal.toFixed(2)}</p>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotalContainer.textContent = `$${total.toFixed(2)}`;
    }

    // Event delegation for quantity changes and removing items
    cartItemsContainer.addEventListener('change', e => {
        if (e.target.classList.contains('quantity')) {
            const productId = e.target.dataset.id;
            const newQuantity = parseInt(e.target.value, 10);
            updateQuantity(productId, newQuantity);
            renderCart(); // Re-render the cart to reflect changes
        }
    });

    cartItemsContainer.addEventListener('click', e => {
        if (e.target.classList.contains('remove-item')) {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
            renderCart(); // Re-render the cart
        }
    });
});
