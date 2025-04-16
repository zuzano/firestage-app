import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./../css/soporte.module.css";
import { Icon } from "@iconify/react";

function Soporte() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviar, setEnviar] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!enviar) return;

    const contactar = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/usuarios/contactar",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: correo,
              asunto: asunto,
              mensaje: mensaje,
            }),
          }
        );
        const data = await response.json();

        if (response.status !== 200) {
          setError(data.mensaje || "Error al enviar el correo");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setShow(true);
        setEnviar(false);
      }
    };

    contactar();
  }, [enviar, nombre, correo, asunto, mensaje, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setEnviar(true);
  };

  const handleClose = (e) => {
    setShow(false);
  };

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
        <div className="d-flex flex-column w-50">
          <div className="d-flex align-items-center justify-content-around">
            <div className={styles.iconos}>
              <Icon
                icon="heroicons:phone-solid"
                width="80"
                height="80"
                color="black"
              />
            </div>
            <div className="d-flex flex-column">

              <h1 className="text-white" style={{fontSize:'2em'}}>MOVIL</h1>
              <p className="text-white p-0 m-0">648 693 804</p>
            </div>
            <div className={styles.iconos}>
              <Icon
                icon="simple-line-icons:location-pin"
                width="80"
                height="80"
                color="black"
              />
            </div>
            <h1 className="text-white" style={{fontSize:'2em'}}>DIRECCIÓN</h1>
            <div className={styles.iconos}>
              <Icon icon="uiw:mail" width="80" height="80" color="black" />
            </div>
            <h1 className="text-white" style={{fontSize:'2em'}}>EMAIL</h1>
          </div>
        </div>
        {/* Form by Yaya12085 en uiverse.io*/}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.title}>Contactanos</div>
          <input
            type="text"
            placeholder="Nombre"
            required
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setCorreo(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="Asunto"
            required
            onChange={(e) => setAsunto(e.target.value)}
            className={styles.input}
          />
          <textarea
            placeholder="Mensaje"
            onChange={(e) => setMensaje(e.target.value)}
            defaultValue={""}
          />
          <button>Enviar</button>
        </form>
        <Modal
          className="d-flex align-items-center"
          show={show}
          onHide={handleClose}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Mensaje Enviado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error !== null ? error : "Tu mensaje se ha realizado con exitó."}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Soporte;
