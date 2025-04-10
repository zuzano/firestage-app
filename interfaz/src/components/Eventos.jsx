import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './../css/eventos.module.css'

function Eventos() {
  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#131313",
          height: "80vh",
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
            width: '80%'
          }}></div>
          <div className={styles.div2}></div>
          <div className={styles.div3}></div>
          <div className={styles.div4}></div>
        </div>
      </Container>
    </>
  );
}

export default Eventos;
