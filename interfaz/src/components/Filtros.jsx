import React, { useState } from "react";
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

function Filtros({ datos, propiedad }) {

    const [datoSeleccionado, setDatoSeleccionado] = useState([]);
    const [datosCecked, setDatosChecked] = useState(
        datos.map(d => ({ ...d, checked: true }))
    )
    const [allSelected, setAllSelected] = useState(true);

    const ordenarMenor = (tipoDato) => {


    }

    const ordenarMayor = (tipoDato) => {

    }

    const handleCheckboxChange = (option) => {
        setDatosChecked(prev =>
            prev.map(item =>
                item[propiedad] === option[propiedad]
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );
        setAllSelected(false);
    };

    const handleSelectAll = () => {
        const nuevosSeleccionados = datoSeleccionado.map(item => ({
            ...item,
            checked: !allSelected
        }));
        setDatosChecked(nuevosSeleccionados);
        setAllSelected(!allSelected);
    };

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
                        onChange={() => { }}      // Ignora la selección
                        selected={[]}
                        open
                        renderMenu={(results, menuProps) => (
                            <>

                                <Menu {...menuProps} style={{transform: 'translate(0px, 1px)', width: '100%'}}>
                                        <Form.Check
                                            type="checkbox"
                                            label="Seleccionar Todo"
                                            checked={allSelected}
                                            onChange={handleSelectAll}
                                        />
                                    {results.map((result, index) => (
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                label={result[propiedad]}
                                                checked={datosCecked.find(item => item[propiedad] === result[propiedad])?.checked || false}
                                                onChange={() => handleCheckboxChange(result)}
                                            />
                                    ))}

                                </Menu>
                            </>
                        )}
                    />
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default Filtros;