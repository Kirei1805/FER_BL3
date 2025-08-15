import React from 'react';
import { Carousel } from 'react-bootstrap';

const HeroCarousel = () => {
  const carouselItems = [
    {
      id: 1,
      image: '/image/movie1.jpg',
      title: 'Galactic Wars',
      description: 'Epic space battles decide the fate of a fractured galaxy'
    },
    {
      id: 2,
      image: '/image/movie2.jpg',
      title: 'Laugh Out Loud',
      description: 'A feel-good comedy about friendship and second chances'
    },
    {
      id: 3,
      image: '/image/movie3.jpg',
      title: 'Deep Blue',
      description: 'A gripping survival drama set far from shore'
    }
  ];

  return (
    <Carousel className="mb-4" interval={5000} pause="hover">
      {carouselItems.map((item) => (
        <Carousel.Item key={item.id}>
          <div 
            className="d-block w-100" 
            style={{
              height: '400px',
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          <Carousel.Caption className="bg-dark bg-opacity-75 rounded p-3">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroCarousel;
