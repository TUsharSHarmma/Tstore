import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import './AuthForm.css'; // ✅ You'll create this next

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Redirecting to the app...',
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate('/app'), 2000);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: data.message || 'Invalid credentials',
        });
      }
    } catch {
      setLoading(false);
      Swal.fire({
        icon: 'warning',
        title: 'Network Error',
        text: 'Please check your connection and try again.',
      });
    }
  };

  return (
    <div className='pagess'>
      {loading && (
        <div className="loading-overlay">
          <div className="custom-spinner"></div>
          <p className="loading-text">Logging you in...</p>
        </div>
      )}

      <div className="auth-page">
        <div className="auth-container">
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="auth-title">Welcome Back</h2>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
                id="login-email"
              />
              <label htmlFor="login-email">Email Address</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
                id="login-password"
              />
              <label htmlFor="login-password">Password</label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>Login</button>

            <p className="switch-auth">
              Don't have an account?
              <Link to="/signup"> Sign up</Link>
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
            <p>Email: <a href="mailto:contact@tstore.com">tusharsharmaprayagraj@gmail.com</a></p>
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

export default Login;
