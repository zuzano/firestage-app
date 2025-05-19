import React from "react";
import {
    Table,
    Form,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "react-bootstrap";
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

            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem onClick={ordenarMenor}></DropdownItem>
                <DropdownItem onClick={ordenarMayor}></DropdownItem>

            </DropdownMenu>
        </Dropdown>
        </>
    )
}