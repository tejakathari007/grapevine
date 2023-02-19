import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AdminValue } from "../Context/AdminContext";
import "./nav.css";
const Nav = () => {
  const [changeColor, setChangeColor] = useState(false);
  const { admin, setAdmin } = useContext(AdminValue);
  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  useEffect(() => {
    const scrollHandler = () => { 
      if (window.scrollY > 40) {
        setChangeColor(true);
      } else {
        setChangeColor(false);
      }
    }
    window.addEventListener(`scroll`, scrollHandler);
    return () => {
      window.removeEventListener(`scroll`, scrollHandler)
    }
  }, []);
  return (
    <nav
      className="navbar navbar-light sticky-top navbar-expand-sm"
      style={{
        backgroundColor: !changeColor ? "transparent" : "rgb(249, 228, 249)",
      }}
    >
      <a className="navbar-brand" href="#" style={{ marginLeft: "10%" }}>
        <img
          src={require("../Assets/Logo.png")}
          width="50"
          height="50"
          alt=""
        />
      </a>
      <ul
        className="navbar-nav"
        style={{
          marginLeft: "5%",
        }}
      >
        <li className="nav-item active">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/privacy-policy" className="nav-link">
            Privacy Policy
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/terms-of-service" className="nav-link">
            Terms Of Services
          </Link>
        </li>
        <li className="nav-item active">
          <Link to="/users" className="nav-link">
            Users
          </Link>
        </li>
      </ul>
      {admin && (
        <button
          style={{
            background: "#ff00ff",
            borderWidth: "0px",
            padding: "5px",
            borderRadius: "10px",
            position: "absolute",
            right: "5%",
            fontWeight: "600",
            color: "#fff",
          }}
          onClick={logout}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Nav;
