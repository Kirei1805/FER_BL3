import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <div className="dark-mode-toggle">
      <Button 
        variant={isDarkMode ? "light" : "dark"}
        onClick={onToggle}
        size="sm"
        className="toggle-btn"
      >
        <span className="toggle-icon">
          {isDarkMode ? '☀️' : '🌙'}
        </span>
        <span className="toggle-text">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </span>
      </Button>
    </div>
  );
};

DarkModeToggle.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default DarkModeToggle;

