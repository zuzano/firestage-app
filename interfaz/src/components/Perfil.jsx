import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Icon } from "@iconify/react/dist/iconify.js";

import styles from './../css/perfil.module.css'

import { API_URL } from "../constants";

function Perfil() {
    const navigate = useNavigate();

    //Convierte los datos String a un objeto
    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));
    const [cod, setCod] = useState(null)

    //Comprueba si hay un usuario que ha iniciado sesion
    useEffect(() => {
        if (!localStorage.getItem('usuario')) {
            navigate('/accesoDenegado');
        }
        const obtenerCodigo = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/sorteos/obtenerCodigo`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            descripcion: usuario.premios,
                        }),
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setCod(data.codPremio)
                } else {
                    console.log(data.error)
                }
            } catch (err) {
                console.log(err)
            }
        };

        obtenerCodigo();
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
                        <label style={{ fontWeight: 'bold' }}>DNI</label>
                        <label>
                            {usuario.dni}
                        </label>
                    </div>
                    {localStorage.getItem('rol') === 'admin' ? <></> : <>
                        <div className={styles.line4}>
                            <label>Premio</label>
                            <label>
                                {usuario.premios}
                            </label>
                            {usuario.premios != 'Nada' ?
                                <>
                                    <label style={{ fontWeight: 'bold' }}>Codigo</label>
                                    <label>
                                        {cod}
                                    </label>
                                </> : <></>}

                        </div>
                    </>}

                </div>
            </div>
        </Container>
    );
}

export default Perfil;
