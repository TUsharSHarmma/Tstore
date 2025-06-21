import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-logo">
      <img src="/logo.png" alt="Logo" />
    </div>

    <div className="navbar-links">
      <NavLink to="/" className="nav-link" activeclassname="active" end>Home</NavLink>
      <NavLink to="/about" className="nav-link" activeclassname="active">About</NavLink>
      
      <NavLink to="/contact" className="nav-link" activeclassname="active">Contact</NavLink>
    </div>

    <div className="navbar-buttons">
      {/* Wrap buttons with Link to navigate */}
      <Link to="/login">
        <button className="btn-outline">Login</button>
      </Link>
      <Link to="/signup">
        <button className="btn-primary">Signup</button>
      </Link>
    </div>
  </nav>
);


export default Navbar;
