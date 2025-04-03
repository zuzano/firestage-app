
import "./../css/login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica de envío, como una llamada a una API
    console.log("Email:", email, "Contraseña:", password);
  };

  return (
    // Form by glisovic01

    <div className="login-box">
      <p>Login</p>
      <form>
        <div className="user-box">
          <input required name type="text" />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input required name type="password" />
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
        <a href className="a2">
          Regístrate!
        </a>
      </p>
    </div>
  );
}

export default Login;
