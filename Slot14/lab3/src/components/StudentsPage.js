import React, { useState, useMemo } from 'react';
import Filters from './Filters';
import SortDropdown from './SortDropdown';
import StudentGrid from './StudentGrid';
import StudentDetailModal from './StudentDetailModal';
import './StudentsPage.css';

const StudentsPage = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (ageFilter) {
      filtered = filtered.filter(student => {
        switch (ageFilter) {
          case '≤20':
            return student.age <= 20;
          case '21-25':
            return student.age >= 21 && student.age <= 25;
          case '>25':
            return student.age > 25;
          default:
            return true;
        }
      });
    }

    if (hasAvatar) {
      filtered = filtered.filter(student => student.avatar && student.avatar.trim() !== '');
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'age-asc':
            return a.age - b.age;
          case 'age-desc':
            return b.age - a.age;
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [students, searchTerm, ageFilter, hasAvatar, sortBy]);

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="students-page">
      <div className="students-container">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          ageFilter={ageFilter}
          onAgeFilterChange={setAgeFilter}
          hasAvatar={hasAvatar}
          onHasAvatarChange={setHasAvatar}
        />
        
        <div className="controls-section">
          <SortDropdown
            sortBy={sortBy}
            onSortChange={setSortBy}
          />
          <div className="results-count">
            Hiển thị {filteredAndSortedStudents.length} sinh viên
          </div>
        </div>

        <StudentGrid
          students={filteredAndSortedStudents}
          onViewDetails={handleViewDetails}
        />
      </div>

      <StudentDetailModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default StudentsPage;


