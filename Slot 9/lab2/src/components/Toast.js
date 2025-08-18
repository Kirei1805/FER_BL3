import React from 'react';
import PropTypes from 'prop-types';
import { Toast, ToastContainer } from 'react-bootstrap';

const ToastNotification = ({ show, message, variant, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast 
        show={show} 
        onClose={onClose}
        delay={3000}
        autohide
        bg={variant}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body className={variant === 'dark' ? 'text-white' : ''}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

ToastNotification.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ToastNotification;


