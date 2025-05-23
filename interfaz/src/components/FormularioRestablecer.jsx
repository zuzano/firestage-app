import React, { useState, useEffect } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../constants";


function FormularioRestablecer() {

    const { usuarioID } = useParams(); // <-- aquí obtienes el id del usuario, useParams() --> obtiene el parametro que se pasa por la URL

    // Inicializa los estados
    const [nuevaContraseña, setNuevaContraseña] = useState("");
    const [error, setError] = useState(null)
    const [validar, setValidar] = useState(null);
    const [show, setShow] = useState(false)

    const navigate = useNavigate();

    //Comprueba que el ID que se pasa en la URL sea el correcto sino te redirige a la pagina de accesoDenegado
    useEffect(() => {
        const validarID = async () => {
            try {
                const response = await fetch(`${API_URL}/autenticacion/validarID`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ usuarioID })
                });

                if (!response.ok) {
                    navigate("/accesoDenegado");
                }
            } catch (err) {
                navigate("/accesoDenegado");
            }
        };

        validarID();
    }, []);

    //Maneja el envio del formulario, valida los datos que se pasan y llama a la peticion para restablecer contraseña
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (nuevaContraseña.length < 6) {
                setValidar("La contraseña debe contener al menos 6 caracteres.")
                return;
            }
            const response = await fetch(`${API_URL}/autenticacion/restablecerContrasena`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    usuarioID: usuarioID,
                    nuevaContraseña: nuevaContraseña
                })
            });

            const data = await response.json();

            if (response.ok) {
                setValidar(null)
                setShow(true)
            } else {
                setError(data.error);
            }

        } catch (err) {
            setError("Error al procesar la solicitud.");
        }
    };

    return (
        <>
            <Container
                fluid
                style={{
                    backgroundColor: "#131313",
                    height: "80vh",
                    display: "grid",
                    placeItems: "center",
                }}
            >
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-100 rounded mb-2"
                        style={{ border: validar ? '2px solid red' : 'none' }}
                        required
                        type="password"
                        placeholder="Nueva contraseña"
                        value={nuevaContraseña}
                        onChange={(e) => setNuevaContraseña(e.target.value)}
                    />
                    {validar ? <p style={{ color: 'red', fontSize: "0.7em", }}>{validar}</p> : error ? <p style={{ color: 'red', fontSize: "0.7em", }}>{error}</p> : ''}
                    <Button variant="primary" type="submit">Restablecer contraseña</Button>
                </form>
                <Modal
                    className="d-flex align-items-center"
                    show={show}
                    onHide={() => { navigate('/login') }}
                    animation={true}
                >
                    <Modal.Header>
                        <Modal.Title>Contraseña Restablecida.</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Felicidades, su contraseña se ha restablecido con exito.
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    )
}

export default FormularioRestablecer;