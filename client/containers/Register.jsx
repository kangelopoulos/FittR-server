
import React from "react";
import { useState } from "react";
import Message from '../components/Message.jsx';
import axios from "axios";

const Register = ({ user_id }) => {
  // Hooks for form
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Hooks for error messaging
  const [err, setErr] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email || !password || !confirmPassword || !displayName){
      console.log('here');
      setMsg('Please fill out all fields.');
      setErr(true);
    } else if (confirmPassword !== password) {
      setMsg('Passwords must match');
      setErr(true);
    } else { 
      const response = axios.post('/auth/signup', {
        email: email, 
        password: password, 
        confirmPassword: confirmPassword,
        displayName: displayName
      });
      console.log(response);
    }
  }

  return (
    <div className="mid col auth">
      <h2>Welcome to FittR!</h2>
      <form id="register" className="col auth-form">
        <label htmlFor="email">Email</label>
        <input 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email"
          type="email" 
          name="email" 
          id="email" 
        />
        <label htmlFor="name">Display Name</label>
        <input 
          onChange={e => setDisplayName(e.target.value)} 
          type="text" 
          name="name" 
          id="name"
        />
        <label htmlFor="password">Password</label>
        <input 
          onChange={e => setPassword(e.target.value)} 
          type="password" 
          name="password" 
          id="password" 
        />
        <label htmlFor="confirm">Confirm Password</label>
        <input 
          onChange={e => setConfirmPassword(e.target.value)} 
          type="password" 
          name="confirm" 
          id="confirm" 
        />
      </form>
      <button onClick={handleSubmit} type="submit">Submit</button>
      <Message error={err} message={msg}/>
    </div>
  )
}

export default Register;