import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className='pagess'>
    <div className="about-page">
      <div className="about-header">
        <h1>Welcome to T-Store</h1>
        <p>Your gateway to a vast library of Android applications</p>
      </div>

      <section className="about-section">
        <h2>What is T-Store?</h2>
        <p> 
          T-Store is a dynamic web-based platform designed to simplify the way users discover, explore, and download Android applications.
          Whether you're a tech enthusiast or a casual user, T-Store offers a streamlined experience similar to Google Play Store — but
          with a modern, developer-friendly twist.
        </p>
      </section>

      <section className="about-section">
        <h2>Why T-Store?</h2>
        <ul>
          <li>✅ Curated collection of verified Android apps</li>
          <li>✅ Clean, fast, and responsive user interface</li>
          <li>✅ Easy-to-navigate categories and app listings</li>
          <li>✅ One-click downloads</li>
          <li>✅ Developer-friendly submission system</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          We aim to provide a seamless platform that connects users with useful Android applications while empowering indie developers
          to showcase their innovations. T-Store is more than just an app library — it's a community built around discovery, accessibility, and trust.
        </p>
      </section>

      <section className="about-section team-section">
        <h2>Meet the Creator</h2>
        <div className="team-card">
          <img src="/logo.png" alt="Founder" />
          <div>
            <h3>Tushar Sharma</h3>
            <p>B.Tech CSE Student | Passionate Full-Stack Developer</p>
          </div>
        </div>
      </section>
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

export default About;
