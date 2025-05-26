import React from 'react';
import { Navigate } from 'react-router-dom';

function RutaPrivada({ children, rolRequerido }) {
  const rol = localStorage.getItem("rol");

  //Si no existe el rolrequerido o si el rol es distinto al rol requerido redirige a una pagina de acceso denegado
  if (rolRequerido && rol !== rolRequerido) {
    return <Navigate to="/accesoDenegado" />;
  }

  return children; // Renderiza el contenido hijo si tiene acceso
}

export default RutaPrivada;
