document.addEventListener('DOMContentLoaded', () => {
    const featuredProductGrid = document.getElementById('featured-product-grid');
    const shopProductGrid = document.getElementById('shop-product-grid');

    // Fetch products from the JSON file
    fetch('data/products.json')
        .then(response => response.json())
        .then(products => {
            // If we are on the home page, display featured products
            if (featuredProductGrid) {
                const featuredProducts = products.slice(0, 3);
                displayProducts(featuredProducts, featuredProductGrid);
            }

            // If we are on the shop page, display all products
            if (shopProductGrid) {
                displayProducts(products, shopProductGrid);
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            if (featuredProductGrid) {
                featuredProductGrid.innerHTML = '<p>Could not load products at this time.</p>';
            }
            if (shopProductGrid) {
                shopProductGrid.innerHTML = '<p>Could not load products at this time.</p>';
            }
        });

    // Function to display products in a given container
    function displayProducts(products, container) {
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;

            container.appendChild(productCard);
        });
    }

    // Add to cart functionality (event delegation)
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.dataset.id;
            addToCart(productId);
        }
    });
});