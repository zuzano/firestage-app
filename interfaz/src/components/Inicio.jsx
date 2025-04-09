import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import styles from "./../css/galeriaFotos.module.css";

function Inicio() {
  return (
    <Container fluid className="firestage-home p-0">
      <main className="w-100">
        <section
          className="sec-principal d-flex justify-content-center align-items-center w-100 bg-image"
          style={{
            backgroundImage:
              "url('./../../public/images/section-principal.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "90vh",
          }}
        >
          <h1 className="display-4 fw-bold text-center pb-5 text-black">
            UNA EXPERIENCIA INOLVIDABLE
          </h1>
        </section>

        <section className="py-5 h-100 w-100 text-center text-black">
          <div className="d-flex align-items-center  justify-content-around">
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                margin: "2%",
                width: "40%",
                objectFit: "cover",
                zIndex: 0,
                borderRadius: "10%",
              }}
            >
              <source
                src="./../../public/video/4932855_Dj_Deejay_3840x2160.mp4"
                type="video/mp4"
              />
              Tu navegador no soporta la reproducción de video.
            </video>
            <div className="d-flex flex-column"  style={{width:'40%'}}>
              <h1 className="fs-2 fw-bold mb-4">Sobre Nosotros</h1>

              <p className="fs-5 m-5" style={{ textAlign: "justify" }}>
                Firestage es la discoteca más emblemática de Madrid, estilos
                cuidadosamente diseñados y géneros musicales diversos.
                Estratégicamente ubicada en el corazón del triángulo de arte,
                cerca de los museos más importantes de la ciudad. Una propuesta
                elegante y exclusiva que ha cautivado a millones de personas,
                convirtiéndonos en un referente internacional de la cultura
                nocturna.
              </p>
            </div>
          </div>
        </section>

        <section
          className="py-5 h-100 w-100 d-flex justify-content-center"
          style={{ backgroundColor: "#131313" }}
        >
          {/* See more by @ImBobby on CodePen */}
          <div className={styles.container}>
            <div id={styles.carousel}>
              <figure>
                <img src="./../../public/images/galeria/imagen5.jpg" alt="" />
              </figure>
              <figure>
                <img src="./../../public/images/galeria/imagen6.jpg" alt="" />
              </figure>
              <figure>
                <img src="./../../public/images/galeria/imagen1.jpg" alt="" />
              </figure>
              <figure>
                <img src="./../../public/images/galeria/imagen4.jpg" alt="" />
              </figure>
              <figure>
                <img src="./../../public/images/galeria/imagen9.jpg" alt="" />
              </figure>
              <figure>
                <img src="./../../public/images/galeria/imagen8.jpg" alt="" />
              </figure>
              <figure>
                <img src="./../../public/images/galeria/imagen3.jpg" alt="" />
              </figure>
              <figure>
                <img src="./../../public/images/galeria/imagen7.jpg" alt="" />
              </figure>
              <figure>
                <img src="./../../public/images/galeria/imagen2.jpg" alt="" />
              </figure>
            </div>
          </div>
        </section>

        <section className="py-5 h-100 w-100 text-center text-black">
          <h1 className="fs-2 fw-bold">Reservas</h1>
          <p className="fs-5 col-md-8 mx-auto mb-4">
            ¿Quieres vivir una noche única en Firestage? Ya sea para celebrar un
            cumpleaños, disfrutar con amigos en una zona VIP o simplemente
            asegurarte la entrada, tenemos una opción perfecta para ti. Reserva
            en segundos y prepárate para una experiencia inolvidable.
          </p>

          <Row className="d-flex justify-content-center align-items-stretch w-100 h-100 ">
            {/* VIP */}
            <Col md={4} style={{ width: "25%" }} className="mb-4 d-block">
              <Card
                className="h-100 p-3 rounded-4 d-flex flex-column justify-content-between"
                style={{
                  backgroundImage: `url(./../../public/images/zona-vip.jpg)`,
                  backgroundSize: "101% 110%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Card.Body style={{ zIndex: 2 }}>
                  <Card.Title className="fw-bold mb-3 text-white">
                    Reserva VIP
                  </Card.Title>
                  <Card.Text
                    className="text-white"
                    style={{ fontSize: "1.2em" }}
                  >
                    Disfruta de la mejor vista del escenario desde nuestras
                    mesas VIP. Incluye botella, atención personalizada y acceso
                    preferente. Ideal para grupos o celebraciones especiales.
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  className="transparent border-0"
                  style={{ zIndex: 2 }}
                >
                  <Button
                    variant="outline-secondary border-0"
                    className="w-100 text-white"
                  >
                    Reservar ahora
                  </Button>
                </Card.Footer>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                    zIndex: 1,
                  }}
                ></div>
              </Card>
            </Col>

            {/* Cumpleaños */}
            <Col md={4} style={{ width: "25%" }} className="mb-4">
              <Card
                className="h-100 p-3 rounded-4 d-flex flex-column justify-content-between"
                style={{
                  backgroundImage: `url(./../../public/images/cumpleaños.jpg)`,
                  backgroundSize: "101% 110%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Card.Body style={{ zIndex: 2 }}>
                  <Card.Title className="fw-bold mb-3 text-white">
                    Cumpleaños
                  </Card.Title>
                  <Card.Text
                    className="text-white"
                    style={{ fontSize: "1.2em" }}
                  >
                    ¡Celebra tu día a lo grande! Ofrecemos paquetes especiales
                    para cumpleañeros con entrada gratuita, bebida de cortesía y
                    muchas sorpresas más. Consulta disponibilidad.
                  </Card.Text>
                </Card.Body>
                <Card.Footer className=" border-0 " style={{ zIndex: 2 }}>
                  <Button
                    variant="outline-secondary border-0"
                    className="w-100 text-white"
                  >
                    Ver opciones
                  </Button>
                </Card.Footer>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                    zIndex: 1,
                  }}
                ></div>
              </Card>
            </Col>

            {/* Entrada Anticipada */}
            <Col md={4} style={{ width: "25%" }} className="mb-4">
              <Card
                className="h-100 p-3 rounded-4 d-flex flex-column justify-content-between"
                style={{
                  backgroundImage: `url(./../../public/images/entrada-anticipada.jpg)`,
                  backgroundSize: "101% 110%",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Card.Body style={{ zIndex: 2 }}>
                  <Card.Title className="fw-bold mb-3 text-white">
                    Entrada Anticipada
                  </Card.Title>
                  <Card.Text
                    className="text-white"
                    style={{ fontSize: "1.2em" }}
                  >
                    Evita colas y asegúrate el acceso con nuestras entradas
                    anticipadas. Puedes adquirirlas online y acceder
                    directamente sin esperas.
                  </Card.Text>
                </Card.Body>
                <Card.Footer className=" border-0" style={{ zIndex: 2 }}>
                  <Button
                    variant="outline-secondary border-0"
                    className="w-100 text-white"
                  >
                    Comprar entrada
                  </Button>
                </Card.Footer>
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(4px)",
                    zIndex: 1,
                  }}
                ></div>
              </Card>
            </Col>
          </Row>

          <p className="mt-5 fs-6">
            ¿Tienes dudas o quieres hacer una reserva personalizada? Contáctanos
            por email y te ayudamos encantados.
          </p>
          <a
            href="https://wa.me/34123456789"
            className="btn mt-3 px-4 py-2 text-white"
            target="_blank"
            rel="noopener noreferrer"
            style={{ backgroundColor: "#131313" }}
          >
            Contactar por Email
          </a>
        </section>

        <section
          className=" py-5 h-100 w-100 text-center text-white"
          style={{ backgroundColor: "#131313" }}
        >
          <div className="d-flex align-items-center justify-content-around m-4">
            <div className="d-flex flex-column" style={{width:'40%'}}>
              <h1 className="fs-2 fw-bold">Premios</h1>
              <p
                className="fs-5 m-5 "
                style={{ textAlign: "justify"}}
              >
                ¡En nuestra discoteca también ganas! Solo por venir, participar
                en eventos o celebrar con nosotros puedes conseguir premios como
                entradas VIP, botellas gratis y productos exclusivos. Cuantas
                más veces vengas, más oportunidades tienes. ¡No te lo pierdas!
              </p>
            </div>
            <img
              src="./../../public/images/ruleta.png"
              alt="Ruleta"
              style={{ width: "30%", borderRadius: "10%" }}
            />
          </div>
        </section>
      </main>
    </Container>
  );
}

export default Inicio;
