import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Alert, Card } from 'react-bootstrap';

const MovieRequestForm = ({ onSubmit, showToast }) => {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    year: '',
    duration: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }

    // Genre validation
    if (!formData.genre) {
      newErrors.genre = 'Genre is required';
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = 'Year is required';
    } else {
      const year = parseInt(formData.year);
      if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 5) {
        newErrors.year = 'Year must be between 1900 and ' + (new Date().getFullYear() + 5);
      }
    }

    // Duration validation
    if (!formData.duration) {
      newErrors.duration = 'Duration is required';
    } else {
      const duration = parseInt(formData.duration);
      if (isNaN(duration) || duration <= 0 || duration > 300) {
        newErrors.duration = 'Duration must be between 1 and 300 minutes';
      }
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 30) {
      newErrors.description = 'Description must be at least 30 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      setFormData({
        title: '',
        genre: '',
        year: '',
        duration: '',
        description: ''
      });
      setIsSubmitted(true);
      showToast('Request submitted. Thank you!', 'success');
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="container py-4">
      <Card className="mx-auto form-card" style={{ maxWidth: '600px' }}>
        <Card.Header>
          <h3 className="mb-0">Movie Request Form</h3>
        </Card.Header>
        <Card.Body>
          {isSubmitted && (
            <Alert variant="success" dismissible onClose={() => setIsSubmitted(false)}>
              Request submitted successfully! Thank you for your suggestion.
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Movie Title *</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                isInvalid={!!errors.title}
                placeholder="Enter movie title"
              />
              <Form.Control.Feedback type="invalid">
                {errors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre *</Form.Label>
              <Form.Select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                isInvalid={!!errors.genre}
              >
                <option value="">Select a genre</option>
                <option value="Action">Action</option>
                <option value="Animation">Animation</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Thriller">Thriller</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.genre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year *</Form.Label>
              <Form.Control
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                isInvalid={!!errors.year}
                placeholder="e.g., 2023"
                min="1900"
                max={new Date().getFullYear() + 5}
              />
              <Form.Control.Feedback type="invalid">
                {errors.year}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration (minutes) *</Form.Label>
              <Form.Control
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                isInvalid={!!errors.duration}
                placeholder="e.g., 120"
                min="1"
                max="300"
              />
              <Form.Control.Feedback type="invalid">
                {errors.duration}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                isInvalid={!!errors.description}
                placeholder="Enter movie description (minimum 30 characters)"
              />
              <Form.Text className="text-muted">
                {formData.description.length}/30 characters minimum
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                {errors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Submit Request
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

MovieRequestForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired
};

export default MovieRequestForm;
