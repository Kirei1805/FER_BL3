import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StudentsPage from './components/StudentsPage';
import Footer from './components/Footer';
import { students } from './data/students';

function App() {
  const handleNavbarSearch = (searchTerm) => {
    // Handle navbar search if needed in the future
    console.log('Navbar search:', searchTerm);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleNavbarSearch} />
      <Hero />
      <StudentsPage students={students} />
      <Footer />
    </div>
  );
}

export default App;
