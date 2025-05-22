import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

import styles from "./../css/calendario.module.css";

import { API_URL } from "../constants";

const Calendario = ({ onFechaSeleccionada, tipo }) => {
  const [fecha, setFecha] = useState(null);
  const [diasOcupados, setDiasOcupados] = useState([]);

  // Registra la localizacion para poder usarla
  registerLocale("es", es);

//Busca las fechas que ya tengan reservada todas las entradas
  useEffect(() => {
    const cargarFechasOcupadas = async () => {
      try {
        const response = await fetch(`${API_URL}/reservas/fechasAgotadas`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (response.ok) {
          //Filtra por tipo de entrada
          const fechasTipo = data.fechas.filter(({ _id }) => {return  _id.tipo === tipo});
          //Devuelve un array de las fechas
          const fechas = fechasTipo.map(({_id}) => {return _id.fecha})
          setDiasOcupados(fechas);
        } else {
          console.error("Error al cargar fechas ocupadas:", data.error);
        }
      } catch (error) {
        console.error("Error al cargar fechas ocupadas:", error);
      }
    };

    cargarFechasOcupadas();
  }, [tipo]);


  // Desahibilita todo lo que no sea jueves, viernes, sabado y domingo y los dias ocupados
  const isDiaPermitido = (diaPermitido) => {
    const dia = diaPermitido.getDay();
    const esPermitido = [0, 4, 5, 6].includes(dia); // jueves a domingo
    const esOcupado = diasOcupados.some((d) => isSameDay(d, diaPermitido));
    return esPermitido && !esOcupado;
  };

  // Estilos para los días ocupados
  const dayClassName = (diaOcupado) => {
    const esOcupado = diasOcupados.some((d) => isSameDay(d, diaOcupado));
    if (esOcupado) return styles.ocupado;
    return undefined;
  };

  const handleChange = (date) => {
    setFecha(date);
    onFechaSeleccionada(date); // Avisar al componente padre
  };

  return (
    <DatePicker
      locale="es"
      selected={fecha}
      onChange={handleChange}
      calendarStartDay={1} // Establece que la semana comience el lunes (1 es lunes)
      minDate={new Date()}
      filterDate={isDiaPermitido}
      dayClassName={dayClassName}
      placeholderText="Selecciona una fecha"
      dateFormat="yyyy-MM-dd"
    />
  );
};

export default Calendario;
