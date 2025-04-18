import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './../css/administrador.module.css'

function Administrador() {
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {

        
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
                                    <th>Contraseña</th>
                                    <th>Rol</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td colSpan={2}>Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
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