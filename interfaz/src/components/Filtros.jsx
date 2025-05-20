import React, { use, useEffect, useState } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    DropdownDivider,
    Button,
    Form
} from "react-bootstrap";
import { MenuItem, Menu, Typeahead } from 'react-bootstrap-typeahead';
import { Icon } from "@iconify/react";

import './../css/filtros.css'

function Filtros({ datos, propiedad, onActualizar }) {

    const [datosChecked, setDatosChecked] = useState([])
    const [todoSeleccionado, setTodoSeleccionado] = useState(true);

    const ordenarMenor = (tipoDato) => {


    }

    const ordenarMayor = (tipoDato) => {

    }

    const handleCheckboxChange = (option) => {
        setDatosChecked(prev =>
            prev.map(item =>
                item[propiedad] === option
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
        setTodoSeleccionado(false);
    };

    const handleSeleccionarTodo = () => {
        const nuevosSeleccionados = datosChecked.map(item => ({
            ...item,
            checked: !todoSeleccionado
        }));
        setDatosChecked(nuevosSeleccionados);
        setTodoSeleccionado(!todoSeleccionado);
    };

    useEffect(() => {
        setDatosChecked(datos.map(item => ({ ...item, checked: true })))
    },[datos])

    useEffect(() => {
        const datosFiltrados = datosChecked.filter((item) => item.checked)
        onActualizar(datosFiltrados)
    }, [datosChecked])


    return (
        <>
            <Dropdown >
                <DropdownToggle variant="custom" className="dropdownToggle d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
                    <p className="m-0 fw-bold" style={{ textTransform: 'capitalize' }}>{propiedad} <Icon icon="fluent:filter-12-filled" width="20" height="20" /></p><p className="m-0"><Icon icon="simple-line-icons:options-vertical" width="20" height="20" /> </p>
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                    <Typeahead
                        id="datos-typeahead"
                        className="typeahead"
                        labelKey={propiedad}
                        options={datos}
                        placeholder="Buscar..."
                        onChange={() => { }}
                        selected={[]}
                        open
                        renderMenu={(results, menuProps) => { 
                            const sinRepetidos = [...new Set(results.map(item => item[propiedad]))]
                            console.log(sinRepetidos)
                            return (
                            <>

                                <Menu {...menuProps} style={{ transform: 'translate(0px, 1px)', width: '100%' }}>
                                    <Form.Check
                                        type="checkbox"
                                        label="Seleccionar Todo"
                                        checked={todoSeleccionado}
                                        onChange={handleSeleccionarTodo}
                                        className="ms-3"
                                    />

                                    {sinRepetidos.map((result, index) => {
                                        return (
                                        <Form.Check
                                            key={index}
                                            type="checkbox"
                                            label={result}
                                            checked={datosChecked.find(item => item[propiedad] === result)?.checked || false}
                                            onChange={() => handleCheckboxChange(result)}
                                            className="ms-3"
                                        />
                                    )})}

                                </Menu>
                            </>
                        )}}
                    />
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default Filtros;