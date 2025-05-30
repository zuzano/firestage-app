import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styles from "./../css/soporte.module.css";
import { Icon } from "@iconify/react";

import { API_URL } from "../constants";

function Soporte() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviar, setEnviar] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  //Realiza la peticion de contactar si enviar es true
  useEffect(() => {
    if (!enviar) return;

    const contactar = async () => {
      try {
        const response = await fetch(
          `${API_URL}/usuarios/contactar`,
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

  //Maneja el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setEnviar(true);
  };

  //Maneja el cierre del modal
  const handleClose = (e) => {
    setShow(false);
  };

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#131313",
          display: "flex",
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
            height: "85vh",
        }}
      >
        <div className="d-flex flex-column w-70 mt-5">
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
              <h1 className="text-white" style={{ fontSize: "2em" }}>
                MOVIL
              </h1>
              <p className="text-white p-0 m-0">648 793 805</p>
            </div>
            <div className={styles.iconos}>
              <Icon
                icon="simple-line-icons:location-pin"
                width="80"
                height="80"
                color="black"
              />
            </div>
            <div className="d-flex flex-column">
              <h1 className="text-white" style={{ fontSize: "2em" }}>
                DIRECCIÓN
              </h1>
              <p className="text-white p-0 m-0">Fernández de los Ríos 67
              Madrid</p>
            </div>
            <div className={styles.iconos}>
              <Icon icon="uiw:mail" width="80" height="80" color="black" />
            </div>
            <div className="d-flex flex-column">
              <h1 className="text-white" style={{ fontSize: "2em" }}>
                EMAIL
              </h1>
              <p className="text-white p-0 m-0">info@firestage.es</p>
            </div>
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
