import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = 'Enter a valid email';
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Enter a valid 10-digit number';
    if (formData.message.length < 10) newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async e => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length !== 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } else {
      alert(data.error || 'Failed to submit form');
    }
  } catch (err) {
    console.error('Error submitting contact form:', err);
    alert('Server error. Please try again later.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className='pagess'>
    <div className="contact-page fade-in">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p className="contact-intro">
          Have a question, idea, or just want to say hi? We’d love to hear from you.
        </p>

        {submitted && (
          <div className="success-message slide-in">
            ✅ Thank you for contacting us! We’ll get back to you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form" noValidate>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              title="Please enter your full name"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              title="Enter a valid email address"
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? 'input-error' : ''}
              title="Enter a valid 10-digit mobile number"
            />
            {errors.phone && <span className="error-text">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message..."
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? 'input-error' : ''}
              maxLength={500}
              title="Message should be at least 10 characters"
            />
            <div className="char-counter">{formData.message.length}/500</div>
            {errors.message && <span className="error-text">{errors.message}</span>}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <div className="loader"></div> : 'Send Message'}
          </button>
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

export default Contact;
