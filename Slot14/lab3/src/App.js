import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StudentsPage from './components/StudentsPage';
import Footer from './components/Footer';
import ProfileModal from './components/ProfileModal';
import { students } from './data/students';

function App() {
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handleNavbarSearch = (searchTerm) => {
    console.log('Navbar search:', searchTerm);
  };

  const handleOpenProfileModal = () => {
    setShowProfileModal(true);
  };

  const handleCloseProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <div className="App">
      <Navbar 
        onSearch={handleNavbarSearch} 
        onOpenProfileModal={handleOpenProfileModal}
      />
      <Hero />
      <StudentsPage students={students} />
      <Footer />
      <ProfileModal 
        show={showProfileModal} 
        onHide={handleCloseProfileModal} 
      />
    </div>
  );
}

export default App;
