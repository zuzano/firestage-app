import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";
import styles from "./../css/login.module.css";


function Login() {
  const [enviar, setEnviar] = useState(false);
  const [correo, setCorreo] = useState("");
  const [correoRestablecer, setCorreoRestablecer] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showRestablecer, setShowRestablecer] = useState(false);
  const [enviadoRestablecer, setEnviadoRestablecer] = useState(false)
  const navigate = useNavigate();

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [codigo, setCodigo] = useState("");



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
          setError(data.mensaje || "Error al iniciar sesión");
          setShow(true);

        } else {
          if (data.requiere2FA) {
            setQrCode(data.qr);
            setShow2FAModal(true);
          } else {
            // Guardar datos del usuario en localStorage
            localStorage.setItem("usuario", JSON.stringify(data.usuario));
            localStorage.setItem("rol", data.usuario.rol)
            setShow(true);
          }
        }
      } catch (err) {
        setError("Error al conectar con el servidor");
        setShow(true);

      } finally {
        setEnviar(false);
      }
    };

    inciarSesion();
  }, [enviar, correo, contraseña]);

  // Handle 2FA code submission
  const autenticacion2FA = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/autenticacion/verificarCodigo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: correo, token: codigo }),
        }
      );
      const data = await response.json();

      if (response.status !== 200) {
        setError(data.error || "Código de verificación inválido");
        setShow2FAModal(false);
        setShow(true);
      } else {
        // Save user data and navigate
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        localStorage.setItem("rol", data.usuario.rol);
        setShow2FAModal(false);
        setShow(true);
      }
    } catch (err) {
      setError("Error al verificar el código");
      setShow2FAModal(false);
      setShow(true);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setEnviar(true);
  };

  const handleClose = (e) => {
    if (error) {
      setShow(false)
    } else {
      navigate("/");
    }
  };

  const handleClose2FAModal = () => {
    setShow2FAModal(false);
    setCodigo("");
  };

  const handleShowRestablecer = () => {
    setShowRestablecer(true)
  }

  const handleSubmitRestablecer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/autenticacion/recuperarContrasena",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: correoRestablecer }),
        }
      );
      const data = await response.json();

      if (response.status !== 200) {
        setError(data.error);
      } else {
        setEnviadoRestablecer(true);
      }
    } catch (err) {
      setError("Error al procesar la solicitud.");
    }
  }

  return (
    // Form by glisovic01
    <>
      <Container fluid style={{ backgroundColor: '#131313', height: '80vh', display: 'grid', placeItems: 'center', }}>
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
          <p >
            ¿Has olvidado la contraseña?
            <a style={{ cursor: 'pointer' }} className={styles.a2} onClick={handleShowRestablecer}>Haz click aquí.</a>
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
        <Modal
          className="d-flex align-items-center"
          show={show2FAModal}
          onHide={handleClose2FAModal}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Verificación en Dos Pasos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Escanea este código QR con tu aplicación de autenticación (como Google
              Authenticator) e introduce el código de verificación.
            </p>
            {qrCode && (
              <img
                src={qrCode}
                alt="Código QR para verificación en dos pasos"
                style={{ maxWidth: "100%" }}
              />
            )}
            <form onSubmit={autenticacion2FA} className="mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Código de verificación"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
              <Button type="submit" className="mt-3" variant="primary">
                Verificar
              </Button>
            </form>
          </Modal.Body>
        </Modal>
        <Modal
          className="d-flex align-items-center"
          show={showRestablecer}
          onHide={() => { setShowRestablecer(false) }}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Restablecer Contraseña</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              {error ?  error  :
                <form onSubmit={handleSubmitRestablecer}>
                  <p>Introduce tu correo , te enviaremos un mensaje para que puedas restablecer tu contraseña</p>
                  <input
                    className="w-100 rounded mb-2"
                    required
                    name="email"
                    type="email"
                    onChange={(e) => setCorreoRestablecer(e.target.value)}
                  />
                  <Button type="submit" variant="primary">Enviar</Button>
                  {enviadoRestablecer ? <p style={{color:'green', fontWeight:'bold'}}>Revisa tu correo.</p> : ""}
                </form>
              }
            </>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Login;
