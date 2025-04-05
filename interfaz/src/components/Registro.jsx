import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import "./../css/registro.css";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [enviar, setEnviar] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!enviar) return;

    const registrarUsuario = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/usuario/registrarUsuario",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre: nombre, apellidos: apellidos, email: correo, contraseña: contraseña }),
          }
        );
        const data = await response.json();

        if (response.status === 201) {
    
          // navigate("/login"); // Vuelve al login tras registro exitoso
        } else {
          setError(data.mensaje || "Error al registrar");
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setShow(true);
        setEnviar(false);
      }
    };

    registrarUsuario();
  }, [enviar, correo, contraseña, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setEnviar(true);
  };

  
  const handleClose = (e) => {
    navigate('/login');
  }

  return (
    // From Uiverse.io by ammarsaa
    <>
      <div className="contenedor">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Registrarse </p>
          <p className="message">Registrate y consigue acceso completo </p>
          <div className="flex">
            <label>
              <input className="input" type="text" placeholder required onChange={(e) => setNombre(e.target.value)} />
              <span>Nombre</span>
            </label>
            <label>
              <input className="input" type="text" placeholder required onChange={(e) => setApellidos(e.target.value)} />
              <span>Apellidos</span>
            </label>
          </div>
          <label>
            <input className="input" type="email" placeholder required onChange={(e) => setCorreo(e.target.value)} />
            <span>Email</span>
          </label>
          <label>
            <input className="input" type="password" placeholder required onChange={(e) => setContraseña(e.target.value)} />
            <span>Contraseña</span>
          </label>
          <label>
            <input className="input" type="password" placeholder required />
            <span>Confirmar contraseña</span>
          </label>
          <button className="submit">Enviar</button>
          <p className="signin">
            ¿Aún no tienes cuenta? <Link to="/login">Iniciar Sesión</Link>{" "}
          </p>
        </form>
      </div>
      <Modal className="d-flex align-items-center" show={show} onHide={handleClose} animation={true}>
        <Modal.Header>
          <Modal.Title>Registro Completado</Modal.Title>
        </Modal.Header>
        <Modal.Body>{error !== null ? error : "¡Bienvenido! Tu cuenta ha sido creada correctamente."}</Modal.Body>
      </Modal>
    </>
  );
};

export default Registro;
