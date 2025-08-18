import React from 'react';
import PropTypes from 'prop-types';
import './StudentCard.css';

const StudentCard = ({ student, onViewDetails }) => {
  return (
    <div className="student-card">
      <div className="card-header">
        <span className="student-id">#{student.id}</span>
        <div className="avatar-container">
          <img 
            src={student.avatar} 
            alt={`${student.name} avatar`}
            className="student-avatar"
            onError={(e) => {
              e.target.src = '/image/OIF.jpg';
            }}
          />
        </div>
      </div>
      
      <div className="card-body">
        <h3 className="student-name">{student.name}</h3>
        <p className="student-email">{student.email}</p>
        <div className="student-age">
          <span className="age-label">Tuổi:</span>
          <span className="age-value">{student.age}</span>
        </div>
      </div>
      
      <div className="card-footer">
        <button 
          className="view-details-btn"
          onClick={() => onViewDetails(student)}
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
};

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default StudentCard;
