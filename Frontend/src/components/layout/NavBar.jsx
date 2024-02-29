import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Context } from "../../main";
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa"; // Using a placeholder light mode icon
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, setMode, isAuthenticated, user, setIsAuthenticated } = useContext(Context);

  const handleNavbar = () => {
    setShow(!show);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <section
      className={
        location.pathname === "/dashboard"
          ? "hideNavbar"
          : mode === "light"
          ? "header light-navbar"
          : "header dark-navbar"
      }
    >
      <nav>
        <div className="logo">
          Lazzy<span>C</span><span style={{color: "red"}}>o</span><span>de</span>
        </div>
        <div className={show ? "links show" : "links"}>
          <ul>
            <li>
              <Link to={"/"} onClick={handleNavbar}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/blogs"} onClick={handleNavbar}>
                ARTICLES
              </Link>
            </li>
            <li>
              <Link to={"/authors"} onClick={handleNavbar}>
                ALL AUTHORS
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={handleNavbar}>
                ABOUT
              </Link>
            </li>
          </ul>
          <div className="btns">
            <button
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
              className={`mode-btn ${mode === "light" ? "light-mode" : "dark-mode"}`}
            >
              {mode === "light" ? <FaSun className="light-icon" /> : <MdDarkMode className="dark-icon" />}
            </button>
            {isAuthenticated && user.role === "Author" && (
              <Link to={"/dashboard"} onClick={handleNavbar} className="dashboard-btn">
                Dashboard
              </Link>
            )}
            {!isAuthenticated ? (
              <Link to={"/login"} onClick={handleNavbar} className="login-btn">
                Login
              </Link>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
        <RxHamburgerMenu className="hamburger" onClick={handleNavbar} />
      </nav>
    </section>
  );
};

export default Navbar;
