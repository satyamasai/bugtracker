import React, { useState } from "react";
import "./Navbar.css";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";


function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
 


  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

 

  return (
    <nav>
      <div className="logo">
        <img
          src="https://photos.fliarbi.com/5dfdb0bfd1b18-logo.png"
          alt="logo"
        />
      </div>
      <ul className={toggleMenu ? "nav-links mobile" : "nav-links"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/login">Login</Link>
        </li>
        <li>
        <Link to="/signup">Signup</Link>
        </li>
       
   
       
      </ul>
      <div className="menu-icon" onClick={handleToggle}>
        {toggleMenu ? <FaTimes /> : <FaAlignJustify />}
      </div>
    </nav>
  );
}

export default Navbar;
