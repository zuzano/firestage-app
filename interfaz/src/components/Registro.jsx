import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Modal } from "react-bootstrap";

import styles from "./../css/registro.module.css";

import { API_URL } from "../constants";

const Registro = () => {
  //Inicializa los estados
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [dni, setDni] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [enviar, setEnviar] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [validar, setValidar] = useState([]);
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const navigate = useNavigate();

  const validarDNI = (dni) => {
      // Asegurarse de que sigue el formato correcto: 8 números seguidos de 1 letra mayúscula
      const dniRegex = /^[0-9]{8}[A-Z]$/;
      if (!dniRegex.test(dni)) return false;
  
      const letras = "TRWAGMYFPDXBNJZSQVHLCKE";
      const numero = parseInt(dni.slice(0, 8), 10); // Extrae los 8 primeros dígitos
      const letraEsperada = letras[numero % 23];   // Calcula la letra correcta
      const letraIngresada = dni.charAt(8);        // Toma la letra que el usuario puso
  
      return letraIngresada === letraEsperada;     // Compara si coinciden
  }

  //Eniva una peticion para registrar al usuario si enviar es true
  useEffect(() => {
    if (!enviar) return;

    const registrarUsuario = async () => {
      try {
        const response = await fetch(
          `${API_URL}/autenticacion/registrarUsuario`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre: nombre,
              apellidos: apellidos,
              email: correo,
              contraseña: contraseña,
              dni: dni
            }),
          }
        );
        const data = await response.json();

        if (response.status !== 201) {
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
  }, [enviar, correo, contraseña]);

  //
  const handleSubmit = (e) => {
    e.preventDefault();
  
    let errores = [];
  
    if(!validarDNI(dni.toUpperCase())){
      errores.push("dni")
    }

    //Validar mediante una expresion regular los casos comunes de correos
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(correo)) {
      errores.push("correo");
    }
  
      // Validar longitud mínima de la contraseña
    if (contraseña.length < 6) {
      errores.push("contraseña");
    }
  
    // Validar coincidencia de contraseñas
    if (contraseña !== confirmarContraseña) {
      errores.push("confirmarContraseña");
    }
  
    setValidar(errores);
  
    if (errores.length > 0) {
      return; // Evita enviar si hay errores
    }
  
    setEnviar(true);
  };

  // Quita un error cuando el usuario modifica el campo
  const quitarError = (campo) => {
    setValidar((prev) => prev.filter((item) => item !== campo));
  };
  

  //Maneja el cierre del modal, si hay un error no redirige a la pagina Login
  const handleClose = (e) => {
    if (error) {
      setShow(false);
    } else {
      navigate("/login");
    }
  };

  return (
    // From Uiverse.io by ammarsaa
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <p className={styles.title}>Registrarse </p>
          <p className={styles.message}>
            Registrate y consigue acceso completo{" "}
          </p>
          <div className={styles.flex}>
            <label>
              <input
                className={styles.input}
                type="text"
                placeholder
                required
                onChange={(e) => setNombre(e.target.value)}
              />
              <span>Nombre</span>
            </label>
            <label>
              <input
                className={styles.input}
                type="text"
                placeholder
                required
                onChange={(e) => setApellidos(e.target.value)}
              />
              <span>Apellidos</span>
            </label>
          </div>
          <label>
            <input
              style={{
                border:  validar.includes("correo") ? "2px solid red" : "none",
              }}
              className={styles.input}
              type="email"
              placeholder
              required
              onChange={(e) => {setCorreo(e.target.value)
                quitarError("correo")
              }}
            />
            <span>Email</span>
          </label>
          <label>
            <input
              style={{
                border:  validar.includes("dni") ? "2px solid red" : "none",
              }}
              className={styles.input}
              type="text"
              placeholder
              required
              onChange={(e) => {setDni(e.target.value)
                quitarError("dni")
              }}
            />
            <span>DNI</span>
          </label>
          <span
            style={{
              display:  validar.includes("dni") ? "block" : "none",
              color: "red",
              fontSize: "0.7em",
            }}
          >
            Debes introducir un DNI válido
          </span>

          <label>
            <input
              style={{
                border:  validar.includes("contraseña") ? "2px solid red" : "none",
              }}
              className={styles.input}
              type="password"
              placeholder
              required
              onChange={(e) => {setContraseña(e.target.value)
                quitarError("contraseña")
              }}
            />
            <span>Contraseña</span>
          </label>
          <span
            style={{
              display:  validar.includes("contraseña") ? "block" : "none",
              color: "red",
              fontSize: "0.7em",
            }}
          >
            Debes introducir un contraseña con 6 caracteres.
          </span>
          <label>
            <input
              style={{
                border:
                validar.includes("confirmarContraseña") ? "2px solid red" : "none",
              }}
              className={styles.input}
              type="password"
              placeholder
              required
              onChange={(e) => {setConfirmarContraseña(e.target.value)
                quitarError("confirmarContraseña")
              }}
            />
            <span>Confirmar contraseña</span>
          </label>
          <span
            style={{
              display:  validar.includes("confirmarContraseña") ? "block" : "none",
              color: "red",
              fontSize: "0.7em",
            }}
          >
            Debes introducir la misma contraseña.
          </span>
          <button className={styles.submit}>Enviar</button>
          <p className={styles.signin}>
            ¿Aún no tienes cuenta? <Link to="/login">Iniciar Sesión</Link>{" "}
          </p>
        </form>
        <Modal
          className="d-flex align-items-center"
          show={show}
          onHide={handleClose}
          animation={true}
        >
          <Modal.Header>
            <Modal.Title>Registro Completado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error !== null
              ? error
              : "¡Bienvenido! Tu cuenta ha sido creada correctamente."}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Registro;
