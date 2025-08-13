import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import RecipePagination from './RecipePagination';

const RecipeList = ({ 
  recipes, 
  onViewRecipe, 
  onAddToFavourite,
  favourites,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = recipes.slice(startIndex, endIndex);

  return (
    <div>
      <Row xs={1} md={2} lg={3} className="g-4 mb-4">
        {currentRecipes.map((recipe, index) => (
          <Col key={index}>
            <RecipeCard 
              recipe={recipe} 
              onViewRecipe={onViewRecipe}
              onAddToFavourite={onAddToFavourite}
              isFavourite={favourites.includes(recipe.title)}
            />
          </Col>
        ))}
      </Row>
      
      {/* Always show pagination to allow changing items per page */}
      <RecipePagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
        totalItems={recipes.length}
      />
    </div>
  );
};

export default RecipeList;
