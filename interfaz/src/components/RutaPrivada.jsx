import React from 'react';
import { Navigate } from 'react-router-dom';

function RutaPrivada({ children, rolRequerido }) {
  const rol = localStorage.getItem("rol");


  if (rolRequerido && rol !== rolRequerido) {
    return <Navigate to="/accesoDenegado" />;
  }

  return children; // Renderiza el contenido hijo si tiene acceso
}

export default RutaPrivada;
