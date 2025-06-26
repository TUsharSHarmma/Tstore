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
      <img src={logo} alt="Logo" className="logo-img" />
 
      <div className={`nav-links ${open ? 'open' : ''}`}>
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



      <div className="menu-icon" onClick={toggleMenu}>
        {open ? <FaTimes /> : <FaBars />}
      </div>
    </nav>
  );
}

export default Navbar;