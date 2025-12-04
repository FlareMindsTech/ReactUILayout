import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/signup.css';
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
const PhoneIcon = () => (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3.5A1.5 1.5 0 013.5 2h2A1.5 1.5 0 017 3.5V5a1 1 0 01-1 1H4v2a12 12 0 0012 12h2a1 1 0 011-1v-2a1 1 0 01-1-1h-1.5A1.5 1.5 0 0116 16.5v-2A1.5 1.5 0 0117.5 13h2A1.5 1.5 0 0121 14.5v2A3.5 3.5 0 0117.5 20h-2A14 14 0 012 5.5v-2z"/></svg>
);

// Inline InputWithIcon component
const InputWithIcon = ({ icon: Icon, ...props }) => (
    <div className="input-icon-wrapper">
        <span className="input-icon"><Icon /></span>
        <input {...props} />
    </div>
);

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
         username: '',
        email: '',
        number: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const {  username, email, number, password } = formData;

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
        if (!number) {
            toast.error("Phone number is required!");
            return false;
        }
        if (!/^\d{10}$/.test(number)) {
            toast.error("Phone number must be 10 digits!");
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
            toast.success("Signup Successful!");
            // Simulate signup logic here
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        }
    };

    return (
        <div className="signup-container">
             <BackgroundAnimation />
            <div
                className="signup-card"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    {/* <div className="row-flex"> */}
                         <div className="input-group">
                         <label>Username</label>
                            <InputWithIcon
                             type="text"
                             name="username"
                            value={formData. username}
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
                        <label>Phone Number</label>
                        <InputWithIcon
                            type="text"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            icon={PhoneIcon}
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
                        className="signup-btn"
                    >
                        Signup
                    </button>
                </form>
                <p className="switch-page">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
