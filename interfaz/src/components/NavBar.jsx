import React, { useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link

function NavBar (){
  
    return (
      <Navbar bg="white" expand="lg">
        {/* fluid --> hace que todo el contenedor ocupe todo el ancho posible */}
        {/* as={Link} to="" --> permite una navegacion dinamica sin necesidad de recargar la pagina a diferencia de href */}
        <Container fluid>
          <Navbar.Brand as={Link} to="/"><img
                  src={"./../../public/icons/logo.png"}
                  alt="logo"
                  width='200px'
                /></Navbar.Brand>
          {/* Es un botón que aparece en pantallas pequeñas (como móviles) para mostrar u ocultar el menú de navegación. Muestra el elemento con un id que
          coincida con su aria-controls */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex align-items-center">
              <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
              <Nav.Link as={Link} to="/mesasVIP">MESAS VIP</Nav.Link>
              <Nav.Link as={Link} to="/entradas">ENTRADAS</Nav.Link>
              <Nav.Link as={Link} to="/eventos">EVENTOS</Nav.Link>
              <Nav.Link as={Link} to="/contacto">CONTACTO</Nav.Link>
              <Nav.Link as={Link} to="/soporte">SOPORTE</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/login">INICIAR SESIÓN</Nav.Link> 
          </Nav>
        </Container>
      </Navbar>
    );
  }


export default NavBar;
