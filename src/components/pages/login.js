import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/login.css';
import BackgroundAnimation from '../BackgroundAnimation';


// Inline SVG icons
const UserIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 10a4 4 0 100-8 4 4 0 000 8zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/></svg>
);
const EmailIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 6.94A8 8 0 0110 2a8 8 0 017.06 4.94l-7.06 4.12-7.06-4.12zM2 8.13V16a2 2 0 002 2h12a2 2 0 002-2V8.13l-7.06 4.12a1 1 0 01-1.88 0L2 8.13z"/></svg>
);
const PasswordIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v2H3a1 1 0 000 2h1v6a2 2 0 002 2h8a2 2 0 002-2v-6h1a1 1 0 100-2h-1V8a6 6 0 00-6-6zm-4 8V8a4 4 0 118 0v2H6zm2 4a2 2 0 104 0 2 2 0 00-4 0z"/></svg>
);

// Inline InputWithIcon component
const InputWithIcon = ({ icon: Icon, ...props }) => (
    <div className="input-icon-wrapper">
        <span className="input-icon"><Icon /></span>
        <input {...props} />
    </div>
);

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { username, email, password } = formData;
        if (!username) {
            toast.error("Username is required!");
            return false;
        }
        if (!email) {
            toast.error("Email is required!");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("Invalid email format!");
            return false;
        }
        if (!password) {
            toast.error("Password is required!");
            return false;
        }
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters!");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            toast.success("Login Successful!");
            // Simulate login logic here
            setTimeout(() => {
                navigate('/dashboard'); // Example navigation
            }, 1000);
        }
    };

    return (
        <div className="login-container">
             <BackgroundAnimation />
            <div
                className="login-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Username</label>
                        <InputWithIcon
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            icon={UserIcon}
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <InputWithIcon
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            icon={EmailIcon}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <InputWithIcon
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            icon={PasswordIcon}
                        />
                    </div>
                    <button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>
                </form>
                <p className="switch-page">
                    Don't have an account? <Link to="/signup">Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
