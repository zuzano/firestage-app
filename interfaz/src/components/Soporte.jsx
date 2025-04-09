import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./../css/soporte.css";

function Soporte() {
  return (
    <>
      <Container fluid style={{ backgroundColor: "#131313", height: "80vh", display:'grid', placeItems:'center' }}>
        {/* Form by Yaya12085 en uiverse.io*/}
        <form className="form">
          <div className="title">Contactanos</div>
          <input type="text" placeholder="Tu correo" className="input" />
          <textarea placeholder="Mensaje" defaultValue={""} />
          <button>Submit</button>
        </form>
      </Container>
    </>
  );
}

export default Soporte;
