import React, { useState, useMemo, useEffect } from 'react';
import { Container, Alert, Toast } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import SearchAndFilter from './components/SearchAndFilter';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';
import RecipeCarousel from './components/RecipeCarousel';
import RecipeRequestForm from './components/RecipeRequestForm';

// Data
import { recipes } from './data/recipes';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [maxCookTime, setMaxCookTime] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [showFavouriteToast, setShowFavouriteToast] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Filter and sort recipes
  const filteredAndSortedRecipes = useMemo(() => {
    let filtered = recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrepTime = !maxPrepTime || recipe.prep <= parseInt(maxPrepTime);
      const matchesCookTime = !maxCookTime || recipe.cook <= parseInt(maxCookTime);
      
      return matchesSearch && matchesPrepTime && matchesCookTime;
    });

    // Sort recipes
    switch (sortBy) {
      case 'name-asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'prep-asc':
        filtered.sort((a, b) => a.prep - b.prep);
        break;
      case 'prep-desc':
        filtered.sort((a, b) => b.prep - a.prep);
        break;
      case 'cook-asc':
        filtered.sort((a, b) => a.cook - b.cook);
        break;
      case 'cook-desc':
        filtered.sort((a, b) => b.cook - a.cook);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, maxPrepTime, maxCookTime, sortBy]);

  const handleViewRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRecipe(null);
  };

  const handleAddToCart = (recipe) => {
    setCartItems(prev => [...prev, recipe]);
    handleCloseModal();
  };

  const handleAddToFavourite = (recipe) => {
    if (favourites.includes(recipe.title)) {
      setFavourites(prev => prev.filter(title => title !== recipe.title));
    } else {
      setFavourites(prev => [...prev, recipe.title]);
      setShowFavouriteToast(true);
    }
  };

  const handleShowRequestForm = () => {
    setShowRequestForm(true);
  };

  const handleCloseRequestForm = () => {
    setShowRequestForm(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(parseInt(newItemsPerPage));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, maxPrepTime, maxCookTime, sortBy]);

  return (
    <div className="App">
      <Header onShowRequestForm={handleShowRequestForm} />
      
      <main className="py-5">
        <Container>
          {/* Hero Section */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold mb-3">
              Explore our simple, healthy recipes
            </h1>
            <p className="lead text-muted mb-4">
              Discover eight quick, whole-food dishes that fit real-life schedules and taste amazing. 
              Use the search bar to find a recipe by name or ingredient, or simply scroll the list and 
              let something delicious catch your eye.
            </p>
          </div>

          {/* Recipe Carousel */}
          <RecipeCarousel recipes={recipes} onViewRecipe={handleViewRecipe} />

          {/* Search and Filter Section */}
          <SearchAndFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            maxPrepTime={maxPrepTime}
            setMaxPrepTime={setMaxPrepTime}
            maxCookTime={maxCookTime}
            setMaxCookTime={setMaxCookTime}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Recipe List */}
          {filteredAndSortedRecipes.length > 0 ? (
            <RecipeList 
              recipes={filteredAndSortedRecipes} 
              onViewRecipe={handleViewRecipe}
              onAddToFavourite={handleAddToFavourite}
              favourites={favourites}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          ) : (
            <Alert variant="info" className="text-center">
              No recipes found matching your criteria. Try adjusting your search or filters.
            </Alert>
          )}

          {/* Cart Notification */}
          {cartItems.length > 0 && (
            <Alert 
              variant="success" 
              className="position-fixed top-0 end-0 m-3"
              style={{ zIndex: 1050 }}
              dismissible
              onClose={() => setCartItems([])}
            >
              {cartItems.length} item{cartItems.length > 1 ? 's' : ''} added to cart!
            </Alert>
          )}

          {/* Favourite Toast */}
          <Toast
            show={showFavouriteToast}
            onClose={() => setShowFavouriteToast(false)}
            delay={5000}
            autohide
            className="position-fixed top-0 end-0 m-3"
            style={{ zIndex: 1051 }}
          >
            <Toast.Header>
              <strong className="me-auto">Success!</strong>
            </Toast.Header>
            <Toast.Body>Added to favourites</Toast.Body>
          </Toast>
        </Container>
      </main>

      <Footer />

      {/* Recipe Modal */}
      <RecipeModal 
        show={showModal}
        onHide={handleCloseModal}
        recipe={selectedRecipe}
        onAddToCart={handleAddToCart}
      />

      {/* Recipe Request Form */}
      <RecipeRequestForm 
        show={showRequestForm}
        onHide={handleCloseRequestForm}
      />
    </div>
  );
}

export default App;
