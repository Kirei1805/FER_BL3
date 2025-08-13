import React from 'react';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import SortDropdown from './SortDropdown';

const SearchAndFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  maxPrepTime, 
  setMaxPrepTime, 
  maxCookTime, 
  setMaxCookTime,
  sortBy,
  onSortChange
}) => {
  return (
    <Row className="mb-4 align-items-end">
      <Col md={6}>
        <div className="d-flex gap-3">
          <Form.Select 
            value={maxPrepTime} 
            onChange={(e) => setMaxPrepTime(e.target.value)}
            style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              minWidth: '140px'
            }}
          >
            <option value="">Max Prep Time</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
          </Form.Select>
          
          <Form.Select 
            value={maxCookTime} 
            onChange={(e) => setMaxCookTime(e.target.value)}
            style={{ 
              border: '1px solid #dee2e6', 
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '14px',
              minWidth: '140px'
            }}
          >
            <option value="">Max Cook Time</option>
            <option value="5">5 mins</option>
            <option value="10">10 mins</option>
            <option value="15">15 mins</option>
            <option value="20">20 mins</option>
          </Form.Select>
        </div>
      </Col>
      
      <Col md={6} className="d-flex justify-content-end gap-3">
        <SortDropdown sortBy={sortBy} onSortChange={onSortChange} />
        <div style={{ width: '300px' }}>
          <InputGroup>
            <InputGroup.Text style={{ 
              border: '1px solid #dee2e6', 
              borderRight: 'none',
              borderRadius: '8px 0 0 8px',
              backgroundColor: '#fff'
            }}>
              <FaSearch className="text-muted" />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search by name or ingredient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                border: '1px solid #dee2e6', 
                borderLeft: 'none',
                borderRadius: '0 8px 8px 0',
                padding: '12px 16px',
                fontSize: '14px'
              }}
            />
          </InputGroup>
        </div>
      </Col>
    </Row>
  );
};

export default SearchAndFilter;
