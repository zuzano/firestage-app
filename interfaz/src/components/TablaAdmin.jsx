import React, { useEffect, useState } from "react";
import {
    Table,
    Form,
} from "react-bootstrap";
import { Icon } from "@iconify/react";

import Filtros from "./Filtros";

function TablaAdmin({cabecera, datos, datosEditados,idActual, onEditar,handleEditar, onEliminar, onActualizar}) {

    //Guarda los datos a mostrar en el cuerpo de la tabla
    const [actualizarDatos, setActualizarDatos] = useState(datos.map(d => ({...d})));
    
    //Funcion para actualizar el estado
    const actualizarTabla = (datosActualizados) => {
        setActualizarDatos(datosActualizados);
    }

    return (
        <>
              <div className="d-flex flex-column" style={{ overflow: 'auto', maxHeight: '40vh',  minHeight: '200px' }}>
      
                <Table striped bordered hover>
                    <thead style={{position:'sticky', top:'0'}}>
                        <tr>
                            {cabecera.map((item,index) => (
                                <th className="p-0" key={index}><Filtros datos={datos} propiedad={item} onActualizar={actualizarTabla}/></th>

                            ))}
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        {actualizarDatos.map((dato) => (
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
                </div>
        </>
    );
}

export default TablaAdmin;