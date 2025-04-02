import React from "react";
import { Container } from "react-bootstrap";

class Inicio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Container fluid className="firestage-home p-0">
        <main className="mt-20">
          <section className="sec-principal d-flex  justify-content-center align-items-center w-100" style={{
            backgroundImage: "url('./../../public/images/section-principal.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '500px'
          }}>
            <h1 className="text-4xl font-bold text-center pb-5">
              UNA EXPERIENCIA INOLVIDABLE
            </h1>
          </section>

          <section className="container mx-auto my-12 text-center">
            <h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Firestage es la discoteca más emblemática de Madrid, estilos
              cuidadosamente diseñados y géneros musicales diversos.
              Estratégicamente ubicada en el corazón del triángulo de arte,
              cerca de los museos más importantes de la ciudad. Una propuesta
              elegante y exclusiva que ha cautivado a millones de personas,
              convirtiéndonos en un referente internacional de la cultura
              nocturna.
            </p>
          </section>

          <section className="container mx-auto my-12 d-flex">
            <div>
              <img src="" alt="" />
            </div>
          </section>

          <section className="container mx-auto my-12 text-center">
            <h1 className="text-3xl font-bold">Reservas</h1>
          </section>

          <section className="container mx-auto my-12 text-center">
            <h1 className="text-3xl font-bold">Premios</h1>
          </section>
        </main>

        <footer className="bg-white text-black text-center py-4">
          © 2025 FireStage - Todos los derechos reservados
        </footer>
      </Container>
    );
  }
}

export default Inicio;
