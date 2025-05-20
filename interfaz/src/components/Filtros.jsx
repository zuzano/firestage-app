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

    const [datoSeleccionado, setDatoSeleccionado] = useState([])
    const [allSelected, setAllSelected] = useState(true);

    const ordenarMenor = (tipoDato) => {


    }

    const ordenarMayor = (tipoDato) => {

    }

    const handleCheckboxChange = (option) => {
        /*  setDatoSeleccionado(prev => {
             if (prev.includes(option)) {
                 return prev.filter(item => item !== option);
             }
             return [...prev, option];
         });
         setAllSelected(false); */
    };

    const handleSelectAll = () => {
        /*   if (allSelected) {
              setDatoSeleccionado([]);
          } else {
              setDatoSeleccionado([...datos]);
          }
          setAllSelected(!allSelected); */
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
                        onChange={setDatoSeleccionado}
                        selected={datoSeleccionado}
                        open
                        renderMenu={(results, menuProps) => (
                            <>
                                <Menu {...menuProps}>
                                    <MenuItem option={"Seleccionar Todo"} position={0} >
                                        <Form.Check
                                            type="checkbox"
                                            label="Seleccionar Todo"
                                            checked={allSelected}
                                            onChange={handleSelectAll}
                                        />
                                    </MenuItem>
                                    {results.map((result, index) => (
                                        <MenuItem option={result} position={index+1} >
                                            <Form.Check
                                                key={index}
                                                type="checkbox"
                                                label={result[propiedad]}
                                                checked={datoSeleccionado.includes(result)}
                                                onChange={() => handleCheckboxChange(result)}
                                            />
                                        </MenuItem>
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