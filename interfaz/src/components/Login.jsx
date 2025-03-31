import React from "react";
import styled from 'styled-components';
import './../css/login.css'

class Login extends React.Component{
    constructor(props){
        super(props);
       
    }

    componentDidMount() {

    }

  

    render(){
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
                Submit
              </a>
            </form>
            <p>Don't have an account? <a href className="a2">Sign up!</a></p>
          </div>
        );
    }
}



export default Login;

