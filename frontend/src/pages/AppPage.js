import { useEffect, useState } from 'react';
import axios from 'axios';
import './AppPage.css';

export default function AppPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    axios.get('https://tstore-dkcf.onrender.com/api/apps')
      .then(res => setApps(res.data))
      .catch(err => console.error("Error fetching apps:", err));
  }, []);

  return (
    <div className="app-page">
      <header className="hero-section">
        <h1>T-Store</h1>
        <p>Your T-Store for Trusted Android Apps</p>
      </header>

      <section className="info-section">
        <div className="card">
          <h2>Secure Downloads</h2>
          <p>All APKs are scanned and verified before uploading to ensure a safe experience for users.</p>
        </div>
        <div className="card">
          <h2>Easy Access</h2>
          <p>Download your favorite apps in one click. No redirects, no ads — just pure convenience.</p>
        </div>
        <div className="card">
          <h2>Users Friendly</h2>
          <p>Users can download and share their APKs easily and securely with just a few clicks.</p>
        </div>
      </section>

      <section className="app-list">
        <h2>Download APKs</h2>
        <div className="app-grid">
          {apps.map(app => (
            <div className="app-card" key={app._id}>
              <img
                src={app.bannerUrl || 'https://via.placeholder.com/400x180?text=App+Banner'}
                alt={app.title}
              />
              <div className="app-details">
                <h3>{app.title}</h3>
                <p>{app.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla.'}</p>
                <a href={app.apkUrl} download className="download-button">⬇ Download APK</a>
              </div>
            </div>
          ))}
        </div>
      </section>

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
}