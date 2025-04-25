// EgZone Online Store - Main JavaScript

// DOM Elements
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the cart count
  updateCartCount();
  
  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Initialize dropdowns for mobile
  initializeDropdowns();
  
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', handleAddToCart);
  });
  
  // Product quantity buttons
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  quantityBtns.forEach(btn => {
    btn.addEventListener('click', handleQuantityChange);
  });
  
  // Initialize current page in navbar
  highlightCurrentPage();
});

// Functions
function toggleMobileMenu() {
  navbarMenu.classList.toggle('active');
  
  // Toggle between hamburger and close icon
  const icon = mobileMenuToggle.querySelector('i');
  if (icon.classList.contains('fa-bars')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
}

function initializeDropdowns() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    
    // For mobile devices
    if (window.innerWidth <= 768) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
    }
  });
}

function handleAddToCart(e) {
  e.preventDefault();
  
  const productCard = e.target.closest('.product-card');
  const productId = productCard.dataset.id;
  const productName = productCard.querySelector('.product-card-title').textContent;
  const productPrice = parseFloat(productCard.querySelector('.product-card-current-price').textContent.replace('$', ''));
  const productImage = productCard.querySelector('.product-card-image img').src;
  
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  // Check if product already in cart
  const existingProduct = cart.find(item => item.id === productId);
  
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
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

function updateCartCount() {
  const cartCountElement = document.querySelector('.cart-count');
  if (!cartCountElement) return;
  
  const cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  cartCountElement.textContent = itemCount;
  
  // Hide count if zero
  if (itemCount === 0) {
    cartCountElement.style.display = 'none';
  } else {
    cartCountElement.style.display = 'flex';
  }
}

function handleQuantityChange(e) {
  const btn = e.target;
  const action = btn.dataset.action;
  const quantityInput = btn.parentElement.querySelector('.quantity-input');
  let currentValue = parseInt(quantityInput.value);
  
  if (action === 'increase') {
    currentValue += 1;
  } else if (action === 'decrease' && currentValue > 1) {
    currentValue -= 1;
  }
  
  quantityInput.value = currentValue;
  
  // If on cart page, update cart
  if (document.querySelector('.cart-page')) {
    const cartItem = btn.closest('.cart-item');
    const productId = cartItem.dataset.id;
    updateCartItemQuantity(productId, currentValue);
  }
}

function updateCartItemQuantity(productId, quantity) {
  let cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  const productIndex = cart.findIndex(item => item.id === productId);
  
  if (productIndex !== -1) {
    cart[productIndex].quantity = quantity;
    localStorage.setItem('egzone_cart', JSON.stringify(cart));
    
    // Update subtotal
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    const price = cart[productIndex].price;
    const subtotal = price * quantity;
    
    cartItem.querySelector('.cart-item-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    
    // Update cart totals
    updateCartTotals();
  }
}

function updateCartTotals() {
  const cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0; // Example shipping cost
  const total = subtotal + shipping;
  
  document.querySelector('.cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector('.cart-shipping').textContent = `$${shipping.toFixed(2)}`;
  document.querySelector('.cart-total').textContent = `$${total.toFixed(2)}`;
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
      <p>${message}</p>
    </div>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // Auto hide after 3 seconds
  setTimeout(() => {
    hideNotification(notification);
  }, 3000);
  
  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    hideNotification(notification);
  });
}

function hideNotification(notification) {
  notification.classList.remove('show');
  
  // Remove from DOM after animation
  setTimeout(() => {
    notification.remove();
  }, 300);
}

function highlightCurrentPage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-menu a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    if (currentPath === linkPath || 
        (currentPath.includes(linkPath) && linkPath !== '/')) {
      link.classList.add('active');
    }
  });
}
