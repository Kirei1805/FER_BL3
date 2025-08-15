import React from 'react';
import PropTypes from 'prop-types';
import { Card, Badge, Button, Modal } from 'react-bootstrap';
import { Heart, HeartFill, InfoCircle } from 'react-bootstrap-icons';

const MovieCard = ({ 
  movie, 
  isFavourite, 
  onToggleFavourite, 
  showToast 
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleAddToFavourites = () => {
    onToggleFavourite(movie.id);
    if (!isFavourite) {
      showToast('Added to favourites!', 'success');
    }
  };

  const getGenreBadgeVariant = (genre) => {
    const variants = {
      'Action': 'danger',
      'Comedy': 'warning',
      'Drama': 'info',
      'Horror': 'dark',
      'Romance': 'pink',
      'Sci-Fi': 'primary',
      'Thriller': 'secondary',
      'Animation': 'success',
      'Fantasy': 'purple'
    };
    return variants[genre] || 'light';
  };

  return (
    <>
             <Card className="h-100 movie-card" style={{ transition: 'transform 0.2s' }}>
                   <Card.Img 
            variant="top" 
            src={movie.poster} 
            alt={movie.title}
            style={{ height: '280px', objectFit: 'cover' }}
          />
        <Card.Body className="d-flex flex-column">
                     <Card.Title className="fw-bold fs-6">{movie.title}</Card.Title>
           <Card.Text className="text-muted small mb-3 text-white">
             {movie.description.length > 80 
               ? `${movie.description.substring(0, 80)}...` 
               : movie.description
             }
           </Card.Text>
          
                     <div className="mb-2">
             <Badge bg={getGenreBadgeVariant(movie.genre)} className="me-1 small">
               {movie.genre}
             </Badge>
             <small className="movie-info d-block mt-1">
               {movie.year} • {movie.country} • {movie.duration} min
             </small>
           </div>
          
                     <div className="mt-auto d-flex gap-1">
             <Button 
               variant={isFavourite ? "outline-danger" : "outline-primary"}
               size="sm"
               onClick={handleAddToFavourites}
               className="flex-fill"
             >
               {isFavourite ? <HeartFill /> : <Heart />} 
               {isFavourite ? ' Remove' : ' Add'}
             </Button>
             <Button 
               variant="outline-secondary" 
               size="sm"
               onClick={() => setShowModal(true)}
             >
               <InfoCircle />
             </Button>
           </div>
        </Card.Body>
      </Card>

      {/* Movie Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-4">
              <img 
                src={movie.poster} 
                alt={movie.title}
                className="img-fluid rounded"
              />
            </div>
            <div className="col-md-8">
              <h5>Description</h5>
              <p>{movie.description}</p>
              
              <div className="row">
                <div className="col-6">
                  <strong>Year:</strong> {movie.year}
                </div>
                <div className="col-6">
                  <strong>Country:</strong> {movie.country}
                </div>
                <div className="col-6">
                  <strong>Duration:</strong> {movie.duration} minutes
                </div>
                <div className="col-6">
                  <strong>Genre:</strong> 
                  <Badge bg={getGenreBadgeVariant(movie.genre)} className="ms-1">
                    {movie.genre}
                  </Badge>
                </div>
              </div>
              
              <h6 className="mt-3">Showtimes</h6>
              <p className="text-muted">
                Showtimes will be available soon. Please check back later.
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    country: PropTypes.string.isRequired
  }).isRequired,
  isFavourite: PropTypes.bool.isRequired,
  onToggleFavourite: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default MovieCard;
