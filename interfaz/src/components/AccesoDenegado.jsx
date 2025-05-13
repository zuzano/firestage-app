import React from "react";
import { Link } from "react-router-dom";

function AccesoDenegado() {
  return (
    <div
      className="text-center mt-5"
      style={{
        display: "grid",
        placeItems: "center",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "1fr",
        height: "70vh",
      }}
    >
      <div>
        <h1>403 - Acceso denegado</h1>
        <p>No tienes permisos para ver esta página.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default AccesoDenegado;
