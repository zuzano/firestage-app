import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

import styles from './../css/entradas.module.css'

function Entradas(){

    return (
        <>
        <Container fluid style={{
          backgroundColor: "#131313",
          display: "flex",
          height: '80vh',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '100px'
        }}>
            <main className="d-flex w-100 justify-content-around text-white">
                <div className="d-flex flex-column justify-content-around align-items-center py-4" style={{backgroundColor:'#0B1B36', borderRadius:'5%', width:'20%'}}>
                    <h1 className="mt-5 text-center" style={{width:'50%'}}>ENTRADA GENERAL</h1>
                    <h2 className="py-3 text-center">€25</h2>
                    <p className="py-3" style={{textAlign:'center' , width:'50%'}}>Acceso general a la discoteca. Perfecto para disfrutar de la música y el ambiente.</p>
                    <button className={styles.button}>Comprar Ahora</button>
                </div>
                <div  className=" d-flex flex-column justify-content-around align-items-center  py-4" style={{backgroundColor:'#0B1B36' , borderRadius:'5%', width:'20%'}}>
                    <h1 className="mt-5 text-center" style={{width:'50%'}}>ENTRADA VIP</h1>
                    <h2 className="py-3 text-center">€150</h2>
                    <p className="py-3" style={{textAlign:'center', width:'50%'}}>Acceso prioritario, zona reservada cerca del escenario. Entrada rapida y exclusiva.</p>
                    <Button variant="none" as={Link} to='/mesasVIP' className={styles.button}>Más información</Button>
                </div>
                <div  className=" d-flex flex-column justify-content-around align-items-center py-4" style={{backgroundColor:'#0B1B36' , borderRadius:'5%', width:'20%'}}>
                    <h1 className="mt-5 text-center" style={{width:'50%'}}>ENTRADA PREMIUM</h1>
                    <h2 className="py-3 text-center">€500</h2>
                    <p className="py-3" style={{textAlign:'center' , width:'50%'}}>Incluye todos los beneficios del VIP, mas 7 botellas con mezcla a elegir y palco privado.</p>
                    <button className={styles.button}>Comprar Ahora</button>
                </div>
                <div  className=" d-flex flex-column justify-content-around align-items-center py-4" style={{backgroundColor:'#0B1B36' , borderRadius:'5%', width:'20%'}}>
                    <h1 className="mt-5 text-center">RESERVAR CUMPLEAÑOS</h1>
                    <h2 className="py-3 text-center">€200</h2>
                    <p className="py-3" style={{textAlign:'center' , width:'50%'}}>Incluye todos los beneficios del VIP, mas 2 botellas con mezcla a elegir y palco privado.</p>
                    <button className={styles.button}>Comprar Ahora</button>
                </div>
            </main>
        </Container>
        </>
    );
}

export default Entradas;