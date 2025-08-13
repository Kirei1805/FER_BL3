import React, { useState } from 'react';
import { Container, Card, CardBody, Badge } from 'react-bootstrap';
import RecipePagination from './RecipePagination';

const PaginationTest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  
  // Tạo dữ liệu test
  const testRecipes = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Recipe ${i + 1}`,
    description: `This is recipe number ${i + 1}`
  }));

  const totalPages = Math.ceil(testRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecipes = testRecipes.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(parseInt(newItemsPerPage));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <Container className="py-4">
      <Card className="mb-4">
        <CardBody>
          <h4>Pagination Test Component</h4>
          <p>Testing pagination logic with {testRecipes.length} items</p>
          
          <div className="mb-3">
            <Badge bg="info" className="me-2">
              Current Page: {currentPage}
            </Badge>
            <Badge bg="secondary" className="me-2">
              Total Pages: {totalPages}
            </Badge>
            <Badge bg="success" className="me-2">
              Items Per Page: {itemsPerPage}
            </Badge>
            <Badge bg="warning">
              Showing: {startIndex + 1}-{Math.min(endIndex, testRecipes.length)} of {testRecipes.length}
            </Badge>
          </div>

          {/* Display current items */}
          <div className="row mb-4">
            {currentRecipes.map((recipe) => (
              <div key={recipe.id} className="col-md-4 mb-2">
                <div className="p-2 border rounded">
                  <strong>{recipe.title}</strong>
                  <br />
                  <small className="text-muted">{recipe.description}</small>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Component */}
          <RecipePagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </CardBody>
      </Card>
    </Container>
  );
};

export default PaginationTest;
