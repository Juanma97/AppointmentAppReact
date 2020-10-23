import React, { Fragment, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types'

const Form = ({createAppointment}) => {

    const [appointment, updateAppointment] = useState({
        pet: '',
        owner: '',
        date: '',
        time: '',
        syntoms: ''
    });

    const [error, updateError] = useState(false);

    const handleChange = event => {
        updateAppointment({
            ...appointment,
            [event.target.name]: event.target.value 
        })
    }

    const submitAppointment = event => {
        event.preventDefault();
        if(areNotValid(pet, owner, date, time, syntoms)) {
            updateError(true);
            return;
        }
        updateError(false);
        appointment.id = uuidv4();

        createAppointment(appointment);

        updateAppointment({
            pet: '',
            owner: '',
            date: '',
            time: '',
            syntoms: ''
        });

    }

    function areNotValid(pet, owner, date, time, syntoms) {
        return pet.trim() === '' || owner.trim() === '' ||
                date.trim() === '' || time.trim() === '' ||
                syntoms.trim() === '';
    }

    const { pet, owner, date, time, syntoms }  = appointment

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
                    name="pet"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={pet}
                />

                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="owner"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={handleChange}
                    value={owner}
                />

                <label>Fecha</label>
                <input 
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={handleChange}
                    value={date}
                />

                <label>Hora</label>
                <input 
                    type="time"
                    name="time"
                    className="u-full-width"
                    onChange={handleChange}
                    value={time}
                />

                <label>Sintomas</label>
                <textarea
                    className="u-full-width"
                    name="syntoms"
                    onChange={handleChange}
                    value={syntoms}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </Fragment>
    )
}

Form.propTypes = {
    createAppointment: PropTypes.func.isRequired
}

export default Form;


