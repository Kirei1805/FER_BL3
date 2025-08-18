import React from 'react';
import './SortDropdown.css';

const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-container">
      <label className="sort-label">Sắp xếp theo:</label>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="">Mặc định</option>
        <option value="age-asc">Tuổi tăng dần</option>
        <option value="age-desc">Tuổi giảm dần</option>
        <option value="name-asc">Tên A → Z</option>
        <option value="name-desc">Tên Z → A</option>
      </select>
    </div>
  );
};

export default SortDropdown;
