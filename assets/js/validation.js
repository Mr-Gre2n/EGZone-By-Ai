// EgZone Online Store - Form Validation JavaScript

// Validation Functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  // At least 6 characters
  return password.length >= 6;
}

function validateName(name) {
  // At least 2 characters
  return name.length >= 2;
}

function validatePhone(phone) {
  // Simple phone validation (numbers, spaces, dashes, parentheses)
  const phoneRegex = /^[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/[\s\-()]/g, '').length >= 10;
}

function validateZip(zip) {
  // Simple zip code validation (5 digits or 5+4 format)
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

function validateCreditCard(cardNumber) {
  // Remove spaces and dashes
  const cleanNumber = cardNumber.replace(/[\s\-]/g, '');
  
  // Check if it contains only digits
  if (!/^\d+$/.test(cleanNumber)) return false;
  
  // Check length (most cards are 13-19 digits)
  if (cleanNumber.length < 13 || cleanNumber.length > 19) return false;
  
  // Luhn algorithm (checksum)
  let sum = 0;
  let double = false;
  
  // Loop from right to left
  for (let i = cleanNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanNumber.charAt(i));
    
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    
    sum += digit;
    double = !double;
  }
  
  return sum % 10 === 0;
}

function validateCVV(cvv) {
  // 3 or 4 digits
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
}

function validateExpiryDate(month, year) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // January is 0
  
  // Convert to numbers
  const expMonth = parseInt(month);
  const expYear = parseInt(year);
  
  // Check if month is valid (1-12)
  if (expMonth < 1 || expMonth > 12) return false;
  
  // Check if year is valid (current year or future)
  if (expYear < currentYear) return false;
  
  // If it's the current year, check if the month is valid
  if (expYear === currentYear && expMonth < currentMonth) return false;
  
  return true;
}

function validateUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

function validatePrice(price) {
  // Positive number with up to 2 decimal places
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return priceRegex.test(price) && parseFloat(price) > 0;
}

// Form Validation Functions
function validateLoginForm(email, password) {
  const errors = {};
  
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!password) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateSignupForm(name, email, password, confirmPassword) {
  const errors = {};
  
  if (!name) {
    errors.name = 'Name is required';
  } else if (!validateName(name)) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!password) {
    errors.password = 'Password is required';
  } else if (!validatePassword(password)) {
    errors.password = 'Password must be at least 6 characters';
  }
  
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateCheckoutForm(name, email, address, city, zip, country, paymentMethod) {
  const errors = {};
  
  if (!name) {
    errors.name = 'Name is required';
  } else if (!validateName(name)) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!address) {
    errors.address = 'Address is required';
  } else if (address.length < 5) {
    errors.address = 'Please enter a valid address';
  }
  
  if (!city) {
    errors.city = 'City is required';
  } else if (city.length < 2) {
    errors.city = 'Please enter a valid city';
  }
  
  if (!zip) {
    errors.zip = 'ZIP code is required';
  } else if (!validateZip(zip)) {
    errors.zip = 'Please enter a valid ZIP code';
  }
  
  if (!country) {
    errors.country = 'Country is required';
  }
  
  if (!paymentMethod) {
    errors.paymentMethod = 'Please select a payment method';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validatePaymentForm(cardNumber, cardName, expiryMonth, expiryYear, cvv) {
  const errors = {};
  
  if (!cardNumber) {
    errors.cardNumber = 'Card number is required';
  } else if (!validateCreditCard(cardNumber)) {
    errors.cardNumber = 'Please enter a valid card number';
  }
  
  if (!cardName) {
    errors.cardName = 'Cardholder name is required';
  } else if (!validateName(cardName)) {
    errors.cardName = 'Please enter a valid name';
  }
  
  if (!expiryMonth || !expiryYear) {
    errors.expiry = 'Expiry date is required';
  } else if (!validateExpiryDate(expiryMonth, expiryYear)) {
    errors.expiry = 'Please enter a valid expiry date';
  }
  
  if (!cvv) {
    errors.cvv = 'CVV is required';
  } else if (!validateCVV(cvv)) {
    errors.cvv = 'Please enter a valid CVV';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateProductForm(name, category, price, image, description, features, stock) {
  const errors = {};
  
  if (!name) {
    errors.name = 'Product name is required';
  } else if (name.length < 3) {
    errors.name = 'Product name must be at least 3 characters';
  }
  
  if (!category) {
    errors.category = 'Category is required';
  }
  
  if (!price) {
    errors.price = 'Price is required';
  } else if (!validatePrice(price)) {
    errors.price = 'Please enter a valid price';
  }
  
  if (!image) {
    errors.image = 'Image URL is required';
  } else if (!validateUrl(image)) {
    errors.image = 'Please enter a valid URL';
  }
  
  if (!description) {
    errors.description = 'Description is required';
  } else if (description.length < 10) {
    errors.description = 'Description must be at least 10 characters';
  }
  
  if (!features || features.length === 0) {
    errors.features = 'At least one feature is required';
  }
  
  if (!stock) {
    errors.stock = 'Stock is required';
  } else if (isNaN(stock) || parseInt(stock) < 0) {
    errors.stock = 'Please enter a valid stock number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateContactForm(name, email, subject, message) {
  const errors = {};
  
  if (!name) {
    errors.name = 'Name is required';
  } else if (!validateName(name)) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!email) {
    errors.email = 'Email is required';
  } else if (!validateEmail(email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!subject) {
    errors.subject = 'Subject is required';
  } else if (subject.length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }
  
  if (!message) {
    errors.message = 'Message is required';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// DOM Validation Functions
function showInputError(input, message) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.form-error');
  
  input.classList.add('error');
  
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  } else {
    const newErrorElement = document.createElement('div');
    newErrorElement.className = 'form-error';
    newErrorElement.textContent = message;
    formGroup.appendChild(newErrorElement);
  }
}

function clearInputError(input) {
  const formGroup = input.closest('.form-group');
  const errorElement = formGroup.querySelector('.form-error');
  
  input.classList.remove('error');
  
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
  }
}

function validateFormInput(input, validationFunction) {
  const value = input.value.trim();
  const isValid = validationFunction(value);
  
  if (!isValid) {
    showInputError(input, input.dataset.errorMessage || 'Invalid input');
  } else {
    clearInputError(input);
  }
  
  return isValid;
}

// Initialize form validation
document.addEventListener('DOMContentLoaded', () => {
  // Add validation to inputs with data-validate attribute
  const validationInputs = document.querySelectorAll('[data-validate]');
  
  validationInputs.forEach(input => {
    const validationType = input.dataset.validate;
    let validationFunction;
    
    switch (validationType) {
      case 'email':
        validationFunction = validateEmail;
        break;
      case 'password':
        validationFunction = validatePassword;
        break;
      case 'name':
        validationFunction = validateName;
        break;
      case 'phone':
        validationFunction = validatePhone;
        break;
      case 'zip':
        validationFunction = validateZip;
        break;
      case 'creditCard':
        validationFunction = validateCreditCard;
        break;
      case 'cvv':
        validationFunction = validateCVV;
        break;
      case 'url':
        validationFunction = validateUrl;
        break;
      case 'price':
        validationFunction = validatePrice;
        break;
      default:
        validationFunction = value => value.length > 0;
    }
    
    // Validate on blur
    input.addEventListener('blur', () => {
      validateFormInput(input, validationFunction);
    });
    
    // Clear error on focus
    input.addEventListener('focus', () => {
      clearInputError(input);
    });
  });
});
