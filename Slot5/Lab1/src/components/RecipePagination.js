import React from 'react';
import { Pagination, Dropdown, Row, Col } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const RecipePagination = ({ 
  currentPage, 
  totalPages, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange,
  totalItems = 0
}) => {
  const itemsPerPageOptions = [6, 9, 12];

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Row className="align-items-center justify-content-between mt-4">
      <Col md={6}>
        <div className="d-flex align-items-center">
          <span className="me-2 fw-medium">Items per page:</span>
          <Dropdown onSelect={onItemsPerPageChange}>
            <Dropdown.Toggle variant="outline-secondary" size="sm">
              {itemsPerPage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {itemsPerPageOptions.map(option => (
                <Dropdown.Item 
                  key={option} 
                  eventKey={option}
                  active={itemsPerPage === option}
                >
                  {option}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {totalPages <= 1 && (
            <span className="ms-3 text-muted small">
              (All {totalItems} items shown on one page)
            </span>
          )}
          {totalPages > 1 && (
            <span className="ms-3 text-muted small">
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>
      </Col>
      
      <Col md={6}>
        <Pagination className="justify-content-end mb-0">
          {/* First Page (<<) - Disabled when on page 1 */}
          <Pagination.First 
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1 || totalPages <= 1}
            title="First page"
            className={currentPage === 1 ? "disabled" : ""}
          >
            <FaAngleDoubleLeft />
          </Pagination.First>
          
          {/* Previous Page (<) - Disabled when on page 1 */}
          <Pagination.Prev 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalPages <= 1}
            title="Previous page"
            className={currentPage === 1 ? "disabled" : ""}
          >
            <FaChevronLeft />
          </Pagination.Prev>
          
          {/* Page Numbers (1, 2, 3, ...) - Current page is active */}
          {getPageNumbers().map((page, index) => (
            <Pagination.Item
              key={index}
              active={page === currentPage}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              disabled={page === '...'}
              className={page === currentPage ? "active" : ""}
            >
              {page}
            </Pagination.Item>
          ))}
          
          {/* Next Page (>) - Disabled when on last page */}
          <Pagination.Next 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages <= 1}
            title="Next page"
            className={currentPage === totalPages ? "disabled" : ""}
          >
            <FaChevronRight />
          </Pagination.Next>
          
          {/* Last Page (>>) - Disabled when on last page */}
          <Pagination.Last 
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages || totalPages <= 1}
            title="Last page"
            className={currentPage === totalPages ? "disabled" : ""}
          >
            <FaAngleDoubleRight />
          </Pagination.Last>
        </Pagination>
      </Col>
    </Row>
  );
};

export default RecipePagination;
