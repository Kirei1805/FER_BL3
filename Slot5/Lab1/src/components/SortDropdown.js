import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { FaSort } from 'react-icons/fa';

const SortDropdown = ({ sortBy, onSortChange }) => {
  const sortOptions = [
    { value: 'name-asc', label: 'Name A → Z' },
    { value: 'name-desc', label: 'Name Z → A' },
    { value: 'prep-asc', label: 'Prep Time ↑' },
    { value: 'prep-desc', label: 'Prep Time ↓' },
    { value: 'cook-asc', label: 'Cook Time ↑' },
    { value: 'cook-desc', label: 'Cook Time ↓' }
  ];

  const getCurrentLabel = () => {
    const currentOption = sortOptions.find(option => option.value === sortBy);
    return currentOption ? currentOption.label : 'Sort by';
  };

  return (
    <Dropdown onSelect={onSortChange}>
      <Dropdown.Toggle variant="outline-secondary" id="sort-dropdown">
        <FaSort className="me-2" />
        {getCurrentLabel()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {sortOptions.map((option) => (
          <Dropdown.Item 
            key={option.value} 
            eventKey={option.value}
            active={sortBy === option.value}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortDropdown;


