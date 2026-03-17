import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  return (
    <nav className="navbar glass-navbar">
      {/* Logo */}
      <img src={logo} alt="Logo" className="logo-img" />

      {/* Navigation Links */}
      <div className={`nav-links ${open ? 'open' : ''}`}>
        <NavLink to="/" onClick={closeMenu} className="nav-link" end>
          Home
        </NavLink>

        <NavLink to="/about" onClick={closeMenu} className="nav-link">
          About
        </NavLink>

        <NavLink to="/contact" onClick={closeMenu} className="nav-link">
          Contact
        </NavLink>
      </div>

      {/* Buttons */}
      <div className="navbar-buttons">
        <Link to="/login" onClick={closeMenu}>
          <button className="btn-outline">Login</button>
        </Link>

        <Link to="/signup" onClick={closeMenu}>
          <button className="btn-primary">Signup</button>
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <div className="menu-icon" onClick={toggleMenu}>
        {open ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;
