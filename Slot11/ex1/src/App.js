import React from 'react';
import './App.css';
import ProfileForm from './ProfileForm';

function App() {
  const handleSubmit = (formData) => {
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="App">
      <ProfileForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
