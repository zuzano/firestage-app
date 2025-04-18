import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './../css/administrador.module.css'

function Administrador() {
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

                <div className={styles.parent}>
                    <div className={styles.div1}>1</div>
                    <div className={styles.div2}>2</div>
                    <div className={styles.div3}>3</div>
                    <div className={styles.div4}>4</div>
                </div>

            </Container>
        </>
    );
}

export default Administrador;