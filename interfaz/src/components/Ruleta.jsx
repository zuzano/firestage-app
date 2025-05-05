import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import { Wheel } from "react-custom-roulette";

import styles from './../css/ruletas.module.css'
import confetti from "canvas-confetti";

function Ruleta() {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [premios,setPremios] = useState([]);
    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [mensaje, setMensaje] = useState("");
  
    const handleSpinClick = () => {
      if (!mustSpin) {
        const newPrizeNumber = Math.floor(Math.random() * premios.length);
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
      }
    }

    // POR HACER --> Que la primera vez que tire de la ruleta el salga un mensaje al usuario que le diga que tiene que tener un usuario, limitar las tiradas

     useEffect(() => {
    
        const mostrarPremios = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/sorteos/mostrarPremios",
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setPremios(data.premios); // Guardar los usuarios en el estado
                } else {
                    console.log(data.mensaje);
                }
            } catch (err) {
                console.error("Error al obtener usuarios:", err);
            }
        };
    
        mostrarPremios();
      },[])
  
  return (
    <>
      <Container fluid style={{ backgroundColor: "#131313", height: "80vh", display:'grid', placeItems:'center' }}>

      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={premios.length > 0 ? premios.map(premio => ({ option: premio.descripcion })) : [{ option: 'Cargando...' }]}
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
          "#871f7f"
        ]}

        onStopSpinning={() => {
          setMustSpin(false);
          setTitulo("¡Premio!");
          setMensaje(premios[prizeNumber]?.descripcion || "¡Felicidades!");
          setShow(true)
          confetti();
        }}
      />
        <button className={styles.btnClassName} onClick={handleSpinClick}>
        <span className={styles.back} />
        <span className={styles.front} />
      </button>
      <Modal
        className="d-flex align-items-center"
        show={show}
        onHide={() => {setShow(false)}}
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
