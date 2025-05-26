import React, { useState, useEffect } from "react";
import {
    Container,
    Modal,
    Table,
    Form,
} from "react-bootstrap";
import { Icon } from "@iconify/react";

import TablaAdmin from "./TablaAdmin";

import { API_URL } from "../constants";

function UsuariosAdmin() {
    //Inicializa los estados
    const [usuarios, setUsuarios] = useState([]);
    const [show, setShow] = useState(false);
    const [titulo, setTitulo] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    const [usuarioId, setUsuarioId] = useState(null);
    const [datosEditados, setDatosEditados] = useState({});

    //Maneja el cierre del modal
    const handleClose = () => {
        setShow(false);
    };

     // Maneja los cambios en los inputs del formulario, actualizando datosEditados
    const handleCambioInput = (e) => {
        const { name, value } = e.target;
        setDatosEditados((prev) => ({ ...prev, [name]: value }));
    };

     // Maneja la acción de editar una entrada, estableciendo los datos y el ID
    const handleEditar = (usuario) => {
        setDatosEditados(usuario);
        setUsuarioId(usuario._id);
    };


     // Maneja la eliminación de una entrada mediante una solicitud DELETE al servidor
    const handleClickEliminar = async (id) => {
        try {
            const response = await fetch(
               `${API_URL}/usuarios/eliminarUsuario/` + id,
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

     // Maneja la actualización de una entrada mediante una solicitud PUT al servidor
    const handleClickActualizar = async (id) => {
        if (id !== usuarioId) {
            setUsuarioId(null);
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/usuarios/editarUsuario/` + id,
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

     // Obtiene y muestra las entradas mediante una solicitud GET al servidor
    const mostrarUsuarios = async () => {
        try {
            const response = await fetch(
                `${API_URL}/usuarios/mostrarUsuarios`,
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

     //Solo se carga la primera vez que se renderiza el componente
    useEffect(() => {

        mostrarUsuarios();
    }, []);

    return (
        <>
            <Container fluid className="p-0">
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

export default UsuariosAdmin;