import React from "react";


const Register = () => {
  return (
    <div className="mid col auth">
      <h2>Welcome to FittR!</h2>
      <form className="col auth-form">
        <label htmlFor="username">Email</label>
        <input type="email" name="username" id="username" />
        <label htmlFor="name">Display Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="confirm">Confirm Password</label>
        <input type="password" name="confirm" id="confirm" />
      </form>
      <button type="submit">Submit</button>
    </div>
  )
}

export default Register;