import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

import styles from './../css/perfil.module.css'

function Perfil() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('usuario')) {
            navigate('/accesoDenegado');
        }
    }, [])

    return (
        <Container fluid style={{
            backgroundColor: "#131313",
            height: "80vh",
            display: "grid",
            placeItems: "center",
        }}>
            <div className={styles.loader}>
                <div className={styles.wrapper}>
                    <div className={styles.circle} />
                    <div className={styles.line1} />
                    <div className={styles.line2} />
                    <div className={styles.line3} />
                    <div className={styles.line4} />
                </div>
            </div>
        </Container>
    );
}

export default Perfil;
