// EgZone Online Store - Profile JavaScript

// DOM Elements
const profileTabs = document.querySelectorAll('.profile-tab');
const profileMenuLinks = document.querySelectorAll('.profile-menu a');
const profileUsername = document.querySelector('.profile-username');
const profileEmail = document.querySelector('.profile-email');
const profileEditForm = document.getElementById('profile-edit-form');
const editInfoBtn = document.querySelector('.edit-info-btn');
const cancelEditBtn = document.querySelector('.cancel-edit-btn');
const profileInfoView = document.querySelector('.profile-info-view');
const profileInfoEdit = document.querySelector('.profile-info-edit');
const changePasswordForm = document.getElementById('change-password-form');
const savePreferencesBtn = document.querySelector('.save-preferences-btn');
const deleteAccountBtn = document.querySelector('.delete-account-btn');
const ordersContainer = document.querySelector('.orders-container');
const noOrdersMessage = document.querySelector('.no-orders-message');
const wishlistGrid = document.querySelector('.wishlist-grid');
const noWishlistMessage = document.querySelector('.no-wishlist-message');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const currentUser = getCurrentUser();
  
  if (!currentUser || !currentUser.isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  
  // Initialize profile page
  initProfilePage();
  
  // Tab navigation
  profileMenuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
    });
  });
  
  // Check for URL hash
  if (window.location.hash) {
    const tabId = window.location.hash.substring(1);
    switchTab(tabId);
  }
  
  // Edit profile info
  if (editInfoBtn) {
    editInfoBtn.addEventListener('click', toggleEditMode);
  }
  
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', toggleEditMode);
  }
  
  // Profile edit form
  if (profileEditForm) {
    profileEditForm.addEventListener('submit', handleProfileUpdate);
  }
  
  // Change password form
  if (changePasswordForm) {
    changePasswordForm.addEventListener('submit', handlePasswordChange);
  }
  
  // Save preferences
  if (savePreferencesBtn) {
    savePreferencesBtn.addEventListener('click', handlePreferencesUpdate);
  }
  
  // Delete account
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', handleAccountDelete);
  }
});

// Functions
function initProfilePage() {
  // Get current user
  const currentUser = getCurrentUser();
  const fullUser = getUserById(currentUser.id);
  
  // Update profile sidebar
  if (profileUsername) {
    profileUsername.textContent = currentUser.name;
  }
  
  if (profileEmail) {
    profileEmail.textContent = currentUser.email;
  }
  
  // Update profile info
  document.getElementById('profile-name').textContent = currentUser.name;
  document.getElementById('profile-email').textContent = currentUser.email;
  
  // Set form values
  document.getElementById('edit-name').value = currentUser.name;
  document.getElementById('edit-email').value = currentUser.email;
  
  // Set additional profile info if available
  if (fullUser) {
    if (fullUser.phone) {
      document.getElementById('profile-phone').textContent = fullUser.phone;
      document.getElementById('edit-phone').value = fullUser.phone;
    }
    
    if (fullUser.address) {
      document.getElementById('profile-address').textContent = fullUser.address;
      document.getElementById('edit-address').value = fullUser.address;
    }
    
    if (fullUser.city) {
      document.getElementById('profile-city').textContent = fullUser.city;
      document.getElementById('edit-city').value = fullUser.city;
    }
    
    if (fullUser.country) {
      document.getElementById('profile-country').textContent = fullUser.country;
      document.getElementById('edit-country').value = fullUser.country;
    }
    
    // Set notification preferences if available
    if (fullUser.preferences) {
      document.getElementById('email-notifications').checked = fullUser.preferences.emailNotifications !== false;
      document.getElementById('marketing-emails').checked = fullUser.preferences.marketingEmails !== false;
    }
  }
  
  // Load orders
  loadOrders();
  
  // Load wishlist
  loadWishlist();
}

function switchTab(tabId) {
  // Hide all tabs
  profileTabs.forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remove active class from all menu links
  profileMenuLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Show selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add('active');
  }
  
  // Add active class to selected menu link
  const selectedLink = document.querySelector(`.profile-menu a[data-tab="${tabId}"]`);
  if (selectedLink) {
    selectedLink.classList.add('active');
  }
  
  // Update URL hash
  window.location.hash = tabId;
}

function toggleEditMode() {
  if (profileInfoView.style.display === 'none') {
    profileInfoView.style.display = 'block';
    profileInfoEdit.style.display = 'none';
    editInfoBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
  } else {
    profileInfoView.style.display = 'none';
    profileInfoEdit.style.display = 'block';
    editInfoBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
  }
}

function handleProfileUpdate(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('edit-name').value;
  const email = document.getElementById('edit-email').value;
  const phone = document.getElementById('edit-phone').value;
  const address = document.getElementById('edit-address').value;
  const city = document.getElementById('edit-city').value;
  const country = document.getElementById('edit-country').value;
  
  // Validate form
  if (!name || !email) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }
  
  // Get current user
  const currentUser = getCurrentUser();
  const users = getUsers();
  
  // Find user
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    showNotification('User not found', 'error');
    return;
  }
  
  // Check if email is already taken by another user
  if (email !== currentUser.email && users.some(u => u.email === email && u.id !== currentUser.id)) {
    showNotification('Email is already taken', 'error');
    return;
  }
  
  // Update user
  users[userIndex].name = name;
  users[userIndex].email = email;
  users[userIndex].phone = phone;
  users[userIndex].address = address;
  users[userIndex].city = city;
  users[userIndex].country = country;
  
  // Save to localStorage
  localStorage.setItem('egzone_users', JSON.stringify(users));
  
  // Update current user
  const userData = {
    id: currentUser.id,
    name: name,
    email: email,
    isLoggedIn: true
  };
  
  localStorage.setItem('egzone_current_user', JSON.stringify(userData));
  
  // Update profile info
  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-email').textContent = email;
  document.getElementById('profile-phone').textContent = phone || 'Not provided';
  document.getElementById('profile-address').textContent = address || 'Not provided';
  document.getElementById('profile-city').textContent = city || 'Not provided';
  document.getElementById('profile-country').textContent = country || 'Not provided';
  
  // Update profile sidebar
  if (profileUsername) {
    profileUsername.textContent = name;
  }
  
  if (profileEmail) {
    profileEmail.textContent = email;
  }
  
  // Update user dropdown in navbar
  const userNameElement = document.querySelector('.user-dropdown .user-name');
  if (userNameElement) {
    userNameElement.textContent = name;
  }
  
  // Show success message
  showNotification('Profile updated successfully', 'success');
  
  // Switch back to view mode
  toggleEditMode();
}

function handlePasswordChange(e) {
  e.preventDefault();
  
  // Get form data
  const currentPassword = document.getElementById('current-password').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  // Validate form
  if (!currentPassword || !newPassword || !confirmPassword) {
    showNotification('Please fill in all fields', 'error');
    return;
  }
  
  if (newPassword !== confirmPassword) {
    showNotification('Passwords do not match', 'error');
    return;
  }
  
  if (newPassword.length < 6) {
    showNotification('Password must be at least 6 characters', 'error');
    return;
  }
  
  // Get current user
  const currentUser = getCurrentUser();
  const users = getUsers();
  
  // Find user
  const user = users.find(u => u.id === currentUser.id);
  
  if (!user) {
    showNotification('User not found', 'error');
    return;
  }
  
  // Check if current password is correct
  if (user.password !== currentPassword) {
    showNotification('Current password is incorrect', 'error');
    return;
  }
  
  // Update password
  user.password = newPassword;
  
  // Save to localStorage
  localStorage.setItem('egzone_users', JSON.stringify(users));
  
  // Show success message
  showNotification('Password updated successfully', 'success');
  
  // Reset form
  changePasswordForm.reset();
}

function handlePreferencesUpdate() {
  // Get preferences
  const emailNotifications = document.getElementById('email-notifications').checked;
  const marketingEmails = document.getElementById('marketing-emails').checked;
  
  // Get current user
  const currentUser = getCurrentUser();
  const users = getUsers();
  
  // Find user
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    showNotification('User not found', 'error');
    return;
  }
  
  // Update preferences
  users[userIndex].preferences = {
    emailNotifications,
    marketingEmails
  };
  
  // Save to localStorage
  localStorage.setItem('egzone_users', JSON.stringify(users));
  
  // Show success message
  showNotification('Preferences updated successfully', 'success');
}

function handleAccountDelete() {
  // Confirm deletion
  if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    return;
  }
  
  // Get current user
  const currentUser = getCurrentUser();
  
  // Delete user
  deleteUser(currentUser.id);
  
  // Remove user from localStorage
  localStorage.removeItem('egzone_current_user');
  
  // Redirect to home page
  window.location.href = 'index.html';
}

function loadOrders() {
  // Get current user
  const currentUser = getCurrentUser();
  
  // Get user orders
  const orders = getUserOrders(currentUser.id);
  
  // Check if user has orders
  if (orders.length === 0) {
    if (noOrdersMessage) {
      noOrdersMessage.style.display = 'block';
    }
    return;
  }
  
  // Sort orders by date (newest first)
  orders.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Create order cards
  let orderCardsHTML = '';
  
  orders.forEach(order => {
    const orderDate = new Date(order.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    let orderItemsHTML = '';
    let orderTotal = 0;
    
    order.items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      orderTotal += itemTotal;
      
      orderItemsHTML += `
        <div class="order-item">
          <div class="order-item-image">
            <img src="${item.image}" alt="${item.name}" onerror="handleImageError(this)">
          </div>
          <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
          </div>
        </div>
      `;
    });
    
    let statusClass = '';
    switch (order.status) {
      case 'completed':
        statusClass = 'completed';
        break;
      case 'processing':
        statusClass = 'processing';
        break;
      case 'cancelled':
        statusClass = 'cancelled';
        break;
      default:
        statusClass = 'processing';
    }
    
    orderCardsHTML += `
      <div class="order-card">
        <div class="order-header">
          <div class="order-id">Order #${order.id}</div>
          <div class="order-date">${orderDate}</div>
          <div class="order-status ${statusClass}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
        </div>
        <div class="order-items">
          ${orderItemsHTML}
        </div>
        <div class="order-total">
          <div>Total:</div>
          <div>$${orderTotal.toFixed(2)}</div>
        </div>
        <div class="order-actions">
          <button class="btn btn-outline view-order-details" data-order-id="${order.id}">View Details</button>
        </div>
      </div>
    `;
  });
  
  // Update orders container
  ordersContainer.innerHTML = orderCardsHTML;
  
  // Add event listeners to view order details buttons
  const viewOrderButtons = document.querySelectorAll('.view-order-details');
  viewOrderButtons.forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.getAttribute('data-order-id');
      // TODO: Implement order details view
      alert(`View details for order #${orderId}`);
    });
  });
}

function loadWishlist() {
  // Get wishlist
  const wishlist = getWishlist();
  
  // Check if wishlist is empty
  if (wishlist.length === 0) {
    if (noWishlistMessage) {
      noWishlistMessage.style.display = 'block';
    }
    return;
  }
  
  // Create wishlist items
  let wishlistItemsHTML = '';
  
  wishlist.forEach(item => {
    wishlistItemsHTML += `
      <div class="wishlist-item" data-id="${item.id}">
        <button class="wishlist-item-remove" title="Remove from Wishlist">
          <i class="fas fa-times"></i>
        </button>
        <div class="wishlist-item-image">
          <img src="${item.image}" alt="${item.name}" onerror="handleImageError(this)">
        </div>
        <div class="wishlist-item-content">
          <h3 class="wishlist-item-title">
            <a href="product.html?id=${item.id}">${item.name}</a>
          </h3>
          <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
          <div class="wishlist-item-actions">
            <button class="wishlist-item-btn add-to-cart-btn" data-id="${item.id}">
              <i class="fas fa-shopping-cart"></i> Add to Cart
            </button>
          </div>
        </div>
      </div>
    `;
  });
  
  // Update wishlist grid
  wishlistGrid.innerHTML = wishlistItemsHTML;
  
  // Add event listeners to wishlist item buttons
  const removeButtons = document.querySelectorAll('.wishlist-item-remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const wishlistItem = button.closest('.wishlist-item');
      const productId = wishlistItem.getAttribute('data-id');
      removeFromWishlist(productId);
      wishlistItem.remove();
      
      // Check if wishlist is empty
      if (wishlistGrid.children.length === 0) {
        if (noWishlistMessage) {
          noWishlistMessage.style.display = 'block';
        }
      }
      
      showNotification('Item removed from wishlist', 'success');
    });
  });
  
  const addToCartButtons = document.querySelectorAll('.wishlist-item .add-to-cart-btn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = button.getAttribute('data-id');
      const product = getProductById(productId);
      
      if (product) {
        addToCart(product);
        showNotification('Item added to cart', 'success');
      }
    });
  });
}

function showNotification(message, type = 'info') {
  // Check if notification container exists
  let notificationContainer = document.querySelector('.notification-container');
  
  // Create notification container if it doesn't exist
  if (!notificationContainer) {
    notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    document.body.appendChild(notificationContainer);
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="notification-icon fas ${getNotificationIcon(type)}"></i>
      <div class="notification-message">${message}</div>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add notification to container
  notificationContainer.appendChild(notification);
  
  // Add event listener to close button
  const closeButton = notification.querySelector('.notification-close');
  closeButton.addEventListener('click', () => {
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 300);
  });
  
  // Auto close notification after 5 seconds
  setTimeout(() => {
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

function getNotificationIcon(type) {
  switch (type) {
    case 'success':
      return 'fa-check-circle';
    case 'error':
      return 'fa-exclamation-circle';
    case 'warning':
      return 'fa-exclamation-triangle';
    default:
      return 'fa-info-circle';
  }
}

// Add to cart function (simplified version)
function addToCart(product) {
  // Get cart from localStorage
  let cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  
  // Check if product is already in cart
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex !== -1) {
    // Increment quantity
    cart[existingProductIndex].quantity += 1;
  } else {
    // Add new product to cart
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
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('egzone_cart')) || [];
  const cartCount = document.querySelector('.cart-count');
  
  if (cartCount) {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}
