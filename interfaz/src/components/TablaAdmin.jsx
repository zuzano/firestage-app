import React, { useState, useEffect } from "react";
import {
    Table,
    Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function TablaAdmin({cabecera, datos, datosEditados,idActual, onEditar,handleEditar, onEliminar, onActualizar}) {

    return (
        <>
      
                <Table striped bordered hover style={{ overflow: 'auto', maxHeight: '40vh' }}>
                    <thead>
                        <tr>
                            {cabecera.map((item,index) => (
                                <th key={index}>{item}</th>
                            ))}
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((dato) => (
                            <tr key={dato._id}>
                                {cabecera.map((item, index) => ( 
                                    <td key={index} onClick={() => handleEditar(dato)}>
                                    {idActual === dato._id ? (
                                        <Form.Control
                                            type="text"
                                            name={item}
                                            value={datosEditados[item]}
                                            onChange={onEditar}
                                            style={{
                                                backgroundColor: "transparent",
                                                border: "none",
                                            }}
                                        />
                                    ) : (
                                        dato[item]
                                    )}
                                </td>
                                ))}
                                
                                <td>
                                    <Icon
                                        icon="flowbite:edit-solid"
                                        width="24"
                                        height="24"
                                        style={{ color: "#0e89ff", cursor: "pointer" }}
                                        onClick={() => onActualizar(dato._id)}
                                    />
                                    <Icon
                                        icon="typcn:delete"
                                        width="24"
                                        height="24"
                                        style={{ color: "#f00", cursor: "pointer" }}
                                        onClick={() => onEliminar(dato._id)}
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
        </>
    );
}

export default TablaAdmin;