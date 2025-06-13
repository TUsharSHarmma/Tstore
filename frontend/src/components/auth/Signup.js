import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthForm.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const isFormValid = () => {
    const { name, email, password } = formData;
    return name.trim() !== '' && email.trim() !== '' && password.trim().length >= 6;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!isFormValid()) {
      setError('All fields are required and password must be at least 6 characters.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password.trim()
        })
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (res.ok) {
        alert('Signup successful! Please login.');
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError('Network error. Backend may be down.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='pagess'>
      <div className="auth-page">
        <div className="auth-container">
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="auth-title">Create Your Account</h2>

            {error && <p className="error-message">{error}</p>}

            <div className="input-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                required
                id="signup-name"
              />
              <label htmlFor="signup-name">Name</label>
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
                id="signup-email"
              />
              <label htmlFor="signup-email">Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
                minLength={6}
                id="signup-password"
              />
              <label htmlFor="signup-password">Password</label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <p className="switch-auth">
              Already have an account?
              <Link to="/login"> Login</Link>
            </p>
          </form>
        </div>
      </div>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-about">
            <h3>T-STORE</h3>
            <p>Your trusted source for fast, safe, and verified Android apps.</p>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:tusharsharmaprayagraj@gmail.com">tusharsharmaprayagraj@gmail.com</a></p>
            <p>Phone: +91 9026333543</p>
          </div>

          <div className="footer-social">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} T-STORE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
