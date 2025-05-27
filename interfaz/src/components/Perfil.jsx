import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";

import styles from './../css/perfil.module.css'

function Perfil() {
    const navigate = useNavigate();

    //Convierte los datos String a un objeto
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));

    //Comprueba si hay un usuario que ha iniciado sesion
    useEffect(() => {
        if (!localStorage.getItem('usuario')) {
            navigate('/accesoDenegado');
        }
    }, [])

    return (
        <Container fluid style={{
            backgroundColor: "#131313",
            display: "grid",
            placeItems: "center",
              height: "85vh",
        }}>
            <div className={styles.loader}>
                <div className={styles.wrapper}>
                    <div className={styles.logo}>
                        <Icon icon="mingcute:user-4-fill" width="100" height="100" />
                    </div>
                    <div className={styles.line1}>
                        <label>Nombre</label>
                        <label>
                            {console.log(usuario)}
                            {usuario.nombre}
                        </label>
                    </div>
                    <div className={styles.line2}>
                        <label>Apellidos</label>
                        <label>
                            {usuario.apellidos}
                        </label>
                    </div>
                    <div className={styles.line3}>
                        <label>Correo Electrónico</label>
                        <label>
                            {usuario.email}
                        </label>
                    </div>
                    <div className={styles.line4}>
                        <label>Premio</label>
                        <label>
                            {usuario.premios}
                        </label>

                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Perfil;
