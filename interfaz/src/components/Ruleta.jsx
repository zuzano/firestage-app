import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import { Wheel } from "react-custom-roulette";

import styles from "./../css/ruletas.module.css";
import confetti from "canvas-confetti";

import { API_URL } from "../constants";

function Ruleta() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [premios, setPremios] = useState([]);
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleSpinClick = async () => {
    if (!usuario) {
      setShow(true);
      setTitulo("¡Aún no estas listo!");
      setMensaje("Primero debes tener una cuenta para poder usar la ruleta.");
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}/sorteos/comprobarTiradas/` + usuario._id,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (response.ok) {
        if (data.tiradas > 0 && !mustSpin) {
          const newPrizeNumber = Math.floor(Math.random() * premios.length);
          setPrizeNumber(newPrizeNumber);
          setMustSpin(true);
        }
      } else {
        setTitulo("Tiradas Agotadas");
        setMensaje(data.error);
        setShow(true);
      }
    } catch (err) {
      console.error("Error al validar tiradas", err);
      setTitulo("Error");
      setMensaje("Hubo un problema al validar tus tiradas.");
      setShow(true);
    }
  };

  const darPremios = async (descripcion) => {
    try {
      const response = await fetch(
        `${API_URL}/sorteos/anadirPremioUsuario`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            _idusuario: usuario._id,
            premio: descripcion,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMensaje(data.mensaje); 
      } else {
        setMensaje(data.error);
      }
    } catch (err) {
      setMensaje(data.error);
    }
  };


  useEffect(() => {
    const mostrarPremios = async () => {
      try {
        const response = await fetch(
          `${API_URL}/sorteos/mostrarPremios`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setPremios(data.premios);
        } else {
          console.log(data.mensaje);
        }
      } catch (err) {
        console.error("Error al obtener los premios", err);
      }
    };

    mostrarPremios();
  }, []);

  return (
    <>
      <Container
        fluid
        style={{
          backgroundColor: "#131313",
          height: "auto",
          display: "grid",
          placeItems: "center",
          padding: "2%",
        }}
      >
        {premios.length > 0 ? (
          <>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={prizeNumber}
              data={
                premios.length > 0
                  ? premios.map((premio) => ({ option: premio.descripcion }))
                  : [{ option: "" }]
              }
              outerBorderColor={["#ccc"]}
              outerBorderWidth={[9]}
              innerBorderColor={["#f2f2f2"]}
              radiusLineColor={["tranparent"]}
              radiusLineWidth={[1]}
              textColors={["#f5f5f5"]}
              textDistance={55}
              fontSize={[20]}
              backgroundColors={[
                "#3f297e",
                "#175fa9",
                "#169ed8",
                "#239b63",
                "#64b031",
                "#efe61f",
                "#f7a416",
                "#e6471d",
                "#dc0936",
                "#e5177b",
                "#be1180",
                "#871f7f",
              ]}
              onStopSpinning={() => {
                setMustSpin(false);
                darPremios(premios[prizeNumber]?.descripcion);
                setTitulo("¡Premio!");
                setShow(true);
                confetti();
              }}
            />
            <button className={styles.btnClassName} onClick={handleSpinClick}>
              <span className={styles.back} />
              <span className={styles.front} />
            </button>
          </>
        ) : (
          <>
            <div
              className="bg-white d-flex justify-content-around my-2 p-4"
              style={{ borderRadius: "5px" }}
            >
              <p className="fw-8">
                De momento no hay premios, vuelve más tarde.
              </p>
            </div>
          </>
        )}
        <Modal
          className="d-flex align-items-center"
          show={show}
          onHide={() => {
            setShow(false);
          }}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>{titulo}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{mensaje}</Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Ruleta;
