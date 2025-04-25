// EgZone Online Store - Products JavaScript

// Sample product data
const sampleProducts = [
  {
    id: 'p1',
    name: 'iPhone 13 Pro',
    category: 'Smartphones',
    price: 999.99,
    oldPrice: 1099.99,
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'The latest iPhone with A15 Bionic chip, Pro camera system, and Super Retina XDR display with ProMotion.',
    features: [
      '6.1-inch Super Retina XDR display with ProMotion',
      'A15 Bionic chip',
      'Pro camera system with 12MP cameras',
      'Up to 28 hours of video playback',
      '5G capable'
    ],
    stock: 15,
    rating: 4.8,
    reviews: 124,
    isNew: true,
    isFeatured: false
  },
  {
    id: 'p2',
    name: 'Samsung Galaxy S22 Ultra',
    category: 'Smartphones',
    price: 1199.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1644501635454-a0a7ff7a247f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'The Samsung Galaxy S22 Ultra features a built-in S Pen, Nightography camera, and a 4nm processor.',
    features: [
      '6.8-inch Dynamic AMOLED 2X display',
      '4nm processor',
      '108MP camera with Nightography',
      'Built-in S Pen',
      '5G capable'
    ],
    stock: 10,
    rating: 4.7,
    reviews: 98,
    isNew: true,
    isFeatured: false
  },
  {
    id: 'p3',
    name: 'MacBook Pro 14"',
    category: 'Computers',
    price: 1999.99,
    oldPrice: 2199.99,
    image: 'https://images.unsplash.com/photo-1639249227523-85ede07b6d66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'The MacBook Pro 14" features the M1 Pro chip, Liquid Retina XDR display, and up to 17 hours of battery life.',
    features: [
      '14-inch Liquid Retina XDR display',
      'M1 Pro chip',
      'Up to 17 hours of battery life',
      '16GB unified memory',
      '512GB SSD storage'
    ],
    stock: 8,
    rating: 4.9,
    reviews: 75,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p4',
    name: 'Dell XPS 15',
    category: 'Computers',
    price: 1799.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'The Dell XPS 15 features a 15.6-inch InfinityEdge display, 11th Gen Intel Core processors, and NVIDIA GeForce graphics.',
    features: [
      '15.6-inch InfinityEdge display',
      '11th Gen Intel Core processors',
      'NVIDIA GeForce graphics',
      'Up to 13 hours of battery life',
      '16GB RAM, 512GB SSD'
    ],
    stock: 5,
    rating: 4.6,
    reviews: 62,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p5',
    name: 'AirPods Pro',
    category: 'Accessories',
    price: 249.99,
    oldPrice: 279.99,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'AirPods Pro feature Active Noise Cancellation, Transparency mode, and a customizable fit.',
    features: [
      'Active Noise Cancellation',
      'Transparency mode',
      'Adaptive EQ',
      'Spatial audio with dynamic head tracking',
      'Water and sweat resistant'
    ],
    stock: 20,
    rating: 4.7,
    reviews: 135,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p6',
    name: 'Samsung 27" Gaming Monitor',
    category: 'Accessories',
    price: 299.99,
    oldPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1616711906333-23cf8c0d8965?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'This 27-inch gaming monitor features a 144Hz refresh rate, 1ms response time, and AMD FreeSync technology.',
    features: [
      '27-inch display',
      '144Hz refresh rate',
      '1ms response time',
      'AMD FreeSync technology',
      'HDR10 support'
    ],
    stock: 12,
    rating: 4.5,
    reviews: 87,
    isNew: true,
    isFeatured: false
  },
  {
    id: 'p7',
    name: 'Google Pixel 6 Pro',
    category: 'Smartphones',
    price: 899.99,
    oldPrice: 999.99,
    image: 'https://images.unsplash.com/photo-1635870723802-e88d76ae3da7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'The Google Pixel 6 Pro features Google Tensor, the first processor designed by Google, and an advanced camera system.',
    features: [
      '6.7-inch LTPO OLED display',
      'Google Tensor processor',
      '50MP wide camera, 12MP ultrawide, 48MP telephoto',
      'Up to 24 hours of battery life',
      '5G capable'
    ],
    stock: 7,
    rating: 4.6,
    reviews: 92,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p8',
    name: 'HP Spectre x360',
    category: 'Computers',
    price: 1399.99,
    oldPrice: 1499.99,
    image: 'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'The HP Spectre x360 is a 2-in-1 laptop featuring a 13.5-inch OLED display, 11th Gen Intel Core processors, and up to 17 hours of battery life.',
    features: [
      '13.5-inch OLED display',
      '11th Gen Intel Core processors',
      'Intel Iris Xe graphics',
      'Up to 17 hours of battery life',
      '16GB RAM, 1TB SSD'
    ],
    stock: 4,
    rating: 4.5,
    reviews: 58,
    isNew: false,
    isFeatured: false
  },
  {
    id: 'p9',
    name: 'Logitech MX Master 3',
    category: 'Accessories',
    price: 99.99,
    oldPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'The Logitech MX Master 3 is an advanced wireless mouse with ultra-fast scrolling, customizable buttons, and app-specific customizations.',
    features: [
      'Ultra-fast MagSpeed scrolling',
      'Ergonomic design',
      'App-specific customizations',
      'Track on any surface, including glass',
      'Up to 70 days on a full charge'
    ],
    stock: 15,
    rating: 4.8,
    reviews: 112,
    isNew: false,
    isFeatured: false
  }
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const productDetails = document.querySelector('.product-details');
const categoryFilter = document.querySelector('.category-filter');
const searchForm = document.getElementById('search-form');
const addProductForm = document.getElementById('add-product-form');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize products in localStorage if not exists
  initializeProducts();

  // Render products on home page
  if (productGrid && !document.querySelector('.search-page')) {
    renderProducts();
  }

  // Render product details on product page
  if (productDetails) {
    renderProductDetails();
  }

  // Category filter
  if (categoryFilter) {
    categoryFilter.addEventListener('click', handleCategoryFilter);
  }

  // Search form
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  // Add product form
  if (addProductForm) {
    addProductForm.addEventListener('submit', handleAddProduct);
  }

  // Render search results if on search page
  if (document.querySelector('.search-page')) {
    renderSearchResults();
  }
});

// Functions
function initializeProducts() {
  // Check if products exist in localStorage
  if (!localStorage.getItem('egzone_products')) {
    // Save sample products to localStorage
    localStorage.setItem('egzone_products', JSON.stringify(sampleProducts));
  }
}

function getProducts() {
  return JSON.parse(localStorage.getItem('egzone_products')) || [];
}

function renderProducts(category = null) {
  if (!productGrid) return;

  let products = getProducts();

  // Filter by category if provided
  if (category) {
    products = products.filter(product => product.category === category);
  }

  // Clear product grid
  productGrid.innerHTML = '';

  // Render products
  products.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });
}

function createProductCard(product) {
  const productCard = document.createElement('div');
  productCard.className = `product-card ${product.isFeatured ? 'featured-product' : ''}`;
  productCard.dataset.id = product.id;

  // Calculate discount percentage if there's an old price
  let discountPercentage = null;
  if (product.oldPrice) {
    discountPercentage = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }

  productCard.innerHTML = `
    <div class="product-card-image">
      <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this, '${product.category}')">
      ${product.isNew ? '<span class="product-card-badge new">New</span>' : ''}
      ${product.oldPrice ? `<span class="product-card-badge sale">Sale</span>` : ''}
      ${discountPercentage ? `<div class="product-card-discount">-${discountPercentage}%</div>` : ''}
      <div class="product-card-actions">
        <button class="product-card-action add-to-cart-btn" title="Add to Cart">
          <i class="fas fa-shopping-cart"></i>
        </button>
        <button class="product-card-action" title="Add to Wishlist">
          <i class="fas fa-heart"></i>
        </button>
        <button class="product-card-action" title="Quick View">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </div>
    <div class="product-card-content">
      <div class="product-card-category">${product.category}</div>
      <h3 class="product-card-title">
        <a href="product.html?id=${product.id}">${product.name}</a>
      </h3>
      <div class="product-card-description">
        ${product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}
      </div>
      <div class="product-card-price">
        <span class="product-card-current-price">$${product.price.toFixed(2)}</span>
        ${product.oldPrice ? `<span class="product-card-old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
      </div>
      <div class="product-card-rating">
        <div class="product-card-stars">
          ${getStarRating(product.rating)}
        </div>
        <span class="product-card-review-count">(${product.reviews})</span>
      </div>
      <div class="product-card-footer">
        <button class="product-card-btn add-to-cart-btn">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <div class="product-card-stock ${getStockClass(product.stock)}">
          ${getStockText(product.stock)}
        </div>
      </div>
    </div>
  `;

  // Add event listener to add to cart button
  const addToCartBtns = productCard.querySelectorAll('.add-to-cart-btn');
  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });

  return productCard;
}

function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  let stars = '';

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }

  // Half star
  if (halfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }

  // Empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }

  return stars;
}

function getStockClass(stock) {
  if (stock <= 0) return 'out-of-stock';
  if (stock <= 5) return 'low-stock';
  return 'in-stock';
}

function getStockText(stock) {
  if (stock <= 0) return 'Out of Stock';
  if (stock <= 5) return 'Low Stock';
  return 'In Stock';
}

function addToCart(product) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];

  // Check if product already in cart
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  // Save cart to localStorage
  localStorage.setItem('egzone_cart', JSON.stringify(cart));

  // Update cart count
  updateCartCount();

  // Show success message
  showNotification('Product added to cart!', 'success');
}

function renderProductDetails() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  if (!productId) {
    window.location.href = '404.html';
    return;
  }

  // Get product from localStorage
  const products = getProducts();
  const product = products.find(p => p.id === productId);

  if (!product) {
    window.location.href = '404.html';
    return;
  }

  // Set page title
  document.title = `${product.name} - EgZone`;

  // Render product details
  productDetails.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" onerror="handleImageError(this, '${product.category}')">
      ${product.isNew ? '<span class="product-badge new">New</span>' : ''}
      ${product.oldPrice ? `<span class="product-badge sale">Sale</span>` : ''}
    </div>
    <div class="product-info">
      <h1 class="product-title">${product.name}</h1>
      <div class="product-meta">
        <div class="product-category">Category: <a href="index.html?category=${product.category}">${product.category}</a></div>
        <div class="product-rating">
          <div class="product-stars">
            ${getStarRating(product.rating)}
          </div>
          <span class="product-review-count">${product.reviews} Reviews</span>
        </div>
      </div>
      <div class="product-price">
        <span class="current-price">$${product.price.toFixed(2)}</span>
        ${product.oldPrice ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` : ''}
      </div>
      <div class="product-description">
        <p>${product.description}</p>
      </div>
      <div class="product-features">
        <h3>Key Features:</h3>
        <ul>
          ${product.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      <div class="product-stock ${getStockClass(product.stock)}">
        ${getStockText(product.stock)} (${product.stock} items left)
      </div>
      <div class="product-actions">
        <div class="product-quantity">
          <button class="quantity-btn" data-action="decrease">-</button>
          <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}">
          <button class="quantity-btn" data-action="increase">+</button>
        </div>
        <button class="btn add-to-cart-btn" ${product.stock <= 0 ? 'disabled' : ''}>
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
        <button class="btn btn-outline wishlist-btn">
          <i class="fas fa-heart"></i> Add to Wishlist
        </button>
      </div>
    </div>
  `;

  // Add event listeners
  const addToCartBtn = productDetails.querySelector('.add-to-cart-btn');
  const quantityBtns = productDetails.querySelectorAll('.quantity-btn');
  const quantityInput = productDetails.querySelector('.quantity-input');

  addToCartBtn.addEventListener('click', () => {
    const quantity = parseInt(quantityInput.value);
    addToCartWithQuantity(product, quantity);
  });

  quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      let currentValue = parseInt(quantityInput.value);

      if (action === 'increase' && currentValue < product.stock) {
        currentValue += 1;
      } else if (action === 'decrease' && currentValue > 1) {
        currentValue -= 1;
      }

      quantityInput.value = currentValue;
    });
  });

  // Validate quantity input
  quantityInput.addEventListener('change', () => {
    let value = parseInt(quantityInput.value);

    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > product.stock) {
      value = product.stock;
    }

    quantityInput.value = value;
  });
}

function addToCartWithQuantity(product, quantity) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];

  // Check if product already in cart
  const existingProduct = cart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  // Save cart to localStorage
  localStorage.setItem('egzone_cart', JSON.stringify(cart));

  // Update cart count
  updateCartCount();

  // Show success message
  showNotification(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`, 'success');
}

function handleCategoryFilter(e) {
  e.preventDefault();

  if (e.target.tagName !== 'A') return;

  const category = e.target.dataset.category;

  // Update active class
  const categoryLinks = categoryFilter.querySelectorAll('a');
  categoryLinks.forEach(link => link.classList.remove('active'));
  e.target.classList.add('active');

  // Render products by category
  if (category === 'all') {
    renderProducts();
  } else {
    renderProducts(category);
  }
}

function handleSearch(e) {
  e.preventDefault();

  const searchInput = document.querySelector('.search-input');
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) return;

  // Redirect to search page with query
  window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
}

function renderSearchResults() {
  const searchResultsContainer = document.querySelector('.search-results');
  const searchQueryElement = document.querySelector('.search-query');

  // Get search query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('q');

  if (!searchTerm) {
    window.location.href = 'index.html';
    return;
  }

  // Update search query text
  searchQueryElement.textContent = searchTerm;

  // Get products from localStorage
  const products = getProducts();

  // Filter products by search term
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const category = product.category.toLowerCase();
    const term = searchTerm.toLowerCase();

    return name.includes(term) || description.includes(term) || category.includes(term);
  });

  // Update search count
  document.querySelector('.search-count').textContent = filteredProducts.length;

  // Clear search results
  searchResultsContainer.innerHTML = '';

  if (filteredProducts.length === 0) {
    searchResultsContainer.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <h3>No results found</h3>
        <p>We couldn't find any products matching your search.</p>
        <a href="index.html" class="btn">Back to Home</a>
      </div>
    `;
    return;
  }

  // Create product grid
  const productGrid = document.createElement('div');
  productGrid.className = 'product-grid';

  // Render products
  filteredProducts.forEach(product => {
    const productCard = createProductCard(product);
    productGrid.appendChild(productCard);
  });

  searchResultsContainer.appendChild(productGrid);
}

function handleAddProduct(e) {
  e.preventDefault();

  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('egzone_current_user'));
  if (!currentUser || !currentUser.isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }

  // Get form data
  const name = document.getElementById('product-name').value;
  const category = document.getElementById('product-category').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const oldPrice = document.getElementById('product-old-price').value ? parseFloat(document.getElementById('product-old-price').value) : null;
  const image = document.getElementById('product-image').value;
  const description = document.getElementById('product-description').value;
  const features = document.getElementById('product-features').value.split('\n').filter(feature => feature.trim() !== '');
  const stock = parseInt(document.getElementById('product-stock').value);
  const isNew = document.getElementById('product-is-new').checked;
  const isFeatured = document.getElementById('product-is-featured').checked;

  // Validate form
  if (!name || !category || isNaN(price) || !image || !description || features.length === 0 || isNaN(stock)) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  // Create new product
  const newProduct = {
    id: generateProductId(),
    name,
    category,
    price,
    oldPrice,
    image,
    description,
    features,
    stock,
    rating: 0,
    reviews: 0,
    isNew,
    isFeatured
  };

  // Get products from localStorage
  let products = getProducts();

  // Add new product
  products.push(newProduct);

  // Save to localStorage
  localStorage.setItem('egzone_products', JSON.stringify(products));

  // Show success message
  showNotification('Product added successfully!', 'success');

  // Reset form
  addProductForm.reset();

  // Redirect to product page
  setTimeout(() => {
    window.location.href = `product.html?id=${newProduct.id}`;
  }, 1500);
}

function generateProductId() {
  return 'p' + Math.random().toString(36).substring(2, 10);
}

function showNotification(message, type = 'info') {
  // Create notification element if not exists
  let notification = document.querySelector('.notification');

  if (!notification) {
    notification = document.createElement('div');
    notification.className = `notification ${type}`;
    document.body.appendChild(notification);
  } else {
    notification.className = `notification ${type}`;
  }

  // Set message
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <p>${message}</p>
    </div>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;

  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);

  // Auto hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);

  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.classList.remove('show');
  });
}
