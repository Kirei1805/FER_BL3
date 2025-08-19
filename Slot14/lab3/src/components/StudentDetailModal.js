import React from 'react';
import PropTypes from 'prop-types';
import './StudentDetailModal.css';

const StudentDetailModal = ({ student, isOpen, onClose }) => {
  if (!isOpen || !student) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chi tiết sinh viên</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="student-detail-avatar">
            <img 
              src={student.avatar} 
              alt={`${student.name} avatar`}
              onError={(e) => {
                e.target.src = '/image/OIF.jpg';
              }}
            />
          </div>
          
          <div className="student-detail-info">
            <div className="detail-item">
              <span className="detail-label">ID:</span>
              <span className="detail-value">#{student.id}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Họ và tên:</span>
              <span className="detail-value">{student.name}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{student.email}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Tuổi:</span>
              <span className="detail-value">{student.age} tuổi</span>
            </div>
           
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

StudentDetailModal.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    avatar: PropTypes.string.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default StudentDetailModal;
