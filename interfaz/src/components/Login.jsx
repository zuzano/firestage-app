
class Login extends React.Component{
    constructor(props){
      super(props);
       this.state = {
        correo: '',
        contraseña: ''
       }
    }

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    handleSubmit = async (event) => {
      event.preventDefault();
    }

    handleChange = (event) => {
      this.setState({[event.target.name]: event.target.value})
    }


  

    render(){
      console.log(this.state.correo)
        return (
          // Form by glisovic01

          <div className="login-box">
            <p>INICIAR SESIÓN</p>
            <form onSubmit={this.handleSubmit}>
              <div className="user-box">
                <input required name="correo" onChange={this.handleChange} type="text" />
                <label>Email</label>
              </div>
              <div className="user-box">
                <input required name="contraseña" onChange={this.handleChange} type="password" />
                <label>Contraseña</label>
              </div>
              <a href="#">
                <span />
                <span />
                <span />
                <span />
                Submit
              </a>
            </form>
            <p>Don't have an account? <a href className="a2">Sign up!</a></p>
          </div>
        );
    }
}

export default Login;
