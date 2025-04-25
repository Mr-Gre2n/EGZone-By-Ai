// EgZone Online Store - Local Storage JavaScript

// Local Storage Keys
const STORAGE_KEYS = {
  USERS: 'egzone_users',
  CURRENT_USER: 'egzone_current_user',
  PRODUCTS: 'egzone_products',
  CART: 'egzone_cart',
  ORDERS: 'egzone_orders',
  WISHLIST: 'egzone_wishlist'
};

// Functions
function getFromStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || null;
  } catch (error) {
    console.error(`Error getting ${key} from localStorage:`, error);
    return null;
  }
}

function saveToStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
}

function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
}

function clearStorage() {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing localStorage:', error);
    return false;
  }
}

// User Functions
function getCurrentUser() {
  return getFromStorage(STORAGE_KEYS.CURRENT_USER);
}

function isLoggedIn() {
  const currentUser = getCurrentUser();
  return currentUser && currentUser.isLoggedIn;
}

function getUsers() {
  return getFromStorage(STORAGE_KEYS.USERS) || [];
}

function getUserById(userId) {
  const users = getUsers();
  return users.find(user => user.id === userId);
}

function saveUser(user) {
  const users = getUsers();
  const existingUserIndex = users.findIndex(u => u.id === user.id);
  
  if (existingUserIndex !== -1) {
    users[existingUserIndex] = user;
  } else {
    users.push(user);
  }
  
  return saveToStorage(STORAGE_KEYS.USERS, users);
}

function deleteUser(userId) {
  const users = getUsers();
  const updatedUsers = users.filter(user => user.id !== userId);
  return saveToStorage(STORAGE_KEYS.USERS, updatedUsers);
}

// Product Functions
function getProducts() {
  return getFromStorage(STORAGE_KEYS.PRODUCTS) || [];
}

function getProductById(productId) {
  const products = getProducts();
  return products.find(product => product.id === productId);
}

function getProductsByCategory(category) {
  const products = getProducts();
  return products.filter(product => product.category === category);
}

function saveProduct(product) {
  const products = getProducts();
  const existingProductIndex = products.findIndex(p => p.id === product.id);
  
  if (existingProductIndex !== -1) {
    products[existingProductIndex] = product;
  } else {
    products.push(product);
  }
  
  return saveToStorage(STORAGE_KEYS.PRODUCTS, products);
}

function deleteProduct(productId) {
  const products = getProducts();
  const updatedProducts = products.filter(product => product.id !== productId);
  return saveToStorage(STORAGE_KEYS.PRODUCTS, updatedProducts);
}

// Cart Functions
function getCart() {
  return getFromStorage(STORAGE_KEYS.CART) || [];
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}

function addToCart(product, quantity = 1) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }
  
  return saveToStorage(STORAGE_KEYS.CART, cart);
}

function updateCartItemQuantity(productId, quantity) {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === productId);
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity = quantity;
    return saveToStorage(STORAGE_KEYS.CART, cart);
  }
  
  return false;
}

function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  return saveToStorage(STORAGE_KEYS.CART, updatedCart);
}

function clearCart() {
  return saveToStorage(STORAGE_KEYS.CART, []);
}

// Order Functions
function getOrders() {
  return getFromStorage(STORAGE_KEYS.ORDERS) || [];
}

function getOrderById(orderId) {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
}

function getUserOrders(userId) {
  const orders = getOrders();
  return orders.filter(order => order.userId === userId);
}

function saveOrder(order) {
  const orders = getOrders();
  const existingOrderIndex = orders.findIndex(o => o.id === order.id);
  
  if (existingOrderIndex !== -1) {
    orders[existingOrderIndex] = order;
  } else {
    orders.push(order);
  }
  
  return saveToStorage(STORAGE_KEYS.ORDERS, orders);
}

function deleteOrder(orderId) {
  const orders = getOrders();
  const updatedOrders = orders.filter(order => order.id !== orderId);
  return saveToStorage(STORAGE_KEYS.ORDERS, updatedOrders);
}

// Wishlist Functions
function getWishlist() {
  return getFromStorage(STORAGE_KEYS.WISHLIST) || [];
}

function addToWishlist(product) {
  const wishlist = getWishlist();
  
  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    return saveToStorage(STORAGE_KEYS.WISHLIST, wishlist);
  }
  
  return false;
}

function removeFromWishlist(productId) {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  return saveToStorage(STORAGE_KEYS.WISHLIST, updatedWishlist);
}

function isInWishlist(productId) {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
}

function clearWishlist() {
  return saveToStorage(STORAGE_KEYS.WISHLIST, []);
}
