// EgZone Online Store - Image Handler JavaScript

// Function to handle image loading errors
function handleImageError(img, category = null) {
  // Default fallback image
  let fallbackImage = 'assets/images/fallback/placeholder.jpg';
  
  // Category-specific fallback images
  if (category) {
    if (category.toLowerCase() === 'smartphones') {
      fallbackImage = 'assets/images/fallback/smartphone.jpg';
    } else if (category.toLowerCase() === 'computers') {
      fallbackImage = 'assets/images/fallback/computer.jpg';
    } else if (category.toLowerCase() === 'accessories') {
      fallbackImage = 'assets/images/fallback/accessory.jpg';
    }
  }
  
  // Set the fallback image
  img.src = fallbackImage;
  
  // Remove onerror to prevent infinite loop
  img.onerror = null;
}

// Function to preload images
function preloadProductImages() {
  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem('egzone_products')) || [];
  
  // Preload product images
  products.forEach(product => {
    const img = new Image();
    img.src = product.image;
    img.onerror = () => {
      console.warn(`Failed to load image for ${product.name}. Using fallback.`);
      // Update the product image in localStorage with fallback
      updateProductImageWithFallback(product.id, product.category);
    };
  });
}

// Function to update product image with fallback in localStorage
function updateProductImageWithFallback(productId, category) {
  // Get products from localStorage
  const products = JSON.parse(localStorage.getItem('egzone_products')) || [];
  
  // Find the product
  const product = products.find(p => p.id === productId);
  
  if (product) {
    // Default fallback image
    let fallbackImage = 'assets/images/fallback/placeholder.jpg';
    
    // Category-specific fallback images
    if (category) {
      if (category.toLowerCase() === 'smartphones') {
        fallbackImage = 'assets/images/fallback/smartphone.jpg';
      } else if (category.toLowerCase() === 'computers') {
        fallbackImage = 'assets/images/fallback/computer.jpg';
      } else if (category.toLowerCase() === 'accessories') {
        fallbackImage = 'assets/images/fallback/accessory.jpg';
      }
    }
    
    // Update the product image
    product.image = fallbackImage;
    
    // Save updated products to localStorage
    localStorage.setItem('egzone_products', JSON.stringify(products));
  }
}

// Initialize image handling
document.addEventListener('DOMContentLoaded', () => {
  // Preload product images
  preloadProductImages();
  
  // Add error handling to all product images
  document.querySelectorAll('.product-card-image img, .product-image img').forEach(img => {
    img.onerror = function() {
      // Get the product category from the closest product card
      const productCard = this.closest('.product-card');
      let category = null;
      
      if (productCard) {
        const categoryElement = productCard.querySelector('.product-card-category');
        if (categoryElement) {
          category = categoryElement.textContent;
        }
      }
      
      handleImageError(this, category);
    };
  });
  
  // Add error handling to category images
  document.querySelectorAll('.category-image img').forEach(img => {
    img.onerror = function() {
      // Get the category from the alt attribute
      const category = this.alt;
      handleImageError(this, category);
    };
  });
});
