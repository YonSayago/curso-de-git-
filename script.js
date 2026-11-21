// Base de datos simulada de productos deportivos
const products = [
    {
        id: 1,
        name: "Zapatillas Running Pro Air",
        category: "zapatos",
        price: 120,
        available: true,
        description: "Amortiguación ultraligera ideal para carreras de larga distancia.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 2,
        name: "Camisa Técnica Dry-Fit",
        category: "camisas",
        price: 490,
        available: true,
        description: "Tejido transpirable de secado rápido para entrenamiento intenso.",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Botas de Fútbol Velocity FG",
        category: "zapatos",
        price: 165,
        available: false,
        description: "Tracción explosiva en césped natural con ajuste anatómico.",
        image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Camiseta Selección Edición Local",
        category: "camisas",
        price: 85,
        available: true,
        description: "Diseño oficial con ventilación láser en zonas estratégicas.",
        image: "https://images.unsplash.com/photo-1577212017184-80cc0da11082?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "Balón Profesional Match Pro",
        category: "accesorios",
        price: 55,
        available: true,
        description: "Superficie texturizada termosellada para máxima precisión.",
        image: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Zapatillas Basketball High-Top",
        category: "zapatos",
        price: 190,
        available: true,
        description: "Soporte superior en el tobillo y suela de alto agarre en duela.",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 7,
        name: "Sudadera térmica Training",
        category: "camisas",
        price: 68,
        available: false,
        description: "Interior afelpado que conserva el calor sin limitar la movilidad.",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 8,
        name: "Mochila Deportiva Gym 40L",
        category: "accesorios",
        price: 48,
        available: true,
        description: "Compartimento independiente ventilado para calzado y botellas.",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 9,
        name: "Tenis CrossFit PowerLift",
        category: "zapatos",
        price: 145,
        available: true,
        description: "Base plana y estable diseñada para levantamiento de pesas.",
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 10,
        name: "Camisa Compresión Muscular",
        category: "camisas",
        price: 42,
        available: true,
        description: "Mejora la circulación y reduce la fatiga durante el ejercicio.",
        image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 11,
        name: "Guantes de Portero Elite Grip",
        category: "accesorios",
        price: 75,
        available: false,
        description: "Palma de látex alemán de 4mm para agarre en todo clima.",
        image: "https://images.unsplash.com/photo-1518605368461-1ee7e1611f21?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 12,
        name: "Zapatillas Trail Running Terra",
        category: "zapatos",
        price: 155,
        available: true,
        description: "Suela con tacos profundos y membrana resistente al agua.",
        image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80"
    }
];

// Estado de los filtros y carrito
let state = {
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 300,
    availability: "all",
    sort: "featured",
    cart: []
};

// Referencias al DOM
const productsGrid = document.getElementById("productsGrid");
const resultsCount = document.getElementById("resultsCount");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const categoryRadios = document.querySelectorAll('input[name="category"]');
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const availabilitySelect = document.getElementById("availabilitySelect");
const sortSelect = document.getElementById("sortSelect");

const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const emptyResetBtn = document.getElementById("emptyResetBtn");

// Elementos del carrito
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

// Función principal para filtrar y renderizar productos
function renderProducts() {
    // 1. Filtrar
    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(state.search.toLowerCase()) ||
                              product.description.toLowerCase().includes(state.search.toLowerCase());
        const matchesCategory = state.category === "all" || product.category === state.category;
        const matchesPrice = product.price >= state.minPrice && product.price <= state.maxPrice;
        
        let matchesAvailability = true;
        if (state.availability === "available") matchesAvailability = product.available === true;
        if (state.availability === "out") matchesAvailability = product.available === false;

        return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });

    // 2. Ordenar
    if (state.sort === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
    } else if (state.sort === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    // 3. Actualizar contador
    resultsCount.textContent = `Mostrando ${filtered.length} producto${filtered.length !== 1 ? 's' : ''}`;

    // 4. Mostrar u ocultar estado vacío
    if (filtered.length === 0) {
        productsGrid.innerHTML = "";
        emptyState.classList.remove("hidden");
        return;
    } else {
        emptyState.classList.add("hidden");
    }

    // 5. Renderizar tarjetas
    productsGrid.innerHTML = filtered.map(product => `
        <article class="product-card">
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
                <span class="badge-stock ${product.available ? 'badge-available' : 'badge-out'}">
                    ${product.available ? 'Disponible' : 'Agotado'}
                </span>
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button 
                        class="btn-primary" 
                        onclick="addToCart(${product.id})"
                        ${!product.available ? 'disabled' : ''}>
                        ${product.available ? '+ Agregar' : 'Sin stock'}
                    </button>
                </div>
            </div>
        </article>
    `).join("");
}

// Funciones del carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.available) return;

    const existingItem = state.cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

    if (state.cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Tu carrito está vacío.</p>`;
        return;
    }

    cartItemsContainer.innerHTML = state.cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
        </div>
    `).join("");
}

// Eventos de filtros
searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    renderProducts();
});

categoryRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
        state.category = e.target.value;
        renderProducts();
    });
});

priceRange.addEventListener("input", (e) => {
    const val = Number(e.target.value);
    state.maxPrice = val;
    priceValue.textContent = val;
    maxPriceInput.value = val;
    renderProducts();
});

minPriceInput.addEventListener("input", (e) => {
    state.minPrice = Number(e.target.value) || 0;
    renderProducts();
});

maxPriceInput.addEventListener("input", (e) => {
    const val = Number(e.target.value) || 300;
    state.maxPrice = val;
    priceRange.value = val;
    priceValue.textContent = val;
    renderProducts();
});

availabilitySelect.addEventListener("change", (e) => {
    state.availability = e.target.value;
    renderProducts();
});

sortSelect.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderProducts();
});

// Restablecer filtros
function resetAllFilters() {
    state.search = "";
    state.category = "all";
    state.minPrice = 0;
    state.maxPrice = 300;
    state.availability = "all";
    state.sort = "featured";

    searchInput.value = "";
    document.querySelector('input[name="category"][value="all"]').checked = true;
    priceRange.value = 300;
    priceValue.textContent = "300";
    minPriceInput.value = 0;
    maxPriceInput.value = 300;
    availabilitySelect.value = "all";
    sortSelect.value = "featured";

    renderProducts();
}

resetFiltersBtn.addEventListener("click", resetAllFilters);
emptyResetBtn.addEventListener("click", resetAllFilters);

// Abrir y cerrar carrito
function toggleCart(open) {
    if (open) {
        cartDrawer.classList.add("open");
        cartOverlay.classList.remove("hidden");
    } else {
        cartDrawer.classList.remove("open");
        cartOverlay.classList.add("hidden");
    }
}

openCartBtn.addEventListener("click", () => toggleCart(true));
closeCartBtn.addEventListener("click", () => toggleCart(false));
cartOverlay.addEventListener("click", () => toggleCart(false));

checkoutBtn.addEventListener("click", () => {
    if (state.cart.length === 0) {
        alert("Agrega productos al carrito antes de finalizar la compra.");
        return;
    }
    alert("¡Gracias por tu compra! Tu pedido deportivo ha sido procesado.");
    state.cart = [];
    updateCartUI();
    toggleCart(false);
});

// Inicializar catálogo al cargar la página
renderProducts();