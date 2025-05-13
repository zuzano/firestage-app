import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

import styles from "./../css/calendario.module.css";

const Calendario = ({ onFechaSeleccionada }) => {
  const [fecha, setFecha] = useState(null);
  const [diasOcupados, setDiasOcupados] = useState([]);

  // Registra la localizacion para poder usarla
  registerLocale("es", es);

  //Falta por hacer

  useEffect(() => {
  const cargarFechasOcupadas = async () => {
    try {
      const response = await fetch("http://localhost:5000/reservas/fechasAgotadas", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            
          });
      const data = await response.json();
      if(response.ok){
        const fechas = data.map((item) => new Date(item.fecha));
        setDiasOcupados(fechas);

      }else{

      }
    } catch (error) {
      console.error("Error al cargar fechas ocupadas:", error);
    }
  };

  cargarFechasOcupadas();
}, []);


  // Solo permitir jueves a domingo
  const isDiaPermitido = (diaPermitido) => {
   const dia = date.getDay();
  const esPermitido = [0, 4, 5, 6].includes(dia); // jueves a domingo
  const esOcupado = diasOcupados.some((d) => isSameDay(d, date));
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
