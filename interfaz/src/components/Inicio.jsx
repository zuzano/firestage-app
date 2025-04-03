import React, { useState } from "react";
import { Container } from "react-bootstrap";

function Inicio() {
  return (
    <Container fluid className="firestage-home p-0">
      <main className="">
        <section
          className="sec-principal d-flex justify-content-center align-items-center w-100 bg-image"
          style={{
            backgroundImage:
              "url('./../../public/images/section-principal.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "500px",
          }}
        >
          <h1 className="display-4 fw-bold text-center pb-5 text-black">
            UNA EXPERIENCIA INOLVIDABLE
          </h1>
        </section>

        <section className="container my-5 text-center">
          <h1 className="fs-2 fw-bold mb-4">Sobre Nosotros</h1>
          <p className="col-md-8 mx-auto fs-5">
            Firestage es la discoteca más emblemática de Madrid, estilos
            cuidadosamente diseñados y géneros musicales diversos.
            Estratégicamente ubicada en el corazón del triángulo de arte, cerca
            de los museos más importantes de la ciudad. Una propuesta elegante y
            exclusiva que ha cautivado a millones de personas, convirtiéndonos
            en un referente internacional de la cultura nocturna.
          </p>
        </section>

        <section className="container my-5 d-flex justify-content-center">
          <div>
            <img src="" alt="" className="img-fluid" />
          </div>
        </section>

        <section className="container my-5 text-center">
          <h1 className="fs-2 fw-bold">Reservas</h1>
        </section>

        <section className="container my-5 text-center">
          <h1 className="fs-2 fw-bold">Premios</h1>
        </section>
      </main>

      <footer className="bg-white text-black text-center py-4">
        © 2025 FireStage - Todos los derechos reservados
      </footer>
    </Container>
  );
}

export default Inicio;
