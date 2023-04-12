import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { FaAlignJustify, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Button, useColorMode } from "@chakra-ui/react";
import { FcFlashOn, FcFlashOff } from "react-icons/fc";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();

  const [toggleMenu, setToggleMenu] = useState(false);
  const btToken = JSON.parse(localStorage.getItem("btToken"));
  const navigate = useNavigate();
  const handleToggle = () => {
    setToggleMenu(!toggleMenu);
  };

  const handleLogout = () => {
    localStorage.setItem("btToken", null);
    navigate("/");
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
          <Link to="/" onClick={handleToggle}>
            Home
          </Link>
        </li>
        <li>
          {!btToken ? (
            <Link to="/login" onClick={handleToggle}>
              Login
            </Link>
          ) : (
            ""
          )}
        </li>
        <li>
          {btToken ? (
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/signup" onClick={handleToggle}>
              Signup
            </Link>
          )}
        </li>
        <li>
          <Link to="/mydashboard" onClick={handleToggle}>
            Dashboard
          </Link>
        </li>
      </ul>
      {colorMode == "light" ? (
        <FcFlashOff className="themeIcon" onClick={toggleColorMode} />
      ) : (
        <FcFlashOn className="themeIcon" onClick={toggleColorMode} />
      )}

      <div className="menu-icon" onClick={handleToggle}>
        {toggleMenu ? <FaTimes /> : <FaAlignJustify />}
      </div>
    </nav>
  );
}

export default Navbar;
