import React, { useState, useEffect } from "react";
import {
  Container,
  Modal,
  Form,
} from "react-bootstrap";

import TablaAdmin from "./TablaAdmin";

import { API_URL } from "../constants";

function EntradasAdmin() {
  // Define estados para entradas, visibilidad del modal, título, mensaje, ID de entrada y datos editados
  const [entradas, setEntradas] = useState([]);
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const [entradaId, setEntradaId] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  // Maneja los cambios en los inputs del formulario, actualizando datosEditados
  const handleCambioInput = (e) => {
    const { name, value } = e.target;
    setDatosEditados((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja la acción de editar una entrada, estableciendo los datos y el ID
  const handleEditar = (entrada) => {
    setDatosEditados(entrada);
    setEntradaId(entrada._id);
  };

  // Maneja la eliminación de una entrada mediante una solicitud DELETE al servidor
  const handleClickEliminar = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/reservas/eliminarEntrada/` + id,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTitulo("entrada eliminada correctamente.");
        setMensaje(data.mensaje);
        setShow(true);
        await mostrarEntradas();
      } else {
        setTitulo(data.error);
        setMensaje(data.mensaje);
        setShow(true);
      }
    } catch (err) {
      setTitulo("Error al eliminar la entrada.");
      setMensaje("Hubo un error en el servidor.");
    }
  };


  // Maneja la actualización de una entrada mediante una solicitud PUT al servidor
  const handleClickActualizar = async (id) => {
    //Por si hace click en otro boton y no tenga los mismos datos
    if (id !== entradaId) {
      setEntradaId(null);
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/reservas/editarEntrada/` + id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: datosEditados.tipo,
            subtipo: datosEditados.subtipo || undefined,
            comprador: datosEditados.comprador,
            fechaCompra: datosEditados.fechaCompra
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setShow(true);
        setTitulo("Entrada editada.");
        setMensaje(data.mensaje);
        setEntradaId(null);
        setDatosEditados({});
        await mostrarEntradas();
      } else {
        setTitulo(data.error);
        setMensaje(data.mensaje);
        setShow(true);
      }
    } catch (err) {
      console.error("Error fetch:", err);
      setShow(true);
      setTitulo("Error al editar la entrada");
      setMensaje("Hubo un error al solicitar la petición al servidor");
    }
  };

  // Obtiene y muestra las entradas mediante una solicitud GET al servidor
  const mostrarEntradas = async () => {
    try {
      const response = await fetch(
        `${API_URL}/reservas/mostrarEntradas`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEntradas(data.entradas); // Guardar los premios en el estado
      } else {
        setTitulo("Error al mostrar las entradas.");
        setMensaje("Hubo un error al solicitar la petición.");
        setShow(true);
      }
    } catch (err) {
      setTitulo("Error al mostrar los entradas.");
      setMensaje("Hubo un error al solicitar la petición.");
      setShow(true);
    }
  };

  //Solo se carga la primera vez que se renderiza el componente
  useEffect(() => {
    mostrarEntradas();
  }, [])

  return (
    <Container fluid>
      <h1 className="text-center text-white">ENTRADAS</h1>
      <div className="d-flex flex-column" style={{ overflow: 'auto', maxHeight: '40vh' }}>

        {entradas.length !== 0 ? (
          <>
            <TablaAdmin cabecera={["tipo", "subtipo", "comprador", "fechaCompra"]}
              datos={entradas}
              datosEditados={datosEditados}
              idActual={entradaId}
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
              No hay entradas.
            </Form.Label>{" "}
          </>
        )}
      </div>
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

export default EntradasAdmin;
