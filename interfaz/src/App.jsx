import { useEffect, useState } from "react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Inicio from "./components/Inicio";
import Login from "./components/Login";
import Soporte from "./components/Soporte";
import Registro from "./components/Registro";
import Ruleta from "./components/Ruleta";
import Eventos from "./components/Eventos";
import MesasVip from "./components/MesasVip";
import Entradas from "./components/Entradas";
import Administrador from "./components/Administrador";
import Error404 from "./components/Error404";
import RutaPrivada from "./components/RutaPrivada";
import AccesoDenegado from "./components/AccesoDenegado";
import FormularioRestablecer from "./components/FormularioRestablecer";
import Perfil from "./components/Perfil";

import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <NavBar />{" "}
        {/* El NavBar debe estar fuera de Routes si quieres que aparezca en todas las páginas */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrarse" element={<Registro />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/mesasVIP" element={<MesasVip />} />
            <Route path="/entradas" element={<Entradas />} />
            <Route path="/soporte" element={<Soporte />} />
            <Route path="/premios" element={<Ruleta />} />
            <Route path="*" element={<Error404 />} /> {/*Devuele error 404 si no existe alguna url que introduzca el usuario*/}
            <Route
              path="/administrador"
              element={
                <RutaPrivada rolRequerido="admin">
                  <Administrador /> 
                </RutaPrivada>
              }
            />{/* //Componente hijo que se renderiza si se cumple la condicion */}

            <Route path="/accesoDenegado" element={<AccesoDenegado />} />
            <Route path="/restablecerContraseña/:usuarioID" element={<FormularioRestablecer />} />
            <Route path="/perfil" element={<Perfil />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
