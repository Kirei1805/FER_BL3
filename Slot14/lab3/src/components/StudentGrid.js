import React from 'react';
import PropTypes from 'prop-types';
import StudentCard from './StudentCard';
import './StudentGrid.css';

const StudentGrid = ({ students, onViewDetails }) => {
  if (!students || students.length === 0) {
    return (
      <div className="no-students">
        <div className="no-students-content">
          <h3>Không tìm thấy sinh viên</h3>
          <p>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-grid">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

StudentGrid.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired
    })
  ).isRequired,
  onViewDetails: PropTypes.func.isRequired
};

export default StudentGrid;


