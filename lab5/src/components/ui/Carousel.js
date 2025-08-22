import React, { useState, useEffect } from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Carousel.css';

const Carousel = ({ images, autoPlay = true, interval = 3000 }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, images.length]);

  return (
    <div className="carousel-container">
      <BootstrapCarousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={true}
        controls={true}
        interval={autoPlay ? interval : null}
        pause="hover"
        className="custom-carousel"
      >
        {images.map((image, idx) => (
          <BootstrapCarousel.Item key={idx}>
            <div className="carousel-item-wrapper">
              <img
                className="d-block w-100 carousel-image"
                src={image.src}
                alt={image.alt}
              />
              <BootstrapCarousel.Caption className="carousel-caption">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </BootstrapCarousel.Caption>
            </div>
          </BootstrapCarousel.Item>
        ))}
      </BootstrapCarousel>
    </div>
  );
};

export default Carousel;
