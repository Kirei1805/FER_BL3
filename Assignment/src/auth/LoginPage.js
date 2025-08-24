import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const { login, isAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sử dụng AuthContext để đăng nhập
            const result = await login(username, password);
            
            if (result.success) {
                setMessage(`Welcome, ${username}! Login successful.`);
                setTimeout(() => navigate('/home'), 1000);
            } else {
                setMessage(result.error || 'Invalid username or password!');
            }
        } catch (error) {
            setMessage('Login failed! Please check your username and password.');
        }
    };

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const userInfo = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
                    headers: { Authorization: `Bearer ${response.access_token}` }
                });

                const email = userInfo.data.email;
                const username = email.split('@')[0];

                // Kiểm tra user có tồn tại không
                const checkUser = await axios.get(`http://localhost:5000/users?email=${email}`);
                let user;

                if (checkUser.data.length > 0) {
                    // User đã tồn tại, đăng nhập thẳng
                    user = checkUser.data[0];
                    setMessage(`Welcome, ${user.username}! Login successful.`);
                } else {
                    // User chưa có → Tạo tài khoản mới
                    user = { username, email, password: '123' };
                    await axios.post(`http://localhost:5000/users`, user);
                    alert(`Register Successful! Your Default Password Is: 123`);
                }

                // Sử dụng AuthContext để đăng nhập
                const result = await login(email, user.password);
                if (result.success) {
                    setTimeout(() => navigate('/home'), 1000);
                }
            } catch (error) {
                console.error('Google login failed:', error);
                setMessage('Google login failed. Please try again.');
            }
        },
        onError: () => setMessage('Google login failed. Please try again.')
    });

    return (
        <Container className='container-s' style={{
            backgroundImage: 'url("/images/backgroundImageLogin.jpg")', backgroundSize: 'cover',
            backgroundPosition: 'center', minHeight: '100vh',
            minWidth: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Card className='p-4 pt-5 pb-5' style={{ width: '480px', margin: '0 auto' }}>
                <h2 className='text-center' style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold', color: '#333' }}>🎵 Music Store 🎹</h2>
                {message && <Alert variant={message.includes('Welcome') ? "success" : "danger"}>{message}</Alert>}
                <Form onSubmit={handleSubmit} className="mt-4">
                    <Form.Group controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="password" className="mt-3 mb-3">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </Button>
                        </InputGroup>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Login
                    </Button>
                </Form>

                <Button variant="outline-danger" className="mt-3 w-100 d-flex align-items-center justify-content-center"
                    onClick={() => handleGoogleLogin()}
                    style={{ gap: "10px" }}>
                    <FcGoogle size={20} />
                    Login with Google
                </Button>

                <div className="mt-3 text-center">
                    <span>Don't have an account? </span>
                    <Button variant="link" onClick={() => navigate('/register')}>Register here</Button>
                </div>
            </Card>
        </Container>
    );
};

export default Login;
