import React from "react";
import { Link } from "react-router-dom";

function Error404() {
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
        <h1>404 - Página no encontrada</h1>
        <p>La página que estás buscando no existe.</p>
        <Link to="/">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default Error404;
