import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  InputGroup,
} from "react-bootstrap";

import { Icon } from "@iconify/react";

import TablaAdmin from "./TablaAdmin";

import { API_URL } from "../constants";

function PremiosAdmin() {
  // Inicializar Estados
  const [premios, setPremios] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const [premioId, setPremioId] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  //Manejar los premios que se añaden
  const handleChangePremios = (e) => {
    setDescripcion(e.target.value);
  };


  //Si no a añadido ninguna descripcion para el premio no se realiza la peticion de añadir premio
  const anadirPremio = async (e) => {
    if (!descripcion) return;
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/sorteos/anadirPremios`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ descripcion: descripcion, estado: 'activo' }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTitulo("Añadir Premio.");
        setMensaje(data.mensaje);
        setShow(true);
        setDescripcion("");
        await mostrarPremios();
      } else {
        setTitulo(data.error);
        setMensaje(data.mensaje);
        setShow(true);
      }
    } catch (err) {
      setTitulo("Error al añadir un premio.");
      setMensaje("Hubo un error al solicitar la petición.");
      setShow(true);
    }
  };

  // Maneja los cambios en los inputs del formulario, actualizando datosEditados
  const handleCambioInput = (e) => {
    const { name, value } = e.target;
    setDatosEditados((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja la acción de editar una entrada, estableciendo los datos y el ID
  const handleEditar = (premio) => {
    if (premio._id !== premioId) {
      setDatosEditados(premio);
      setPremioId(premio._id);
    }
  };

  // Maneja la eliminación de una entrada mediante una solicitud DELETE al servidor
  const handleClickEliminar = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/sorteos/eliminarPremio/` + id,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTitulo("Premio eliminado correctamente.");
        setMensaje(data.mensaje);
        setShow(true);
        await mostrarPremios();
      } else {
        setTitulo(data.error);
        setMensaje(data.mensaje);
        setShow(true);
      }
    } catch (err) {
      setTitulo("Error al eliminar el premio.");
      setMensaje("Hubo un error en el servidor.");
    }
  };

  // Maneja la actualización de una entrada mediante una solicitud PUT al servidor
  const handleClickActualizar = async (id) => {
    if (id !== premioId) {
      setPremioId(null);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/sorteos/editarPremio/` + id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            descripcion: datosEditados.descripcion,
            estado: datosEditados.estado
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setShow(true);
        setTitulo("Premio editado.");
        setMensaje(data.mensaje);
        setPremioId(null);
        setDatosEditados({});
        await mostrarPremios();
      } else {
        setTitulo(data.error);
        setMensaje(data.mensaje);
        setShow(true);
      }
    } catch (err) {
      setShow(true);
      setTitulo("Error al editar el premio");
      setMensaje("Hubo un error al solicitar la petición al servidor");
    }
  };

  // Obtiene y muestra las entradas mediante una solicitud GET al servidor
  const mostrarPremios = async () => {
    try {
      const response = await fetch(
        `${API_URL}/sorteos/mostrarPremiosAdmin`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPremios(data.premios); // Guardar los premios en el estado
      } else {
        setTitulo("Error al mostrar los premios.");
        setMensaje("Hubo un error al solicitar la petición.");
        setShow(true);
      }
    } catch (err) {
      setTitulo("Error al mostrar los premios.");
      setMensaje("Hubo un error al solicitar la petición.");
      setShow(true);
    }
  };

  //Solo se carga la primera vez que se renderiza el componente
  useEffect(() => {
    mostrarPremios();
  }, [])

  return (
    <Container fluid className="p-2">
      <h1 className="text-center text-white">PREMIOS</h1>
      <Form onSubmit={anadirPremio}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Introduce los premios a añadir en la ruleta"
            name="premios"
            value={descripcion || ""}
            onChange={handleChangePremios}
            required
          />
          <Button type="submit">Añadir</Button>
        </InputGroup>

        {premios.length !== 0 ? (
          <>
            <TablaAdmin cabecera={["descripcion", "estado"]}
              datos={premios}
              datosEditados={datosEditados}
              idActual={premioId}
              onEditar={handleCambioInput}
              handleEditar={handleEditar}
              onEliminar={handleClickEliminar}
              onActualizar={handleClickActualizar}
            />
          </>
        ) : (
          <>
            {" "}
            <Form.Label className="my-3 text-center text-white">
              No hay premios.
            </Form.Label>{" "}
          </>
        )}
      </Form>
      <Modal
        className="d-flex align-items-center"
        show={show}
        onHide={() => { setShow(false) }}
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

export default PremiosAdmin;
