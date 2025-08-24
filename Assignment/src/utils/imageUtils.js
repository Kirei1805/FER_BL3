// Utility functions for handling images

// Get image URL with proper encoding
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Encode the image path to handle spaces and special characters
  return encodeImageUrl(imagePath);
};

// Encode image URL to handle spaces and special characters
export const encodeImageUrl = (imagePath) => {
  if (!imagePath) return '/images/placeholder.jpg';
  
  // Split the path and encode each part
  const parts = imagePath.split('/');
  const encodedParts = parts.map(part => encodeURIComponent(part));
  
  return encodedParts.join('/');
};

// Handle image loading errors
export const handleImageError = (event) => {
  console.error(`Failed to load image: ${event.target.src}`);
  event.target.src = '/images/placeholder.jpg';
  event.target.alt = 'Image not found';
};

// Get placeholder image
export const getPlaceholderImage = () => {
  return '/images/placeholder.jpg';
};

