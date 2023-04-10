import React, { useState } from "react";
import "./Navbar.css";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button, useColorMode } from "@chakra-ui/react";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  const [toggleMenu, setToggleMenu] = useState(false);
 


  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

 

  return (
    <nav>
      <div className="logo">
        <img
          src="https://static.vecteezy.com/system/resources/previews/006/730/439/original/ladybug-character-illustration-cartoon-ladybug-isolated-on-white-background-free-vector.jpg"
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
        <li>
        <Link to="/mydashboard">Dashboard</Link>
        </li>
       
   
       
      </ul>
      <Button size="sm" colorScheme="blue" onClick={toggleColorMode}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
      <div className="menu-icon" onClick={handleToggle}>
        {toggleMenu ? <FaTimes /> : <FaAlignJustify />}
      </div>
    </nav>
  );
}

export default Navbar;
