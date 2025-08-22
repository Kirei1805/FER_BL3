import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4a7 7 0 1 1 0 14A7 7 0 0 1 11 4zm0-2C6.582 2 3 5.582 3 10s3.582 8 8 8c1.848 0 3.548-.635 4.89-1.69l4.4 4.4a1 1 0 0 0 1.414-1.414l-4.4-4.4A7.955 7.955 0 0 0 19 10c0-4.418-3.582-8-8-8z" fill="currentColor"/>
          </svg>
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Tìm kiếm món ăn..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Tìm kiếm món ăn"
        />
      </InputGroup>
    </div>
  );
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
