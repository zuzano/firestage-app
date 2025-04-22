import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Table,
  Form,
  InputGroup,
  Label
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import styles from "./../css/administrador.module.css";

function Administrador() {
  const [usuarios, setUsuarios] = useState([]);
  const [premio, setPremio] = useState(null);
  const [show, setShow] = useState(false);
  const [titulo, setTitulo] = useState(null);
  const [mensaje, setMensaje] = useState(null);

  const [editar, setEditar] = useState(false);
  const [usuarioId, setUsuarioId] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  const handleSubmit = () => {};

  const handleChangePremios = () => {};

  const handleClose = () => {
    setShow(false);
  };

  const handleCambioInput = (e) => {
    const { name, value } = e.target;
    setDatosEditados((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditar = (usuario) => {
    setDatosEditados(usuario);
    setUsuarioId(usuario._id);
    setEditar(true);
  };

  const handleClickEliminar = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:5000/usuarios/eliminarUsuario/" + id,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTitulo("Usuario eliminado correctamente.");
        setMensaje(data.mensaje);
        setShow(true);
      } else {
        setTitulo(data.error);
        setMensaje(data.mensaje);
        setShow(true);
      }
    } catch (err) {
      setTitulo("Error al eliminar el usuario");
      setMensaje(err);
    }
  };

  const handleClickActualizar = async (id) => {
    if (id !== usuarioId) {
      setUsuarioId(null);
      setEditar(false);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/usuarios/editarUsuario/" + id,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: datosEditados.nombre,
            email: datosEditados.email,
            rol: datosEditados.rol,
            puntos: datosEditados.puntos,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setShow(true);
        setTitulo("Usuario editado.");
        setMensaje(data.mensaje);
        setUsuarioId(null);
        setDatosEditados({});
        setEditar(false);
      } else {
        setTitulo(data.error);
        setMensaje(data.mensaje);
        setShow(true);
      }
    } catch (err) {
      setShow(true);
      setTitulo("Error al editar el usuario");
      setMensaje(err);
    }
  };

  useEffect(() => {
    const mostrarUsuarios = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/usuarios/mostrarUsuarios",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUsuarios(data.usuarios); // Guardar los usuarios en el estado
        } else {
          console.log(data.mensaje);
        }
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
      }
    };

    mostrarUsuarios();
  }, [usuarios]);

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
        <div className={styles.parent}>
          <div className={styles.div1}>
            <h1 className="text-center">USUARIOS</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Puntos</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario, index) => (
                  <tr>
                    <td
                      onClick={() => {
                        handleEditar(usuario);
                      }}
                    >
                      {editar ? (
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={datosEditados.nombre}
                          onChange={handleCambioInput}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        />
                      ) : (
                        usuario.nombre
                      )}
                    </td>
                    <td
                      onClick={() => {
                        handleEditar(usuario);
                      }}
                    >
                      {editar ? (
                        <Form.Control
                          type="email"
                          name="email"
                          value={datosEditados.email}
                          onChange={handleCambioInput}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        />
                      ) : (
                        usuario.email
                      )}
                    </td>
                    <td
                      onClick={() => {
                        handleEditar(usuario);
                      }}
                    >
                      {editar ? (
                        <Form.Control
                          type="text"
                          name="rol"
                          value={datosEditados.rol}
                          onChange={handleCambioInput}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        />
                      ) : (
                        usuario.rol
                      )}
                    </td>
                    <td
                      onClick={() => {
                        handleEditar(usuario);
                      }}
                    >
                      {editar ? (
                        <Form.Control
                          type="number"
                          name="puntos"
                          value={datosEditados.puntos}
                          onChange={handleCambioInput}
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        />
                      ) : (
                        usuario.puntos
                      )}
                    </td>
                    <td>
                      <Icon
                        icon="flowbite:edit-solid"
                        width="24"
                        height="24"
                        style={{ color: "#0e89ff", cursor: "pointer" }}
                        onClick={() => {
                          handleClickActualizar(usuario._id);
                        }}
                      />
                      <Icon
                        icon="typcn:delete"
                        width="24"
                        height="24"
                        style={{ color: "#f00", cursor: "pointer" }}
                        onClick={() => {
                          handleClickEliminar(usuario._id);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className={styles.div2}>
            <h1 className="text-center">MESAS VIP</h1>
          </div>
          <div className={styles.div3}>
            <h1 className="text-center">PREMIOS</h1>
            <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Introduce los premios a añadir en la ruleta"
                  name="premios"
                  onChange={handleChangePremios}
                />
                <Button>Añadir</Button>
              </InputGroup>
            </Form>
            <Label></Label>
          </div>
          <div className={styles.div4}>
            <h1 className="text-center">ENTRADAS</h1>
          </div>
        </div>
        <Modal
          className="d-flex align-items-center"
          show={show}
          onHide={handleClose}
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

export default Administrador;
