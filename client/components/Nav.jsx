import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <nav>
      <h1>Fittr</h1>
      <div className="links">
        <Link to='/login' className="nav-link">Login</Link>
        <Link to='/register' className="nav-link">Register</Link>
      </div>
    </nav>
  )
}

export default Nav;