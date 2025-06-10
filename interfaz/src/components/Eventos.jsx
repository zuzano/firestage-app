import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './../css/eventos.module.css'

function Eventos() {
  //Muestra una cartelera con los eventos disponibles
  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#131313",
          height: "85vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <div className={styles.parent}>
          <div className={styles.div1} style={{
            backgroundImage:
              "url('./../../public/images/eventos/evento1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: '100%'
          }}></div>
          <div className={styles.div2}
          style={{
            backgroundImage:
              "url('./../../public/images/eventos/evento2.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: '100%'
          }}></div>
          <div className={styles.div3}
           style={{
            backgroundImage:
              "url('./../../public/images/eventos/evento3.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: '100%'
          }}></div>
          <div className={styles.div4} 
           style={{
            backgroundImage:
              "url('./../../public/images/eventos/Titulo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: '100%'
          }}
          ></div>
          <div className={styles.div5} 
           style={{
            backgroundImage:
              "url('./../../public/images/eventos/dragon.png')",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: '100%'
          }}
          ></div>
        </div>
      </Container>
    </>
  );
}

export default Eventos;
