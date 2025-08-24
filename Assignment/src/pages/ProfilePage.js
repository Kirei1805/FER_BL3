import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Card, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [tempAvatar, setTempAvatar] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setFormData({
                firstname: storedUser.firstname || '',
                lastname: storedUser.lastname || '',
                phone: storedUser.phone || '',
                address: storedUser.address || '',
            });
            setAvatarUrl(storedUser.avatar || 'https://via.placeholder.com/150');
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!user) return;

        try {
            const updatedUser = { ...user, ...formData, avatar: avatarUrl };
            await axios.put(`http://localhost:5000/users/${user.id}`, updatedUser);

            localStorage.setItem('user', JSON.stringify(updatedUser));
            setUser(updatedUser);
            setIsEditing(false);
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Failed to update profile:', error);
            setMessage('Failed to update profile. Try again.');
        }
    };

    const handleAvatarChange = () => {
        if (tempAvatar.trim() !== '') {
            setAvatarUrl(tempAvatar);
            setIsEditing(true);
        }
        setShowModal(false);
    };

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <Container className="profile-container">
                    <div className="profile-header">
                        <div className="profile-header-content">
                            <h1 className="profile-title">
                                <span className="profile-icon">👤</span>
                                My Profile
                            </h1>
                            <p className="profile-subtitle">Manage your account information and preferences</p>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="profile-card">
                            {message && (
                                <Alert variant="success" className="profile-alert">
                                    {message}
                                </Alert>
                            )}

                            <div className="avatar-section">
                                <div className="avatar-container" onClick={() => {
                                    setTempAvatar(avatarUrl);
                                    setShowModal(true);
                                }}>
                                    <img
                                        src={avatarUrl}
                                        alt="Avatar"
                                        className="profile-avatar"
                                    />
                                    <div className="avatar-overlay">
                                        <span className="avatar-edit-icon">📷</span>
                                    </div>
                                </div>
                                <p className="avatar-hint">Click to change avatar</p>
                            </div>

                            <div className="profile-form">
                                <div className="form-row">
                                    <Form.Group className="form-group">
                                        <Form.Label className="form-label">Username</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={user?.username} 
                                            disabled 
                                            className="form-control-disabled"
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label className="form-label">Email</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            value={user?.email} 
                                            disabled 
                                            className="form-control-disabled"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="form-row">
                                    <Form.Group className="form-group">
                                        <Form.Label className="form-label">First Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="firstname" 
                                            value={formData.firstname} 
                                            onChange={handleChange}
                                            className="form-control-custom"
                                            placeholder="Enter your first name"
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label className="form-label">Last Name</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="lastname" 
                                            value={formData.lastname} 
                                            onChange={handleChange}
                                            className="form-control-custom"
                                            placeholder="Enter your last name"
                                        />
                                    </Form.Group>
                                </div>

                                <div className="form-row">
                                    <Form.Group className="form-group">
                                        <Form.Label className="form-label">Phone Number</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="phone" 
                                            value={formData.phone} 
                                            onChange={handleChange}
                                            className="form-control-custom"
                                            placeholder="Enter your phone number"
                                        />
                                    </Form.Group>
                                    <Form.Group className="form-group">
                                        <Form.Label className="form-label">Address</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="address" 
                                            value={formData.address} 
                                            onChange={handleChange}
                                            className="form-control-custom"
                                            placeholder="Enter your address"
                                        />
                                    </Form.Group>
                                </div>

                                {isEditing && (
                                    <div className="save-button-container">
                                        <Button 
                                            variant="primary" 
                                            className="save-button" 
                                            onClick={handleSave}
                                        >
                                            <span className="save-icon">💾</span>
                                            Save Changes
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Modal chỉnh avatar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered className="avatar-modal">
                <Modal.Header closeButton className="modal-header-custom">
                    <Modal.Title>Change Avatar</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-custom">
                    <Form.Group>
                        <Form.Label>Enter Avatar URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Paste image URL here"
                            value={tempAvatar}
                            onChange={(e) => setTempAvatar(e.target.value)}
                            className="form-control-custom"
                        />
                    </Form.Group>
                    {tempAvatar && (
                        <div className="avatar-preview">
                            <img
                                src={tempAvatar}
                                alt="Avatar Preview"
                                className="avatar-preview-img"
                            />
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer className="modal-footer-custom">
                    <Button variant="secondary" onClick={() => setShowModal(false)} className="cancel-button">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAvatarChange} className="save-modal-button">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProfilePage;
