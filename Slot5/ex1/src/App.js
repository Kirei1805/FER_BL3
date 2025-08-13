import React, { useState, useMemo } from 'react';
import { Container, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import SearchAndFilter from './components/SearchAndFilter';
import RecipeList from './components/RecipeList';
import RecipeModal from './components/RecipeModal';

import { recipes } from './data/recipes';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [maxCookTime, setMaxCookTime] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesPrepTime = !maxPrepTime || recipe.prep <= parseInt(maxPrepTime);
      const matchesCookTime = !maxCookTime || recipe.cook <= parseInt(maxCookTime);
      
      return matchesSearch && matchesPrepTime && matchesCookTime;
    });
  }, [searchTerm, maxPrepTime, maxCookTime]);

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

  return (
    <div className="App">
      <Header />
      
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

          {/* Search and Filter Section */}
          <SearchAndFilter 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            maxPrepTime={maxPrepTime}
            setMaxPrepTime={setMaxPrepTime}
            maxCookTime={maxCookTime}
            setMaxCookTime={setMaxCookTime}
          />

          {/* Recipe List */}
          {filteredRecipes.length > 0 ? (
            <RecipeList 
              recipes={filteredRecipes} 
              onViewRecipe={handleViewRecipe} 
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
    </div>
  );
}

export default App;
