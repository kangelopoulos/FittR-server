import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ hasSession, setHasSession, setUser }) => {
  const handleLogout = () => {
    setUser({});
    setHasSession(false);
  };

  return (
    <nav>
      <h1>FittR</h1>
      <div className="links">
        {hasSession ? (
          <Link onClick={handleLogout} to="/" className="nav-link">
            Logout
          </Link>
        ) : (
          <>
            <Link to="/" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
