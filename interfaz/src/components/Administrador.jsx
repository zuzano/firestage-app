import React, { useState, useEffect } from "react";
import {
  Container,Button
} from "react-bootstrap";
import { Icon } from "@iconify/react";

import UsuariosAdmin from "./UsuariosAdmin";
import PremiosAdmin from "./PremiosAdmin";
import EntradasAdmin from "./EntradasAdmin";

import styles from "./../css/administrador.module.css";

function Administrador() {

  const [eleccion, setEleccion] = useState(null)

  //Maneja el estado de eleccion
  const handleElegir = (tipo) => {
    setEleccion(tipo);
  };

  // Segun el estado muestra un componente o otro
  const mostrar = () => {
    switch (eleccion) {
      case "usuario":
        return <UsuariosAdmin/>
      case "premios":
        return <PremiosAdmin />
      case "entradas":
        return <EntradasAdmin />
      case "administrador":
        return setEleccion(null);
      default:
        return null;
    }
  }

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#131313",
          display: "flex",
          flexDirection: "column",
          justifyContent: 'center',
          alignItems: "center",
          height: '70vh',
        }}
      >
        {!eleccion ? <>
          <div className={styles.parent}>
            <div className={styles.div1} onClick={() => { handleElegir("usuario") }}>
              <Icon icon="majesticons:user" width="100px" height="100px" color="gray" />
            </div>
            <div className={styles.div3} onClick={() => { handleElegir("premios") }}>
              <Icon icon="dashicons:awards" width="100" height="100" color="rgba(255, 175, 2, 0.7)" />
            </div>
            <div className={styles.div4} onClick={() => { handleElegir("entradas") }}>
              <Icon icon="lets-icons:book-check-duotone" width="100px" height="100px" color="brown" />
            </div>
          </div>
        </> : <>
        {mostrar()}
        <Button variant="primary" className="my-2" onClick={() => { handleElegir("administrador") }}>Panel Administrador</Button>
        </>}

      </Container>
    </>
  );
}

export default Administrador;
