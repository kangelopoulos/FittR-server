import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mid col auth">
      <h2>Welcome back!</h2>
      <form className="col">
        <label htmlFor="username">Username</label>
        <input type="text" required/>
        <label htmlFor="username">Password</label>
        <input type="text" required/>
      </form>
      <button type="submit">Login</button>
    </div>
  )
}

export default Login;