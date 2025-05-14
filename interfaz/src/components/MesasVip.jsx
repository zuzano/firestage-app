import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import styles from "./../css/mesasvip.module.css";

import Calendario from "./Calendario";

function MesasVip() {
  const [show, setShow] = useState(false);
  const [showEnviado, setShowEnviado] = useState(false);
  const [enviar, setEnviar] = useState(false);
  const [subtipo, setSubtipo] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const [fecha, setFecha] = useState("");

  const handleClose = (e) => {
    setShow(false);
    setShowEnviado(false);
  };

  const handleClick = async (subtipo) => {
        setSubtipo(subtipo);
        setShow(true);

  };

  const handleFechaSeleccionada = (fecha) => {
    setFecha(fecha);
  };

  const hacerReserva = (usuario) => {
    return (
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          setEnviar(true);
        }}
      >
        <input
          type="text"
          placeholder="Email"
          required
          readOnly
          value={usuario.email}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Tipo"
          disabled
          value="vip"
          readOnly
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Subtipo"
          required
          readOnly
          value={subtipo || ""}
          className={styles.input}
        />
        <div className={styles.input}>
          <Calendario onFechaSeleccionada={handleFechaSeleccionada} tipo={"vip"}/>
        </div>
        <button type="submit" disabled={enviar}>
          {enviar ? "Enviando..." : "Enviar"}
        </button>
      </form>
    );
  };

  useEffect(() => {
    if (!enviar) return;

    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      return;
    }

    const comprarEntrada = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/reservas/comprarEntrada",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              tipo: "vip",
              subtipo: subtipo,
              compradorId: usuario._id,
              email: usuario.email,
              fechaCompra: fecha,
            }),
          }
        );
        const data = await response.json();

        if (response.status !== 201) {
          setMensaje(data.error);
          setShow(false);
          setShowEnviado(true);
        } else {
          setMensaje(data.mensaje);
          setShow(false);
          setShowEnviado(true);
        }
      } catch (err) {
        setMensaje("Error al conectar con el servidor");
        setShow(false);
        setShowEnviado(true);
      } finally {
        setEnviar(false);
      }
    };

    comprarEntrada();
  }, [enviar, subtipo]);

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#131313",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "100px",
        }}
      >
        <section className="text-white">
          <h1 className="text-center fw-bold">Vive la noche como un VIP</h1>
          <h2>
            Reserva tu mesa y disfruta de una experiencia exclusiva, sin esperas
            ni agobios.
          </h2>
        </section>
        <section className="text-white mt-5">
          <h2 className="fw-bold">BENEFICIOS DE RESERVAR UNA MESA VIP</h2>
          <div className="d-flex justify-content-around mt-5">
            <div
              className="d-flex flex-column justify-content-center align-items-center fw-bold"
              style={{
                backgroundColor: "#fff",
                color: "black",
                width: "30%",
                textAlign: "center",
                padding: "4%",
                borderRadius: "5%",
              }}
            >
              <Icon
                icon="la:star"
                width="80"
                height="80"
                style={{ marginBottom: "4%" }}
              />
              Acceso prioritario
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center fw-bold"
              style={{
                backgroundColor: "#fff",
                color: "black",
                width: "30%",
                textAlign: "center",
                padding: "4%",
                borderRadius: "5%",
              }}
            >
              <Icon
                icon="ion:person-outline"
                width="64"
                height="64"
                style={{ marginBottom: "4%" }}
              />
              Servicio Personalizado
            </div>
            <div
              className="d-flex flex-column justify-content-center align-items-center fw-bold"
              style={{
                backgroundColor: "#fff",
                color: "black",
                width: "30%",
                textAlign: "center",
                padding: "4%",
                borderRadius: "5%",
              }}
            >
              <Icon
                icon="quill:vip"
                width="80"
                height="80"
                style={{ marginBottom: "4%" }}
              />
              Zona Exclusiva
            </div>
          </div>
        </section>
        <section className="text-white my-5 w-100 h-100">
          <div className="d-flex justify-content-center w-100 h-100">
            <div
              className="text-center d-flex flex-column align-items-center me-5 pt-3 fw-bold"
              style={{
                backgroundImage:
                  "linear-gradient( 79.8deg,  rgba(101,132,154,1) 3.2%, rgba(160,197,201,1) 89.1% )",
                color: "black",
                width: "20%",
                borderRadius: "5%",
              }}
            >
              <h2>Pack Plata</h2>
              <h1>€ 100</h1>
              <ul style={{ padding: "0px", textAlign: "left" }}>
                <li>Con botella</li>
                <li>6 refrescos</li>
                <li>Con mesa</li>
              </ul>
              <button
                onClick={() => {
                  handleClick("plata");
                }}
                className={styles.button}
              >
                Reservar
              </button>
            </div>
            <div
              className="text-center d-flex flex-column align-items-center py-3 fw-bold"
              style={{
                backgroundImage:
                  "linear-gradient( 109.6deg,  #fff923 11.5%, rgba(243,161,0,1) 91.1% )",
                color: "black",
                width: "20%",
                borderRadius: "5%",
              }}
            >
              <h2>Pack Oro</h2>
              <h1>€ 150</h1>
              <ul style={{ padding: "0px", textAlign: "left" }}>
                <li>Con 2 botellas</li>
                <li>4 refrescos</li>
                <li>Cerca del DJ</li>
              </ul>
              <button
                onClick={() => {
                  handleClick("oro");
                }}
                className={styles.button}
              >
                Reservar
              </button>
            </div>
            <div
              className="text-center d-flex flex-column align-items-center ms-5 pt-3 fw-bold"
              style={{
                backgroundImage:
                  "linear-gradient( 91.9deg,  rgba(75,207,250,1) 6.3%, rgba(25,159,249,1) 98.9% )",
                color: "black",
                width: "20%",
                borderRadius: "5%",
              }}
            >
              <h2>Pack Diamante</h2>
              <h1>€ 250</h1>
              <ul style={{ padding: "0px", textAlign: "left" }}>
                <li>Con 4 botellas</li>
                <li>Refrescos ilimitados</li>
                <li>Al lado del DJ</li>
              </ul>
              <button
                onClick={() => {
                  handleClick("diamante");
                }}
                className={styles.button}
              >
                Reservar
              </button>
            </div>
          </div>
        </section>
        <Modal
          className="d-flex align-items-center"
          show={show}
          onHide={handleClose}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Reservar Ahora</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {localStorage.getItem("usuario") ? (
              hacerReserva(JSON.parse(localStorage.getItem("usuario")))
            ) : (
              <p>Para poder hacer una reserva debes tener una cuenta.</p>
            )}
          </Modal.Body>
        </Modal>
        <Modal
          className="d-flex align-items-center"
          show={showEnviado}
          onHide={handleClose}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Resultado de la reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>{mensaje}</Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default MesasVip;
