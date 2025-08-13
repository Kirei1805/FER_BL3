import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const RecipeRequestForm = ({ show, onHide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    ingredient: '',
    maxPrepTime: '',
    notes: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý submit form ở đây
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onHide();
      setFormData({
        name: '',
        email: '',
        ingredient: '',
        maxPrepTime: '',
        notes: ''
      });
    }, 2000);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Recipe Request Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess && (
          <Alert variant="success" className="mb-3">
            Thank you! Your recipe request has been submitted successfully.
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Desired Ingredient</Form.Label>
            <Form.Control
              type="text"
              name="ingredient"
              placeholder="e.g., Quinoa, Salmon, Sweet Potato, etc."
              value={formData.ingredient}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please specify the desired ingredient
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Prep Time</Form.Label>
            <Form.Select
              name="maxPrepTime"
              value={formData.maxPrepTime}
              onChange={handleInputChange}
              required
            >
              <option value="">Select prep time</option>
              <option value="5">5 minutes</option>
              <option value="10">10 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Please select a prep time
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="notes"
              placeholder="Any additional notes or preferences..."
              value={formData.notes}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide some notes
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              <FaPaperPlane className="me-2" />
              Submit Request
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RecipeRequestForm;

