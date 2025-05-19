import React from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "react-bootstrap";
import { Typeahead } from 'react-bootstrap-typeahead';
import { Icon } from "@iconify/react";

function Filtros(){

    const ordenarMenor = (tipoDato) => {
        
        
    }

    const ordenarMayor = (tipoDato) => {
        
    }

    return (
        <>
        <Dropdown>
            <DropdownToggle>
                <Icon icon="mi:filter" width="48" height="48" />
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={ordenarMenor}></DropdownItem>
                <DropdownItem onClick={ordenarMayor}></DropdownItem>
                <Typeahead
                id="datos-typeahead"
                labelKey={propiedad}
                ></Typeahead>
            </DropdownMenu>
        </Dropdown>
        </>
    )
}