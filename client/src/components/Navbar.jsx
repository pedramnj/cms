import React from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><a href="/" className="navbar-link">Home</a></li>
        <li><a href="/create" className="navbar-link">Create Page</a></li>
        <li><a href="/login" className="navbar-link">Login</a></li>
        <li><a href="/logout" className="navbar-link">Logout</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
