import React, { useState, useEffect } from "react";
import {
  Container,
  Modal,
  Form,
} from "react-bootstrap";

import TablaAdmin from "./TablaAdmin";

function EntradasAdmin() {
  const [entradas, setEntradas] = useState([]);
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const [entradaId, setEntradaId] = useState(null);
      const [datosEditados, setDatosEditados] = useState({});

  const handleCambioInput = (e) => {
        const { name, value } = e.target;
        setDatosEditados((prev) => ({ ...prev, [name]: value }));
    };

  const handleEditar = (entrada) => {
        setDatosEditados(entrada);
        setEntradaId(entrada._id);
    };

    const handleClickEliminar = async (id) => {
        try {
            const response = await fetch(
                "http://localhost:5000/reservas/eliminarEntrada/" + id,
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

    const handleClickActualizar = async (id) => {
        if (id !== entradaId) {
            setEntradaId(null);
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/reservas/editarEntrada/" + id,
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

  const mostrarEntradas = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/reservas/mostrarEntradas",
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
