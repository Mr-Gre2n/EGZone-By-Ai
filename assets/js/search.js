// EgZone Online Store - Search JavaScript

// DOM Elements
const searchForm = document.getElementById('search-form');
const searchInput = document.querySelector('.search-input');
const searchResults = document.querySelector('.search-results');
const searchQuery = document.querySelector('.search-query');
const searchCount = document.querySelector('.search-count');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Search form
  if (searchForm) {
    searchForm.addEventListener('submit', handleSearch);
  }

  // Search input (for live search)
  if (searchInput && document.querySelector('.live-search')) {
    searchInput.addEventListener('input', handleLiveSearch);
  }

  // Render search results if on search page
  if (document.querySelector('.search-page')) {
    renderSearchResults();
  }
});

// Functions
function handleSearch(e) {
  e.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (!searchTerm) return;

  // Redirect to search page with query
  window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
}

function handleLiveSearch() {
  const searchTerm = searchInput.value.trim();

  // Get live search results container
  const liveSearchResults = document.querySelector('.live-search-results');

  if (!liveSearchResults) return;

  // Clear previous results
  liveSearchResults.innerHTML = '';

  // Hide if search term is empty
  if (!searchTerm) {
    liveSearchResults.style.display = 'none';
    return;
  }

  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem('egzone_products')) || [];

  // Filter products by search term
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const category = product.category.toLowerCase();
    const term = searchTerm.toLowerCase();

    return name.includes(term) || description.includes(term) || category.includes(term);
  }).slice(0, 5); // Limit to 5 results

  // Show results container
  liveSearchResults.style.display = 'block';

  if (filteredProducts.length === 0) {
    liveSearchResults.innerHTML = `
      <div class="live-search-no-results">
        <p>No results found for "${searchTerm}"</p>
      </div>
    `;
    return;
  }

  // Create results list
  const resultsList = document.createElement('ul');
  resultsList.className = 'live-search-list';

  // Add results
  filteredProducts.forEach(product => {
    const resultItem = document.createElement('li');
    resultItem.className = 'live-search-item';

    resultItem.innerHTML = `
      <a href="product.html?id=${product.id}">
        <div class="live-search-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="live-search-content">
          <h4 class="live-search-title">${highlightSearchTerm(product.name, searchTerm)}</h4>
          <div class="live-search-category">${product.category}</div>
          <div class="live-search-price">$${product.price.toFixed(2)}</div>
        </div>
      </a>
    `;

    resultsList.appendChild(resultItem);
  });

  // Add view all link
  const viewAllItem = document.createElement('li');
  viewAllItem.className = 'live-search-view-all';

  viewAllItem.innerHTML = `
    <a href="search.html?q=${encodeURIComponent(searchTerm)}">
      View all results for "${searchTerm}"
    </a>
  `;

  resultsList.appendChild(viewAllItem);

  // Add to results container
  liveSearchResults.appendChild(resultsList);

  // Close live search on click outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !liveSearchResults.contains(e.target)) {
      liveSearchResults.style.display = 'none';
    }
  });
}

function renderSearchResults() {
  if (!searchResults || !searchQuery || !searchCount) return;

  // Get search query from URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('q');

  if (!searchTerm) {
    window.location.href = 'index.html';
    return;
  }

  // Update search query text
  searchQuery.textContent = searchTerm;

  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem('egzone_products')) || [];

  // Filter products by search term
  const filteredProducts = products.filter(product => {
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const category = product.category.toLowerCase();
    const term = searchTerm.toLowerCase();

    return name.includes(term) || description.includes(term) || category.includes(term);
  });

  // Update search count
  searchCount.textContent = filteredProducts.length;

  // Clear search results
  searchResults.innerHTML = '';

  if (filteredProducts.length === 0) {
    searchResults.innerHTML = `
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
    const productCard = createProductCard(product, searchTerm);
    productGrid.appendChild(productCard);
  });

  searchResults.appendChild(productGrid);
}

function createProductCard(product, searchTerm = '') {
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
        <a href="product.html?id=${product.id}">
          ${searchTerm ? highlightSearchTerm(product.name, searchTerm) : product.name}
        </a>
      </h3>
      <div class="product-card-description">
        ${searchTerm ?
          highlightSearchTerm(product.description.substring(0, 100), searchTerm) :
          product.description.substring(0, 100)}${product.description.length > 100 ? '...' : ''}
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

function highlightSearchTerm(text, searchTerm) {
  if (!searchTerm) return text;

  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
  return text.replace(regex, '<span class="highlight">$1</span>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
