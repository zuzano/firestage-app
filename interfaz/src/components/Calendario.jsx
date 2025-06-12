import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSameDay } from "date-fns";
import { es } from "date-fns/locale";
import { registerLocale } from "react-datepicker";

import styles from "./../css/calendario.module.css";

import { API_URL } from "../constants";

const Calendario = ({ onFechaSeleccionada, tipo, subtipo }) => {
  const [fecha, setFecha] = useState(null);
  const [diasOcupados, setDiasOcupados] = useState([]);
  const [hoverFecha, setHoverFecha] = useState(null);
  const [aforoInfo, setAforoInfo] = useState(null);


  // Registra la localizacion para poder usarla, y que el calendario use los datos de esa localizacions
  registerLocale("es", es);

  //Busca las fechas que hallan llegado al limite de entradas
  useEffect(() => {
    const cargarFechasOcupadas = async () => {
      try {
        const response = await fetch(`${API_URL}/aforo/fechasAgotadas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipo: tipo,
            subtipo: subtipo
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setDiasOcupados(data.fechasAgotadas);
        } else {
          console.error("Error al cargar fechas ocupadas:", data.error);
        }
      } catch (error) {
        console.error("Error al cargar fechas ocupadas:", error);
      }
    };

    cargarFechasOcupadas();
  }, [tipo])

  const handleMouseEnter = async (fecha) => {
    setHoverFecha(fecha);
    try {
      const response = await fetch(`${API_URL}/aforo/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha: fecha,
          tipo: tipo,
          subtipo: subtipo
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setAforoInfo({ entradasVendidas: data.entradasVendidas, capacidadTotal: data.capacidadTotal })
      } else {
        setAforoInfo(null);
      }
    } catch (error) {
      console.error("Error al consultar aforo:", error);
      setAforoInfo(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverFecha(null);
    setAforoInfo(null);
  };


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

  //Controla el estado de la fecha cuando cambia. Y se la pasa a una funcion del componente padre
  const handleChange = (date) => {
    setFecha(date);
    onFechaSeleccionada(date) // Avisar al componente padre
  };

  // Personaliza cómo se renderiza cada día
  const renderDayContents = (day, date) => {
    return (
      <div
        onMouseEnter={() => handleMouseEnter(date)}
        onMouseLeave={handleMouseLeave}
      >
        {day}
      </div>
    );
  };

  return (
    <DatePicker
      locale="es"
      selected={fecha}
      onChange={handleChange}
      calendarStartDay={1} // Establece que la semana comience el lunes (1 es lunes)
      minDate={new Date()}
      renderDayContents={renderDayContents}
      filterDate={isDiaPermitido}
      dayClassName={dayClassName}
      placeholderText="Selecciona una fecha"
      dateFormat="yyyy-MM-dd"
    >
      {hoverFecha && (
        <div style={{ marginTop: '10px' }}>
          <strong>{hoverFecha.toLocaleDateString()}</strong>:<br />
          <span>
            {aforoInfo
              ? `${aforoInfo.entradasVendidas} / ${aforoInfo.capacidadTotal} entradas`
              : 'Cargando información...'}
          </span>
        </div>
      )}
    </DatePicker>
  );
};

export default Calendario;
