import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import confetti from "canvas-confetti";

function Premios() {
  const [premios, setPremios] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState("");
const [mensaje, setMensaje] = useState(null);



  const handleChangePremios = (e) => {
    setDescripcion(e.target.value);
  };

  const anadirPremio = async (e) => {
    if(!descripcion) return;
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/sorteos/anadirPremios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({descripcion: descripcion,estado: 'activo'}),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTitulo("Añadir Premio.");
        setMensaje(data.mensaje);
        setShow(true);
        setDescripcion("");
      } else {
        setTitulo(data.error);
        setMensaje(data.mensaje);
        setShow(true);
      }
    } catch (err) {
      setTitulo("Error al añadir un premio.");
      setMensaje(err.message);
    }
  };

  useEffect(() => {
    if(!premios) return;

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
  },[premios])

  return (
    <Container fluid>
      <h1 className="text-center text-white">PREMIOS</h1>
      <Form onSubmit={anadirPremio}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Introduce los premios a añadir en la ruleta"
            name="premios"
            value={descripcion || ""}
            onChange={handleChangePremios}
          />
          <Button type="submit">Añadir</Button>
        </InputGroup>
        <div className="d-flex flex-column">

        {premios.length !== 0 ? (
          premios.map((item, i) =>
            <div key={i} className="bg-white d-flex justify-content-around my-2" style={{borderRadius: '5px'}}>
                <Form.Label className="fs-4 px-2 py-2" >Descripción: {item.descripcion}</Form.Label>
                <Form.Label className="fs-4 px-2 py-2" >Estado: {item.estado}</Form.Label>
            </div>
          )
        ) : (
          <>
            {" "}
            <Form.Label className="my-3 text-center text-white">
              No hay premios.
            </Form.Label>{" "}
          </>
        )}
        </div>
      </Form>
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
  );
}

export default Premios;
