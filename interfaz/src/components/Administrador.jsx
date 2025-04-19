import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './../css/administrador.module.css'

function Administrador() {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {

        const mostrarUsuarios = async () => {

            try {
                const response = await fetch(
                  "http://localhost:5000/usuarios/mostrarUsuarios",
                  {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                  }
                );
                const data = await response.json();
                if (response.ok) {
                    setUsuarios(data.usuarios); // Guardar los usuarios en el estado
                  } else {
                    console.log(data.mensaje);
                  }
                
              } catch (err) {
                console.error("Error al obtener usuarios:", err);
              } 
        }
        
        mostrarUsuarios();
    },[usuarios])

    return (
        <>
            <Container fluid style={{
                backgroundColor: "#131313",
                display: "flex",
                flexDirection: 'column',
                alignItems: 'center',
                padding: '100px'
            }}>

                <div className={styles.parent}>
                    <div className={styles.div1}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Puntos</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario, index) => (
                                    <tr>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.email}</td>
                                        <td>{usuario.rol}</td>
                                        <td>{usuario.puntos}</td>
                                        <td>e e</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className={styles.div2}>2</div>
                    <div className={styles.div3}>3</div>
                    <div className={styles.div4}>4</div>
                </div>

            </Container>
        </>
    );
}

export default Administrador;