import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Navbar bg="white" expand="lg" fixed="top">
        {/* fluid --> hace que todo el contenedor ocupe todo el ancho posible */}
        <Container fluid>
          <Navbar.Brand href="/"><img
                  src={"./../../public/icons/logo.png"}
                  alt="logo"
                  width='200px'
                /></Navbar.Brand>
          {/* Es un botón que aparece en pantallas pequeñas (como móviles) para mostrar u ocultar el menú de navegación. */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex align-items-center">
              <Nav.Link href="/about">ABOUT</Nav.Link>
              <Nav.Link href="/mesas_vip">MESAS VIP</Nav.Link>
              <Nav.Link href="/entradas">ENTRADAS</Nav.Link>
              <Nav.Link href="/eventos">EVENTOS</Nav.Link>
              <Nav.Link href="/contacto">CONTACTO</Nav.Link>
              <Nav.Link href="/soporte">SOPORTE</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Nav.Link href="/login">INICIAR SESIÓN</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
