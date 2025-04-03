import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./../css/login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío, como una llamada a una API
   
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío, como una llamada a una API
    console.log("Email:", email, "Contraseña:", password);
  };

  return (
    // Form by glisovic01

    <div className="login-box">
      <p>Iniciar Sesión</p>
      <form onSubmit={handleSubmit}>
        <div className="user-box">
          <input required name type="text" onChange={handleChange}/>
          <label>Email</label>
        </div>
        <div className="user-box">
          <input required name type="password" onChange={handleChange}/>
          <label>Contraseña</label>
        </div>
        <a href="#">
          <span />
          <span />
          <span />
          <span />
          Enviar
        </a>
      </form>
      <p>
        ¿No tienes una cuenta?
        <Link to="/registrarse" className="a2">
          ¡Regístrate!
        </Link>
      </p>
    </div>
  );
}

export default Login;
