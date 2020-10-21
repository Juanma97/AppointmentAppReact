import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = ({createAppointment}) => {

    const [appointment, updateAppointment] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, updateError] = useState(false);

    const handleChange = event => {
        console.log("Escribiendo...")
        updateAppointment({
            ...appointment,
            [event.target.name]: event.target.value 
        })
    }

    const submitAppointment = event => {
        event.preventDefault();
        if(areNotValid(mascota, propietario, fecha, hora, sintomas)) {
            updateError(true);
            return;
        }
        updateError(false);
        appointment.id = uuidv4();

        createAppointment(appointment);

    }

    function areNotValid(mascota, propietario, fecha, hora, sintomas) {
        return mascota.trim() === '' || propietario.trim() === '' ||
            fecha.trim() === '' || hora.trim() === '' ||
            sintomas.trim() === '';
    }

    const { mascota, propietario, fecha, hora, sintomas }  = appointment

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            { error ? <p className="alerta-error">Todos los campos son obligatorios</p> 
            : null}
            <form
                onSubmit={submitAppointment}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={mascota}
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={handleChange}
                    value={propietario}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={handleChange}
                    value={fecha}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={handleChange}
                    value={hora}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={handleChange}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </Fragment>
    )
}


export default Form;


