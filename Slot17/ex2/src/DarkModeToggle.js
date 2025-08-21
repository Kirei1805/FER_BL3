import React from "react";
import PropTypes from "prop-types";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <div className="dark-mode-toggle">
      <button 
        onClick={onToggle} 
        className={`toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
};

DarkModeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DarkModeToggle;
