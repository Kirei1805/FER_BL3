import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ProfileForm.css';

const ProfileForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const validateName = (value) => {
    return value.trim() !== '' ? '' : 'Tên không được để trống';
  };

  const validateEmail = (value) => {
    return value.includes('@') ? '' : 'Email phải chứa ký tự @';
  };

  const validateAge = (value) => {
    const numAge = parseInt(value);
    return numAge >= 1 ? '' : 'Tuổi phải lớn hơn hoặc bằng 1';
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setErrors(prev => ({ ...prev, name: validateName(value) }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors(prev => ({ ...prev, email: validateEmail(value) }));
  };

  const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    setErrors(prev => ({ ...prev, age: validateAge(value) }));
  };

  const isFormValid = () => {
    return (
      name.trim() !== '' &&
      email.includes('@') &&
      parseInt(age) >= 1 &&
      Object.values(errors).every(error => !error)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isFormValid()) {
      toast.success('Submitted successfully!');
      setShowToast(true);
      
      setShowModal(true);
      
      if (onSubmit) {
        onSubmit({ name, email, age });
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="profile-form-container">
      {showToast && <ToastContainer position="top-right" autoClose={3000} />}
      
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Profile Form</h2>
        
        <div className="form-group">
          <label htmlFor="name">Tên:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Tuổi:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
            placeholder="Enter your age"
            min="1"
            className={errors.age ? 'error' : ''}
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        <button 
          type="submit" 
          disabled={!isFormValid()}
          className="submit-button"
        >
          Submit
        </button>
      </form>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-card">
              <h3>Thông tin đã gửi thành công!</h3>
              <div className="card-content">
                <p><strong>Tên:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Tuổi:</strong> {age}</p>
              </div>
              <button onClick={closeModal} className="close-button">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileForm.propTypes = {
  onSubmit: PropTypes.func
};

export default ProfileForm;

