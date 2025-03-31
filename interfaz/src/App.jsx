import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from "./components/Inicio";
import NavBar from "./components/NavBar";
import Login from "./components/Login";

function App() {
  return (
    <Router>
        <NavBar /> {/* El NavBar debe estar fuera de Routes si quieres que aparezca en todas las páginas */}
        <Routes>
          <Route path="/" element={<Inicio />} /> 
          <Route path="/login" element={<Login />} /> 
        </Routes>
    </Router>
  );
}

export default App;
