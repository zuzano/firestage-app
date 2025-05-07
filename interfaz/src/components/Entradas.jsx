import React, { useState, useEffect } from "react";
import { Container,  Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";


import styles from "./../css/entradas.module.css";

function Entradas() {
  const [show, setShow] = useState(false);
  const [showEnviado, setShowEnviado] = useState(false);
  const [enviar, setEnviar] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const [tipo, setTipo] = useState(null)

  const handleClose = (e) => {
    setShow(false);
    setShowEnviado(false);
  };

  const handleClick = (tipo) => {
    setTipo(tipo);
    setShow(true);
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
          value={tipo}
          readOnly
          className={styles.input}
        />
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
              tipo: tipo,
              compradorId: usuario._id,
              email: usuario.email,
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
  }, [enviar, tipo]);
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
        <main className="d-flex w-100 justify-content-around text-white">
          <div
            className="d-flex flex-column justify-content-around align-items-center py-4"
            style={{
              backgroundColor: "#0B1B36",
              borderRadius: "5%",
              width: "20%",
            }}
          >
            <h1 className="mt-5 text-center" style={{ width: "50%" }}>
              ENTRADA GENERAL
            </h1>
            <h2 className="py-3 text-center">€25</h2>
            <p className="py-3" style={{ textAlign: "center", width: "50%" }}>
              Acceso general a la discoteca. Perfecto para disfrutar de la
              música y el ambiente.
            </p>
            <button onClick={() => {handleClick("general")}} className={styles.button}>Comprar Ahora</button>
          </div>
          <div
            className=" d-flex flex-column justify-content-around align-items-center  py-4"
            style={{
              backgroundColor: "#0B1B36",
              borderRadius: "5%",
              width: "20%",
            }}
          >
            <h1 className="mt-5 text-center" style={{ width: "50%" }}>
              ENTRADA VIP
            </h1>
            <h2 className="py-3 text-center">€150</h2>
            <p className="py-3" style={{ textAlign: "center", width: "50%" }}>
              Acceso prioritario, zona reservada cerca del escenario. Entrada
              rapida y exclusiva.
            </p>
            <Button
              variant="none"
              as={Link}
              to="/mesasVIP"
              className={styles.button}
            >
              Más información
            </Button>
          </div>
          <div
            className=" d-flex flex-column justify-content-around align-items-center py-4"
            style={{
              backgroundColor: "#0B1B36",
              borderRadius: "5%",
              width: "20%",
            }}
          >
            <h1 className="mt-5 text-center" style={{ width: "50%" }}>
              ENTRADA PREMIUM
            </h1>
            <h2 className="py-3 text-center">€500</h2>
            <p className="py-3" style={{ textAlign: "center", width: "50%" }}>
              Incluye todos los beneficios del VIP, mas 7 botellas con mezcla a
              elegir y palco privado.
            </p>
            <button onClick={() => {handleClick("premium")}} className={styles.button}>Comprar Ahora</button>
          </div>
          <div
            className=" d-flex flex-column justify-content-around align-items-center py-4"
            style={{
              backgroundColor: "#0B1B36",
              borderRadius: "5%",
              width: "20%",
            }}
          >
            <h1 className="mt-5 text-center">RESERVAR CUMPLEAÑOS</h1>
            <h2 className="py-3 text-center">€200</h2>
            <p className="py-3" style={{ textAlign: "center", width: "50%" }}>
              Incluye todos los beneficios del VIP, mas 2 botellas con mezcla a
              elegir y palco privado.
            </p>
            <button onClick={() => {handleClick("cumpleaños")}} className={styles.button}>Comprar Ahora</button>
          </div>
        </main>
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

export default Entradas;
