import React, { useState } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    DropdownDivider,
    Button,
} from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Icon } from "@iconify/react";

import './../css/filtros.css'

function Filtros({ datos, propiedad }) {

    const [datoSeleccionado, setDatoSeleccionado] = useState([])

    const ordenarMenor = (tipoDato) => {


    }

    const ordenarMayor = (tipoDato) => {

    }

    return (
        <>
            <Dropdown >
                <DropdownToggle variant="custom" className="dropdownToggle d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
                    <p className="m-0 fw-bold" style={{textTransform:'capitalize'}}>{propiedad} <Icon icon="fluent:filter-12-filled" width="20" height="20" /></p><p className="m-0"><Icon icon="simple-line-icons:options-vertical" width="20" height="20"/> </p>
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                        <Typeahead
                            id="datos-typeahead"
                            className="typeahead"
                            labelKey={propiedad}
                            options={datos}
                            placeholder="Buscar..."
                            onChange={setDatoSeleccionado}
                            selected={datoSeleccionado}
                            open
                        />
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default Filtros;