import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mid col auth">
      <h2>Welcome back!</h2>
      <form className="col">
        <label htmlFor="email">Email</label>
        <input 
          placeholder="Email"
          type="text" 
          name="email" 
          id="email"
        />
        <label htmlFor="password">Password</label>
        <input 
          placeholder="Password"
          type="text" 
          name="password" 
          id="password"
        />
      </form>
      <button type="submit">Login</button>
    </div>
  )
}

export default Login;