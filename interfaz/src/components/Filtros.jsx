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

//Se le pasan datos del componente padre (TablaAdmin)
function Filtros({ datos, propiedad, onActualizar }) {

    //Inicializa los estados
    const [datosChecked, setDatosChecked] = useState([])
    const [todoSeleccionado, setTodoSeleccionado] = useState(true);
    const [menuActivo, setMenuActivo] = useState('filtro'); // 'filtro' o 'opciones'
    const [seleccionado, setSeleccionado] = useState([]);


    //Funcion para ordenar de forma Ascendente segun el tipo de datos que sea
    const ordenarMenor = (tipoDato) => {
        const copiaOrdenada = [...datosChecked].sort((a, b) => {
            const aValor = a[tipoDato];
            const bValor = b[tipoDato];

            // Si alguno está vacío, lo mandamos al final
            if (aValor === "") return 1;
            if (bValor === "") return -1; //Si aValor está vacío, lo coloca después de bValor.

            // Comprobamos que los datos que vamos a ordenar son numeros o texto
            // Si ambos son números, comparamos como números
            if (aValor && bValor && !isNaN(Number(aValor)) && !isNaN(Number(bValor))) {
                return Number(aValor) - Number(bValor);
            }

            // Comparación alfabética si no son números
            return aValor.localeCompare(bValor, 'es', { sensitivity: 'base' }); //sensitivy ignora tildes y mayusculas
        });

        //Guardamos los datos para volver a renderizarlos en el orden establecido
        setDatosChecked(copiaOrdenada);
    };

    //Funcion para ordenar de forma Descendente segun el tipo de datos que sea
    const ordenarMayor = (tipoDato) => {
        const copiaOrdenada = [...datosChecked].sort((a, b) => {
            const aValor = a[tipoDato];
            const bValor = b[tipoDato];

            // Si alguno está vacío, lo mandamos al final
            if (aValor === "") return 1;
            if (bValor === "") return -1;

            if (!isNaN(Number(aValor)) && !isNaN(Number(bValor))) {
                return Number(bValor) - Number(aValor);
            }

            return bValor.localeCompare(aValor, 'es', { sensitivity: 'base' });
        });

        //Guardamos los datos para volver a renderizarlos en el orden establecido
        setDatosChecked(copiaOrdenada);
    };

    //Maneja el cambio de si esta checked o no buscando la opcion que ha sido modificada
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

    //Selecciona todo los checked a true o a false
    const handleSeleccionarTodo = () => {
        const nuevosSeleccionados = datosChecked.map(item => ({
            ...item,
            checked: !todoSeleccionado
        }));
        setDatosChecked(nuevosSeleccionados);
        setTodoSeleccionado(!todoSeleccionado);
    };

    const handleAplicarFiltro = (results) => {
        // Extraemos los valores de la propiedad de los resultados seleccionados
        const valoresSeleccionados = results.map(r => r[propiedad]);

        // Activamos checked solo en los que están en valoresSeleccionados
        const nuevosDatos = datosChecked.map(item => ({
            ...item,
            checked: valoresSeleccionados.includes(item[propiedad])
        }));

        setDatosChecked(nuevosDatos);

        // Si todos están seleccionados, marca todoSeleccionado, si no, false
        const todoSel = nuevosDatos.every(item => item.checked);
        setTodoSeleccionado(todoSel);
    };


    //Guarda los datos en el estado añadiendoles la propiedad de checked, se ejecuta cada vez que datos cambia.
    useEffect(() => {
        setDatosChecked(datos.map(item => ({ ...item, checked: true })))
    }, [datos])

    //Se ejecuta cuando datosChecked cambia, filtra todos los elementos que checked === true y llama a la funcion de tablaAdmin para mostrarlos
    useEffect(() => {
        const datosFiltrados = datosChecked.filter((item) => item.checked)
        onActualizar(datosFiltrados)
    }, [datosChecked])


    return (
        <>
            <Dropdown >
                <DropdownToggle variant="custom" className="dropdownToggle d-flex justify-content-between align-items-center" style={{ width: '100%' }}>
                    <p className="m-0 fw-bold" onClick={() => { setMenuActivo('filtros') }} style={{ textTransform: 'capitalize' }}>{propiedad} <Icon icon="fluent:filter-12-filled" width="20" height="20" /></p><p className="m-0" onClick={() => { setMenuActivo('opciones') }}><Icon icon="simple-line-icons:options-vertical" width="20" height="20" /> </p>
                </DropdownToggle>
                <DropdownMenu className="dropdownMenu">
                    {menuActivo === 'filtros' ?
                        <>
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
                                    //Para evitar copias de datos iguales
                                    const sinRepetidos = [...new Set(results.map(item => item[propiedad]))]
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
                                                    )
                                                })}
                                                <Button onClick={() => { handleAplicarFiltro(results) }}>Aplicar</Button>
                                            </Menu>
                                        </>
                                    )
                                }}
                            />
                        </>
                        :
                        <>
                            <div className="p-3">
                                <Button variant="outline-primary" className="w-100 mb-2" onClick={() => ordenarMenor(propiedad)}>Ordenar Asc</Button>
                                <Button variant="outline-primary" className="w-100" onClick={() => ordenarMayor(propiedad)}>Ordenar Desc</Button>
                            </div>
                        </>}

                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default Filtros;