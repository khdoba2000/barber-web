import React, { useState } from 'react';
import { createReservation } from '../api/createReservationApi';

const CreateReservation = () => {
    const [reservationData, setReservationData] = useState({
        barber_info: { id: 'string' },
        barbershop_info: { id: 'string' },
        client_phone: 'string',
        comment: 'string',
        date: 'string',
        services: [{ id: 'string' }],
        time_end: 'string',
        time_start: 'string',
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const response = await createReservation(reservationData);
        setMessage(response ? 'Reservation created successfully!' : 'Failed to create reservation.');
    };

    return (
        <div>
            <h1>Create Reservation</h1>
            {/* Form inputs for reservation data */}
            <button onClick={handleSubmit}>Create Reservation</button>
            <p>{message}</p>
        </div>
    );
};

export default CreateReservation;
