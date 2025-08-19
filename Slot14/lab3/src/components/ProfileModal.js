import React, { useState, useEffect, useReducer, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
Modal,
  Button,
  Form,
  Nav,
  ProgressBar,
  Card,
  Toast,
  ToastContainer
} from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import './ProfileModal.css';

const initialState = {
  about: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    avatar: null
  },
  account: {
    username: '',
    password: '',
    confirmPassword: '',
    secretQuestion: '',
    answer: ''
  },
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  }
};

// Reducer for managing form state
const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.section]: {
          ...state[action.section],
          [action.field]: action.value
        }
      };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

// Validation functions
const validateAbout = (about) => {
  const errors = {};
  if (!about.firstName.trim()) errors.firstName = 'First name is required';
  if (!about.lastName.trim()) errors.lastName = 'Last name is required';
  if (!about.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(about.email)) {
    errors.email = 'Email is invalid';
  }
  if (!about.phone.trim()) {
    errors.phone = 'Phone is required';
  } else if (!/^\d{10,11}$/.test(about.phone.replace(/\D/g, ''))) {
    errors.phone = 'Phone number is invalid';
  }
  // Avatar is optional, so no validation needed
  return Object.keys(errors).length === 0;
};

const validateAccount = (account) => {
  const errors = {};
  if (!account.username.trim()) {
    errors.username = 'Username is required';
  } else if (account.username.length < 6) {
    errors.username = 'Username must be at least 6 characters';
  }
  
  if (!account.password) {
    errors.password = 'Password is required';
  } else if (account.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(account.password)) {
    errors.password = 'Password must contain uppercase, lowercase, number and special character';
  }
  
  if (!account.confirmPassword) {
    errors.confirmPassword = 'Confirm password is required';
  } else if (account.password !== account.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  if (!account.secretQuestion) {
    errors.secretQuestion = 'Secret question is required';
  }
  
  if (!account.answer.trim()) {
    errors.answer = 'Answer is required';
  }
  
  return Object.keys(errors).length === 0;
};

const validateAddress = (address) => {
  const errors = {};
  if (!address.street.trim()) errors.street = 'Street is required';
  if (!address.city.trim()) errors.city = 'City is required';
  if (!address.state.trim()) errors.state = 'State is required';
  if (!address.zipCode.trim()) errors.zipCode = 'Zip code is required';
  if (!address.country) errors.country = 'Country is required';
  return Object.keys(errors).length === 0;
};

const ProfileModal = ({ show, onHide }) => {
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [stepCompletion, setStepCompletion] = useState({});

  const steps = ['About', 'Account', 'Address'];

  // Calculate step validity using useMemo
  const stepValidity = useMemo(() => {
    return {
      0: validateAbout(formState.about),
      1: validateAccount(formState.account),
      2: validateAddress(formState.address)
    };
  }, [formState]);

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    return ((currentStep + 1) / steps.length) * 100;
  }, [currentStep, steps.length]);

  // Check if current step is valid
  const isStepValid = useMemo(() => {
    return stepValidity[currentStep];
  }, [stepValidity, currentStep]);

  // Handlers using useCallback
  const nextStep = useCallback(() => {
    if (isStepValid && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [isStepValid, currentStep, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const onFieldChange = useCallback((section, field, value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      section,
      field,
      value
    });
  }, []);

  const onFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
      onFieldChange('about', 'avatar', file);
    }
  }, [onFieldChange]);

  // useEffect to handle avatar URL creation and cleanup
  useEffect(() => {
    if (formState.about.avatar) {
      const url = URL.createObjectURL(formState.about.avatar);
      setAvatarUrl(url);
      
      // Cleanup function to revoke URL when component unmounts or avatar changes
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setAvatarUrl(null);
    }
  }, [formState.about.avatar]);

  // useEffect to reset form when modal closes
  useEffect(() => {
    if (!show) {
      // Reset form when modal is closed
      dispatch({ type: 'RESET_FORM' });
      setCurrentStep(0);
      setShowPassword(false);
      setShowConfirmPassword(false);
      setShowSuccessModal(false);
      setShowToast(false);
      setAvatarUrl(null);
      setValidationErrors({});
      setStepCompletion({});
    }
  }, [show]);

  // useEffect to handle modal open/close effects
  useEffect(() => {
    if (show) {
      // When modal opens, focus on first input
      const firstInput = document.querySelector('.profile-modal input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
      
      // Add body scroll lock
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Remove body scroll lock when modal closes
        document.body.style.overflow = 'unset';
      };
    }
  }, [show]);

  // useEffect to show toast when form is successfully submitted
  useEffect(() => {
    if (showSuccessModal) {
      // Chỉ ẩn toast sau 3 giây, không đóng success modal
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal]);

  // useEffect to track validation errors in real-time
  useEffect(() => {
    const errors = {};
    
    // About validation
    if (formState.about.firstName && !formState.about.firstName.trim()) {
      errors.firstName = 'First name cannot be empty';
    }
    if (formState.about.lastName && !formState.about.lastName.trim()) {
      errors.lastName = 'Last name cannot be empty';
    }
    if (formState.about.email && !/\S+@\S+\.\S+/.test(formState.about.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (formState.about.phone && !/^\d{10,11}$/.test(formState.about.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    // Account validation
    if (formState.account.username && formState.account.username.length < 6) {
      errors.username = 'Username must be at least 6 characters';
    }
    if (formState.account.password && formState.account.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (formState.account.password && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formState.account.password)) {
      errors.password = 'Password must contain uppercase, lowercase, number and special character';
    }
    if (formState.account.confirmPassword && formState.account.password !== formState.account.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
  }, [formState]);

  // useEffect to track step completion and show progress feedback
  useEffect(() => {
    const completion = {
      0: stepValidity[0],
      1: stepValidity[1],
      2: stepValidity[2]
    };
    
    setStepCompletion(completion);
    
    // Log completion status for debugging
    console.log('Step completion status:', completion);
  }, [stepValidity]);

  const handleFinish = useCallback(() => {
    if (isStepValid) {
      setShowSuccessModal(true);
      setShowToast(true);
      // Không đóng modal ngay lập tức, để hiển thị success modal trước
    }
  }, [isStepValid]);

  const handleClose = useCallback(() => {
    onHide();
  }, [onHide]);

  // Countries list
  const countries = [
    'Viet Nam',
    'Korea',
    'Italy',
    'United States',
    'United Kingdom',
    'France',
    'Germany',
    'Japan',
    'China',
    'Australia'
  ];

  // Secret questions
  const secretQuestions = [
    'What is your first pet\'s name?',
    'What is your mother\'s maiden name?',
    'In which city were you born?',
    'Who was your favorite teacher?'
  ];

    const renderAboutTab = () => (
    <div className="tab-content horizontal-layout">
      <div className="avatar-upload-section">
        <div className="avatar-display">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt="Profile" 
              className="avatar-preview"
            />
          ) : (
            <div className="avatar-placeholder-large">
              <FaUser size={60} />
            </div>
          )}
        </div>
        <div className="upload-button-wrapper">
          <label htmlFor="avatar-upload" className="choose-picture-btn">
            CHOOSE PICTURE
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="form-fields-section">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="First Name"
              value={formState.about.firstName}
              onChange={(e) => onFieldChange('about', 'firstName', e.target.value)}
              isInvalid={!stepValidity[0] && !formState.about.firstName}
              className="simple-input"
            />
            <Form.Text className="input-helper">
              Please enter your first name
            </Form.Text>
            {validationErrors.firstName && (
              <Form.Text className="text-danger">
                {validationErrors.firstName}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={formState.about.lastName}
              onChange={(e) => onFieldChange('about', 'lastName', e.target.value)}
              isInvalid={!stepValidity[0] && !formState.about.lastName}
              className="simple-input"
            />
            <Form.Text className="input-helper">
              Please enter your last name
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={formState.about.email}
              onChange={(e) => onFieldChange('about', 'email', e.target.value)}
              isInvalid={!stepValidity[0] && (!formState.about.email || !/\S+@\S+\.\S+/.test(formState.about.email))}
              className="simple-input"
            />
            {validationErrors.email && (
              <Form.Text className="text-danger">
                {validationErrors.email}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="tel"
              placeholder="Phone"
              value={formState.about.phone}
              onChange={(e) => onFieldChange('about', 'phone', e.target.value)}
              isInvalid={!stepValidity[0] && (!formState.about.phone || !/^\d{10,11}$/.test(formState.about.phone.replace(/\D/g, '')))}
              className="simple-input"
            />
            {validationErrors.phone && (
              <Form.Text className="text-danger">
                {validationErrors.phone}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Bio (optional)"
              value={formState.about.bio}
              onChange={(e) => onFieldChange('about', 'bio', e.target.value)}
              className="simple-input"
            />
          </Form.Group>
        </Form>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="tab-content">
      <h4 className="mb-4">Account Information</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username *</Form.Label>
          <Form.Control
            type="text"
            value={formState.account.username}
            onChange={(e) => onFieldChange('account', 'username', e.target.value)}
            isInvalid={!stepValidity[1] && (!formState.account.username || formState.account.username.length < 6)}
          />
          <Form.Text className="text-muted">
            Username must be at least 6 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password *</Form.Label>
          <div className="password-input-group">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={formState.account.password}
              onChange={(e) => onFieldChange('account', 'password', e.target.value)}
              isInvalid={!stepValidity[1] && (!formState.account.password || formState.account.password.length < 8)}
            />
            <Button
              variant="outline-secondary"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
          <Form.Text className="text-muted">
            Password must be at least 8 characters with uppercase, lowercase, number and special character
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Confirm Password *</Form.Label>
          <div className="password-input-group">
            <Form.Control
              type={showConfirmPassword ? 'text' : 'password'}
              value={formState.account.confirmPassword}
              onChange={(e) => onFieldChange('account', 'confirmPassword', e.target.value)}
              isInvalid={!stepValidity[1] && (!formState.account.confirmPassword || formState.account.password !== formState.account.confirmPassword)}
            />
            <Button
              variant="outline-secondary"
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Secret Question *</Form.Label>
          <Form.Select
            value={formState.account.secretQuestion}
            onChange={(e) => onFieldChange('account', 'secretQuestion', e.target.value)}
            isInvalid={!stepValidity[1] && !formState.account.secretQuestion}
          >
            <option value="">Select a secret question</option>
            {secretQuestions.map((question, index) => (
              <option key={index} value={question}>{question}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Answer *</Form.Label>
          <Form.Control
            type="text"
            value={formState.account.answer}
            onChange={(e) => onFieldChange('account', 'answer', e.target.value)}
            isInvalid={!stepValidity[1] && !formState.account.answer}
          />
        </Form.Group>
      </Form>
    </div>
  );

  const renderAddressTab = () => (
    <div className="tab-content">
      <h4 className="mb-4">Address Information</h4>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Street *</Form.Label>
          <div className="input-group">
            <span className="input-group-text">
              <FaMapMarkerAlt />
            </span>
            <Form.Control
              type="text"
              value={formState.address.street}
              onChange={(e) => onFieldChange('address', 'street', e.target.value)}
              isInvalid={!stepValidity[2] && !formState.address.street}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City *</Form.Label>
          <Form.Control
            type="text"
            value={formState.address.city}
            onChange={(e) => onFieldChange('address', 'city', e.target.value)}
            isInvalid={!stepValidity[2] && !formState.address.city}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>State *</Form.Label>
          <Form.Control
            type="text"
            value={formState.address.state}
            onChange={(e) => onFieldChange('address', 'state', e.target.value)}
            isInvalid={!stepValidity[2] && !formState.address.state}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Zip Code *</Form.Label>
          <Form.Control
            type="text"
            value={formState.address.zipCode}
            onChange={(e) => onFieldChange('address', 'zipCode', e.target.value)}
            isInvalid={!stepValidity[2] && !formState.address.zipCode}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Country *</Form.Label>
          <Form.Select
            value={formState.address.country}
            onChange={(e) => onFieldChange('address', 'country', e.target.value)}
            isInvalid={!stepValidity[2] && !formState.address.country}
          >
            <option value="">Select a country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
    </div>
  );

  const renderTabContent = () => {
    switch (currentStep) {
      case 0:
        return renderAboutTab();
      case 1:
        return renderAccountTab();
      case 2:
        return renderAddressTab();
      default:
        return null;
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered className="profile-modal">
        <Modal.Header className="justify-content-center">
      <Modal.Title className="w-100 text-center">Build Your Profile</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          <ProgressBar 
            now={progressPercentage} 
            className="mb-4"
            variant="success"
          />
          
                     <Nav variant="tabs" className="mb-4">
             {steps.map((step, index) => (
               <Nav.Item key={index}>
                 <Nav.Link
                   active={index === currentStep}
                   disabled={index > currentStep}
                   className={stepCompletion[index] ? 'valid-step' : ''}
                 >
                   {step}
                 </Nav.Link>
               </Nav.Item>
             ))}
           </Nav>

          {renderTabContent()}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          
          {currentStep > 0 && (
            <Button variant="outline-primary" onClick={prevStep}>
              Previous
            </Button>
          )}
          
          {currentStep < steps.length - 1 ? (
            <Button 
              variant="primary" 
              onClick={nextStep}
              disabled={!isStepValid}
            >
              Next
            </Button>
          ) : (
            <Button 
              variant="success" 
              onClick={handleFinish}
              disabled={!isStepValid}
            >
              Finish
            </Button>
          )}
        </Modal.Footer>
      </Modal>

             {/* Success Modal */}
       <Modal show={showSuccessModal} onHide={() => {
         setShowSuccessModal(false);
         onHide(); // Đóng modal chính khi đóng success modal
       }} centered>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
                 <Modal.Body>
           <Card>
             <Card.Body>
               <div className="profile-summary">
                                  <div className="avatar-section mb-4">
                    {avatarUrl ? (
                      <div className="avatar-image">
                        <img 
                          src={avatarUrl} 
                          alt="Profile" 
                          className="avatar-img"
                        />
                      </div>
                    ) : (
                      <div className="avatar-placeholder">
                        <FaUser size={50} />
                      </div>
                    )}
                  </div>

                 <div className="section mb-3">
                   <h5>About</h5>
                   <p><strong>Name:</strong> {formState.about.firstName} {formState.about.lastName}</p>
                   <p><strong>Email:</strong> {formState.about.email}</p>
                   <p><strong>Phone:</strong> {formState.about.phone}</p>
                   {formState.about.bio && <p><strong>Bio:</strong> {formState.about.bio}</p>}
                 </div>

                 <div className="section mb-3">
                   <h5>Account</h5>
                   <p><strong>Username:</strong> {formState.account.username}</p>
                   <p><strong>Secret Question:</strong> {formState.account.secretQuestion}</p>
                 </div>

                 <div className="section">
                   <h5>Address</h5>
                   <p><strong>Street:</strong> {formState.address.street}</p>
                   <p><strong>City:</strong> {formState.address.city}</p>
                   <p><strong>State:</strong> {formState.address.state}</p>
                   <p><strong>Zip Code:</strong> {formState.address.zipCode}</p>
                   <p><strong>Country:</strong> {formState.address.country}</p>
                 </div>
               </div>
             </Card.Body>
           </Card>
         </Modal.Body>
         <Modal.Footer>
           <Button style={{ backgroundColor: '#ff6b9d', borderColor: '#ff6b9d' }} 
             onClick={() => {
               setShowSuccessModal(false);
               onHide();
             }}
           >
             Close
           </Button>
         </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success!</strong>
          </Toast.Header>
          <Toast.Body>Profile submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

ProfileModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired
};

export default ProfileModal;
