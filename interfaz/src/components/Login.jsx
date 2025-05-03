import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Modal } from "react-bootstrap";
import styles from "./../css/login.module.css";
import { createGlobalStyle } from "styled-components";

function Login() {
  const [enviar, setEnviar] = useState(false);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!enviar) return;

    const inciarSesion = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/autenticacion/iniciarSesion",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: correo, contraseña: contraseña }),
          }
        );
        const data = await response.json();

        if (response.status !== 200) {
          setError(data.error || "Error al iniciar sesión");
        } else {
          // Guardar datos del usuario en localStorage
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          localStorage.setItem("rol", data.usuario.usuario.rol)
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
      } finally {
        setShow(true);
        setEnviar(false);
      }
    };

    inciarSesion();
  }, [enviar, correo, contraseña]);

  // Verificar si ya hay un usuario logueado al cargar el componente
  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      navigate("/"); // Redirige si ya está logueado
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setEnviar(true);
  };

  const handleClose = (e) => {
    if(error){
      setShow(false)
    }else{
      navigate("/");
    }
  };

  return (
    // Form by glisovic01
    <>
      <Container fluid style={{backgroundColor: '#131313' ,height: '80vh', display:'grid', placeItems:'center' }}>
        <div className={styles.loginBox}>
          <p>Iniciar Sesión</p>
          <form onSubmit={handleSubmit}>
            <div className={styles.userBox}>
              <input
                required
                name="email"
                type="text"
                onChange={(e) => setCorreo(e.target.value)}
              />
              <label>Email</label>
            </div>
            <div className={styles.userBox}>
              <input
                required
                name="contraseña"
                type="password"
                onChange={(e) => setContraseña(e.target.value)}
              />
              <label>Contraseña</label>
            </div>
            <button type="submit" className={styles.submitBtn}>
              <span />
              <span />
              <span />
              <span />
              Enviar
            </button>
          </form>
          <p>
            ¿No tienes una cuenta?
            <Link to="/registrarse" className={styles.a2}>
              ¡Regístrate!
            </Link>
          </p>
        </div>
        <Modal
          className="d-flex align-items-center"
          show={show}
          onHide={handleClose}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Inicio Sesión Completado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error !== null ? error : "Has iniciado sesión."}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Login;
