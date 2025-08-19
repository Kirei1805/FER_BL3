import React from 'react';
import './Filters.css';

const Filters = ({ 
  searchTerm, 
  onSearchChange, 
  ageFilter, 
  onAgeFilterChange, 
  hasAvatar, 
  onHasAvatarChange 
}) => {
  return (
    <div className="filters">
      <div className="filters-container">
        <div className="filter-group">
          <label className="filter-label">Tìm kiếm:</label>
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">Nhóm tuổi:</label>
          <select
            value={ageFilter}
            onChange={(e) => onAgeFilterChange(e.target.value)}
            className="filter-select"
          >
            <option value="">Tất cả</option>
            <option value="≤20">≤ 20 tuổi</option>
            <option value="21-25">21 - 25 tuổi</option>
            <option value=">25"> 25 tuổi</option>
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={hasAvatar}
              onChange={(e) => onHasAvatarChange(e.target.checked)}
              className="checkbox-input"
            />
            <span className="checkbox-custom"></span>
            Chỉ hiển thị sinh viên có avatar
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filters;


