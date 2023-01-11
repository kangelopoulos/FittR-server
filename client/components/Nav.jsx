import React from "react";
import { Link } from "react-router-dom";


const Nav = () => {
  return (
    <nav>
      <h1>FittR</h1>
      <div className="links">
        <Link to='/' className="nav-link">Login</Link>
        <Link to='/register' className="nav-link">Register</Link>
      </div>
    </nav>
  )
}

export default Nav;