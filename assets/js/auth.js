// EgZone Online Store - Authentication JavaScript

// DOM Elements
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  checkAuthStatus();
  
  // Login form
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  // Signup form
  if (signupForm) {
    signupForm.addEventListener('submit', handleSignup);
  }
  
  // Logout button
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
});

// Functions
function handleLogin(e) {
  e.preventDefault();
  
  // Get form data
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const rememberMe = document.getElementById('remember-me').checked;
  
  // Validate form
  if (!email || !password) {
    showFormError(loginForm, 'Please fill in all fields');
    return;
  }
  
  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('egzone_users')) || [];
  
  // Find user
  const user = users.find(u => u.email === email);
  
  // Check if user exists and password is correct
  if (!user || user.password !== password) {
    showFormError(loginForm, 'Invalid email or password');
    return;
  }
  
  // Login successful
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    isLoggedIn: true
  };
  
  // Save to localStorage
  localStorage.setItem('egzone_current_user', JSON.stringify(userData));
  
  // Redirect to home page
  window.location.href = 'index.html';
}

function handleSignup(e) {
  e.preventDefault();
  
  // Get form data
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;
  
  // Validate form
  if (!name || !email || !password || !confirmPassword) {
    showFormError(signupForm, 'Please fill in all fields');
    return;
  }
  
  if (password !== confirmPassword) {
    showFormError(signupForm, 'Passwords do not match');
    return;
  }
  
  if (password.length < 6) {
    showFormError(signupForm, 'Password must be at least 6 characters');
    return;
  }
  
  // Get users from localStorage
  let users = JSON.parse(localStorage.getItem('egzone_users')) || [];
  
  // Check if email already exists
  if (users.some(user => user.email === email)) {
    showFormError(signupForm, 'Email already exists');
    return;
  }
  
  // Create new user
  const newUser = {
    id: generateUserId(),
    name,
    email,
    password,
    createdAt: new Date().toISOString()
  };
  
  // Add to users array
  users.push(newUser);
  
  // Save to localStorage
  localStorage.setItem('egzone_users', JSON.stringify(users));
  
  // Auto login
  const userData = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    isLoggedIn: true
  };
  
  localStorage.setItem('egzone_current_user', JSON.stringify(userData));
  
  // Redirect to home page
  window.location.href = 'index.html';
}

function handleLogout(e) {
  e.preventDefault();
  
  // Remove user from localStorage
  localStorage.removeItem('egzone_current_user');
  
  // Redirect to home page
  window.location.href = 'index.html';
}

function checkAuthStatus() {
  const currentUser = JSON.parse(localStorage.getItem('egzone_current_user'));
  const authLinks = document.querySelector('.auth-links');
  const userDropdown = document.querySelector('.user-dropdown');
  
  if (currentUser && currentUser.isLoggedIn) {
    // User is logged in
    if (authLinks) {
      authLinks.style.display = 'none';
    }
    
    if (userDropdown) {
      userDropdown.style.display = 'block';
      const userNameElement = userDropdown.querySelector('.user-name');
      if (userNameElement) {
        userNameElement.textContent = currentUser.name;
      }
    }
    
    // Redirect if on login or signup page
    const currentPath = window.location.pathname;
    if (currentPath.includes('login.html') || currentPath.includes('signup.html')) {
      window.location.href = 'index.html';
    }
  } else {
    // User is not logged in
    if (authLinks) {
      authLinks.style.display = 'flex';
    }
    
    if (userDropdown) {
      userDropdown.style.display = 'none';
    }
    
    // Redirect if on protected pages
    const currentPath = window.location.pathname;
    const protectedPages = ['profile.html', 'add-product.html', 'checkout.html'];
    
    if (protectedPages.some(page => currentPath.includes(page))) {
      window.location.href = 'login.html';
    }
  }
}

function showFormError(form, message) {
  const errorElement = form.querySelector('.form-error');
  
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  } else {
    const newErrorElement = document.createElement('div');
    newErrorElement.className = 'alert alert-error';
    newErrorElement.textContent = message;
    form.prepend(newErrorElement);
  }
}

function generateUserId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
