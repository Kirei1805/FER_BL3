import React, { useState, useEffect } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import './Carousel.css';

const Carousel = ({ images = [], autoPlay = true, interval = 4000 }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="carousel-placeholder">
        <div className="placeholder-content">
          <h3>🍽️ Chào mừng đến với Nhà hàng Delicious</h3>
          <p>Khám phá những món ăn độc đáo với hương vị tuyệt vời</p>
        </div>
      </div>
    );
  }

  return (
    <div className="custom-carousel">
      <BootstrapCarousel
        activeIndex={index}
        onSelect={handleSelect}
        interval={autoPlay ? interval : null}
        controls={images.length > 1}
        indicators={images.length > 1}
        pause="hover"
      >
        {images.map((image, idx) => (
          <BootstrapCarousel.Item key={idx}>
            <div className="carousel-image-container">
              <img
                className="d-block w-100 carousel-image"
                src={image.src || image.url || image}
                alt={image.alt || `Slide ${idx + 1}`}
              />
              {(image.title || image.description) && (
                <div className="carousel-caption">
                  {image.title && <h3>{image.title}</h3>}
                  {image.description && <p>{image.description}</p>}
                </div>
              )}
            </div>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;
