import React, { useState, useEffect } from "react";
import {
    Container,
    Modal,
    Table,
    Form,
} from "react-bootstrap";
import { Icon } from "@iconify/react";

import TablaAdmin from "./TablaAdmin";

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
                 await mostrarUsuarios();
            } else {
                setTitulo(data.error);
                setMensaje(data.mensaje);
                setShow(true);
            }
        } catch (err) {
            setTitulo("Error al eliminar el usuario");
            setMensaje("Hubo un error en el servidor.");
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
                <TablaAdmin cabecera={["nombre","rol", "email", "premios"]}
                    datos={usuarios}
                    datosEditados={datosEditados}
                    idActual={usuarioId}
                    onEditar={handleCambioInput}
                    handleEditar={handleEditar}
                    onEliminar={handleClickEliminar}
                    onActualizar={handleClickActualizar}
                />

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