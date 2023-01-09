import React from "react";
import { Routes, Route } from 'react-router-dom';
import Nav from "./components/Nav.jsx";
import Login from "./containers/Login.jsx";
import Home from "./containers/Home.jsx";
import Register from "./containers/Register.jsx";
import "./styles/main.scss";

const App = () => {
  return (
    <div id="main">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  )
}

export default App;