// EgZone Online Store - Cart JavaScript

// DOM Elements
const cartContainer = document.querySelector('.cart-items');
const cartSummary = document.querySelector('.cart-summary');
const checkoutForm = document.getElementById('checkout-form');
const emptyCartMessage = document.querySelector('.empty-cart');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Render cart items
  if (cartContainer) {
    renderCart();
  }
  
  // Checkout form
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckout);
  }
});

// Functions
function renderCart() {
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  // Check if cart is empty
  if (cart.length === 0) {
    if (emptyCartMessage) {
      emptyCartMessage.style.display = 'block';
    }
    
    if (cartContainer) {
      cartContainer.style.display = 'none';
    }
    
    if (cartSummary) {
      cartSummary.style.display = 'none';
    }
    
    return;
  }
  
  // Hide empty cart message
  if (emptyCartMessage) {
    emptyCartMessage.style.display = 'none';
  }
  
  // Show cart container and summary
  if (cartContainer) {
    cartContainer.style.display = 'block';
  }
  
  if (cartSummary) {
    cartSummary.style.display = 'block';
  }
  
  // Clear cart container
  cartContainer.innerHTML = '';
  
  // Render cart items
  cart.forEach(item => {
    const cartItem = createCartItem(item);
    cartContainer.appendChild(cartItem);
  });
  
  // Update cart totals
  updateCartTotals();
}

function createCartItem(item) {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';
  cartItem.dataset.id = item.id;
  
  cartItem.innerHTML = `
    <div class="cart-item-image">
      <img src="${item.image}" alt="${item.name}">
    </div>
    <div class="cart-item-details">
      <h3 class="cart-item-title">${item.name}</h3>
      <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      <div class="cart-item-quantity">
        <button class="quantity-btn" data-action="decrease">-</button>
        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
        <button class="quantity-btn" data-action="increase">+</button>
      </div>
    </div>
    <div class="cart-item-subtotal">$${(item.price * item.quantity).toFixed(2)}</div>
    <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
  `;
  
  // Add event listeners
  const quantityBtns = cartItem.querySelectorAll('.quantity-btn');
  const quantityInput = cartItem.querySelector('.quantity-input');
  const removeBtn = cartItem.querySelector('.cart-item-remove');
  
  quantityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      let currentValue = parseInt(quantityInput.value);
      
      if (action === 'increase') {
        currentValue += 1;
      } else if (action === 'decrease' && currentValue > 1) {
        currentValue -= 1;
      }
      
      quantityInput.value = currentValue;
      updateCartItemQuantity(item.id, currentValue);
    });
  });
  
  quantityInput.addEventListener('change', () => {
    let value = parseInt(quantityInput.value);
    
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    
    quantityInput.value = value;
    updateCartItemQuantity(item.id, value);
  });
  
  removeBtn.addEventListener('click', () => {
    removeCartItem(item.id);
  });
  
  return cartItem;
}

function updateCartItemQuantity(productId, quantity) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  // Find product in cart
  const productIndex = cart.findIndex(item => item.id === productId);
  
  if (productIndex !== -1) {
    // Update quantity
    cart[productIndex].quantity = quantity;
    
    // Save to localStorage
    localStorage.setItem('egzone_cart', JSON.stringify(cart));
    
    // Update subtotal
    const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
    const price = cart[productIndex].price;
    const subtotal = price * quantity;
    
    cartItem.querySelector('.cart-item-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    
    // Update cart totals
    updateCartTotals();
    
    // Update cart count
    updateCartCount();
  }
}

function removeCartItem(productId) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  // Remove product from cart
  cart = cart.filter(item => item.id !== productId);
  
  // Save to localStorage
  localStorage.setItem('egzone_cart', JSON.stringify(cart));
  
  // Remove cart item from DOM
  const cartItem = document.querySelector(`.cart-item[data-id="${productId}"]`);
  cartItem.remove();
  
  // Update cart totals
  updateCartTotals();
  
  // Update cart count
  updateCartCount();
  
  // Check if cart is empty
  if (cart.length === 0) {
    if (emptyCartMessage) {
      emptyCartMessage.style.display = 'block';
    }
    
    if (cartContainer) {
      cartContainer.style.display = 'none';
    }
    
    if (cartSummary) {
      cartSummary.style.display = 'none';
    }
  }
}

function updateCartTotals() {
  if (!cartSummary) return;
  
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0; // Example shipping cost
  const total = subtotal + shipping;
  
  // Update DOM
  cartSummary.querySelector('.cart-subtotal-value').textContent = `$${subtotal.toFixed(2)}`;
  cartSummary.querySelector('.cart-shipping-value').textContent = `$${shipping.toFixed(2)}`;
  cartSummary.querySelector('.cart-total-value').textContent = `$${total.toFixed(2)}`;
}

function handleCheckout(e) {
  e.preventDefault();
  
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('egzone_current_user'));
  if (!currentUser || !currentUser.isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  
  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  // Check if cart is empty
  if (cart.length === 0) {
    showNotification('Your cart is empty', 'error');
    return;
  }
  
  // Get form data
  const name = document.getElementById('checkout-name').value;
  const email = document.getElementById('checkout-email').value;
  const address = document.getElementById('checkout-address').value;
  const city = document.getElementById('checkout-city').value;
  const zip = document.getElementById('checkout-zip').value;
  const country = document.getElementById('checkout-country').value;
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
  
  // Validate form
  if (!name || !email || !address || !city || !zip || !country || !paymentMethod) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  // Create order
  const order = {
    id: generateOrderId(),
    userId: currentUser.id,
    items: cart,
    shipping: {
      name,
      email,
      address,
      city,
      zip,
      country
    },
    payment: {
      method: paymentMethod
    },
    status: 'pending',
    date: new Date().toISOString(),
    total: cart.reduce((total, item) => total + (item.price * item.quantity), 0) + 10 // Including shipping
  };
  
  // Get orders from localStorage
  let orders = JSON.parse(localStorage.getItem('egzone_orders')) || [];
  
  // Add new order
  orders.push(order);
  
  // Save to localStorage
  localStorage.setItem('egzone_orders', JSON.stringify(orders));
  
  // Clear cart
  localStorage.setItem('egzone_cart', JSON.stringify([]));
  
  // Show success message
  showNotification('Order placed successfully!', 'success');
  
  // Redirect to confirmation page
  setTimeout(() => {
    window.location.href = 'order-confirmation.html?id=' + order.id;
  }, 1500);
}

function generateOrderId() {
  return 'order-' + Math.random().toString(36).substring(2, 10);
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
