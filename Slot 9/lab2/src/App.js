import React, { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import NavigationBar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import SearchFilterBar from './components/SearchFilterBar';
import MovieCard from './components/MovieCard';
import MovieRequestForm from './components/MovieRequestForm';
import ToastNotification from './components/Toast';

// Data
import { movies, allGenres } from './data/movies';

function App() {
  // State management
  const [activePage, setActivePage] = useState('home');
  const [favourites, setFavourites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  // Load favourites from localStorage on component mount
  useEffect(() => {
    const savedFavourites = localStorage.getItem('movieFavourites');
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  // Save favourites to localStorage whenever favourites change
  useEffect(() => {
    localStorage.setItem('movieFavourites', JSON.stringify(favourites));
  }, [favourites]);

  // Filter and sort movies using useMemo for performance
  const filteredMovies = useMemo(() => {
    let filtered = movies;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by genre
    if (selectedGenre && selectedGenre !== 'All') {
      filtered = filtered.filter(movie => movie.genre === selectedGenre);
    }

    // Sort by duration
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'asc') {
          return a.duration - b.duration;
        } else {
          return b.duration - a.duration;
        }
      });
    }

    return filtered;
  }, [searchTerm, selectedGenre, sortBy]);

  // Get movies for current page
  const getCurrentPageMovies = () => {
    if (activePage === 'favourites') {
      return movies.filter(movie => favourites.includes(movie.id));
    }
    return filteredMovies;
  };

  // Toggle favourite
  const toggleFavourite = (movieId) => {
    setFavourites(prev => {
      if (prev.includes(movieId)) {
        return prev.filter(id => id !== movieId);
      } else {
        return [...prev, movieId];
      }
    });
  };

  // Show toast notification
  const showToast = (message, variant = 'success') => {
    setToast({ show: true, message, variant });
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    // In a real app, you would send this to an API
  };

  // Check if movie is favourite
  const isFavourite = (movieId) => favourites.includes(movieId);

  const currentMovies = getCurrentPageMovies();

  return (
    <div className="App">
      <NavigationBar activePage={activePage} onPageChange={setActivePage} />
      
      {/* Add top margin to account for fixed navbar */}
      <div style={{ marginTop: '76px' }}>
        <Container fluid>
          {/* Hero Carousel - only show on home page */}
          {activePage === 'home' && <HeroCarousel />}

          {/* Page Content */}
          {activePage === 'home' && (
            <>
              <SearchFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedGenre={selectedGenre}
                onGenreChange={setSelectedGenre}
                sortBy={sortBy}
                onSortChange={setSortBy}
                genres={allGenres}
                filteredCount={currentMovies.length}
              />

              {currentMovies.length === 0 ? (
                <Alert variant="info">
                  No movies found. Try adjusting your search or filter criteria.
                </Alert>
              ) : (
                <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-3">
                  {currentMovies.map(movie => (
                    <Col key={movie.id}>
                      <MovieCard
                        movie={movie}
                        isFavourite={isFavourite(movie.id)}
                        onToggleFavourite={toggleFavourite}
                        showToast={showToast}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}

          {activePage === 'favourites' && (
            <div className="py-4">
              <div className="page-header">
                <h2>My Favourite Movies</h2>
              </div>
              {currentMovies.length === 0 ? (
                <Alert variant="info">
                  No favourites yet. Add some movies to your favourites list!
                </Alert>
              ) : (
                <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-3">
                  {currentMovies.map(movie => (
                    <Col key={movie.id}>
                      <MovieCard
                        movie={movie}
                        isFavourite={isFavourite(movie.id)}
                        onToggleFavourite={toggleFavourite}
                        showToast={showToast}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          )}

          {activePage === 'form' && (
            <MovieRequestForm
              onSubmit={handleFormSubmit}
              showToast={showToast}
            />
          )}
        </Container>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default App;
