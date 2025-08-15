import React from 'react';
import PropTypes from 'prop-types';
import { Form, InputGroup, Row, Col } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

const SearchFilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedGenre, 
  onGenreChange, 
  sortBy, 
  onSortChange, 
  genres,
  filteredCount 
}) => {
  return (
    <div className="search-filter-bar">
      <Row className="g-3">
        <Col md={4}>
          <InputGroup>
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </InputGroup>
        </Col>
        
        <Col md={3}>
          <Form.Select
            value={selectedGenre}
            onChange={(e) => onGenreChange(e.target.value)}
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </Form.Select>
        </Col>
        
        <Col md={3}>
          <Form.Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">None</option>
            <option value="asc">Duration ↑</option>
            <option value="desc">Duration ↓</option>
          </Form.Select>
        </Col>
        
        <Col md={2}>
          <div className="text-center p-2 bg-white rounded border">
            <small className="text-muted">
              {filteredCount} movie{filteredCount !== 1 ? 's' : ''} found
            </small>
          </div>
        </Col>
      </Row>
    </div>
  );
};

SearchFilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  filteredCount: PropTypes.number.isRequired
};

export default SearchFilterBar;
