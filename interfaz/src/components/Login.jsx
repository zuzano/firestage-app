import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Modal, Button } from "react-bootstrap";
import styles from "./../css/login.module.css";
import { API_URL } from "../constants";


function Login() {
  // Inicializa los estados
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

  //Hace una peticion para iniciar sesion solo si enviar es true
  useEffect(() => {
    if (!enviar) return;

    const inciarSesion = async () => {
      try {
        const response = await fetch(
          `${API_URL}/autenticacion/iniciarSesion`,
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
          // Comprueba si tiene activada la doble autenticacion, guarda el qr generado y muestra un modal
          if (data.requiere2FA) {
            setQrCode(data.qr);
            setShow2FAModal(true);
          } else {
            //Si la opcion de doble autenticacion no esta activada
            // Guardar datos del usuario en localStorage para mantener su sesion iniciada
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

  // Verefica la el codigo de doble autenticacion enviado
  const autenticacion2FA = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/autenticacion/verificarCodigo`,
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
        // Guarda los datos del usuario
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

  //Maneja el estado de enviar formulario y reinicia el estado de erro si previamente habia uno
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setEnviar(true);
  };

  //Maneja el cierre del modal si no hay error redirige a la pagina de inicio y si lo hay cierra el modal
  const handleClose = (e) => {
    if (error) {
      setShow(false)
    } else {
      navigate("/");
    }
  };

  //Maneja el cierre del modal de doble auth y reinicia el estado del codigo
  const handleClose2FAModal = () => {
    setShow2FAModal(false);
    setCodigo("");
  };

  //Maneja el cierre el modal de recuperar contraseña
  const handleShowRestablecer = () => {
    setShowRestablecer(true)
  }

  //Maneja la peticion de restablecer contraseña
  const handleSubmitRestablecer = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/autenticacion/recuperarContrasena`,
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
