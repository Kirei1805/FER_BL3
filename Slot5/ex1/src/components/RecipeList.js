import React from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, onViewRecipe }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {recipes.map((recipe, index) => (
        <Col key={index}>
          <RecipeCard recipe={recipe} onViewRecipe={onViewRecipe} />
        </Col>
      ))}
    </Row>
  );
};

export default RecipeList;
