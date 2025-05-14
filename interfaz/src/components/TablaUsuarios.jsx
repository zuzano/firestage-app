import React, { useState, useEffect } from "react";
import {
    Container,
    Button,
    Modal,
    Table,
    Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function TablaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    const [usuarioId, setUsuarioId] = useState(null);
    const [datosEditados, setDatosEditados] = useState({});


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
                        premios: datosEditados.premios,
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
                await mostrarUsuarios();
            } else {
                setTitulo(data.error);
                setMensaje(data.mensaje);
                setShow(true);
            }
        } catch (err) {
            setShow(true);
            setTitulo("Error al editar el usuario");
            setMensaje("Hubo un error al solicitar la petición al servidor");
        }
    };

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
                setTitulo(data.error)
               setMensaje(data.mensaje);
               setShow(true);
            }
        } catch (err) {
             setShow(true);
            setTitulo("Error al editar el usuario");
            setMensaje("Hubo un error al solicitar la petición al servidor");
        }
    };

    useEffect(() => {

        mostrarUsuarios();
    }, []);

    return (
        <>
            <Container fluid >
                <h1 className="text-center text-white">USUARIOS</h1>
                <Table striped bordered hover style={{ overflow: 'auto', maxHeight: '40vh' }}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Premios</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario._id}>
                                <td onClick={() => handleEditar(usuario)}>
                                    {/* Compara el id del usuario para que al hacer click en un campo , en las demas filas se queden los datos fijos y no se pongan los de la fila que esta editando */}
                                    {usuarioId === usuario._id ? (
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
                                <td onClick={() => handleEditar(usuario)}>
                                    {usuarioId === usuario._id ? (
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
                                <td onClick={() => handleEditar(usuario)}>
                                    {usuarioId === usuario._id ? (
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
                                <td onClick={() => handleEditar(usuario)}>
                                    {usuarioId === usuario._id ? (
                                        <Form.Control
                                            type="text"
                                            name="premios"
                                            value={datosEditados.premios}
                                            onChange={handleCambioInput}
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                            }}
                                        />
                                    ) : (
                                        usuario.premios
                                    )}
                                </td>
                                <td>
                                    <Icon
                                        icon="flowbite:edit-solid"
                                        width="24"
                                        height="24"
                                        style={{ color: "#0e89ff", cursor: "pointer" }}
                                        onClick={() => handleClickActualizar(usuario._id)}
                                    />
                                    <Icon
                                        icon="typcn:delete"
                                        width="24"
                                        height="24"
                                        style={{ color: "#f00", cursor: "pointer" }}
                                        onClick={() => handleClickEliminar(usuario._id)}
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>

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

export default TablaUsuarios;