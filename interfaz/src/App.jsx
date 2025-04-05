import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from "./components/Inicio";
import NavBar from "./components/NavBar";
import Footer from  "./components/Footer"
import Login from "./components/Login";
import Registro from "./components/Registro";

import './App.css';

function App() {
  return (
    <div className="app-wrapper">
    <Router>
        <NavBar /> {/* El NavBar debe estar fuera de Routes si quieres que aparezca en todas las páginas */}
        <div className="main-content">
        <Routes>
          <Route path="/" element={<Inicio />} /> 
          <Route path="/login" element={<Login />} /> 
          <Route path="/registrarse" element={<Registro />} /> 
        </Routes>
        </div>
        <Footer />
    </Router>
    </div>
  );
}

export default App;
