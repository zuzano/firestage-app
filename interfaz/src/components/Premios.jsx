import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Modal,
    Table,
    Form,
    InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

function Premios() {
    const [premios, setPremios] = useState([]);
    

    const handleSubmit = () => {

    }

    const handleChangePremios = () => {

    }

    return (
        <Container fluid>
            <h1 className="text-center text-white">PREMIOS</h1>
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Introduce los premios a añadir en la ruleta"
                        name="premios"
                        onChange={handleChangePremios}
                    />
                    <Button>Añadir</Button>
                </InputGroup>
                {premios.length !== 0 ? premios.map((item, i) => (
                    <Form.Label key={i}>{item}</Form.Label>
                )): <> <Form.Label className="my-3 text-center text-white">No hay premios.</Form.Label> </>}
            </Form>
        </Container>
    )
}

export default Premios;