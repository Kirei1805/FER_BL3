import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onSearch, onOpenProfileModal }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>Student Management</h2>
        </div>
        
        <div className="navbar-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#students" className="nav-link">Students</a>
          <a href="#about" className="nav-link">About</a>
          <button 
            className="nav-link profile-btn" 
            onClick={onOpenProfileModal}
          >
            Build your Profile
          </button>
        </div>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Quick search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


