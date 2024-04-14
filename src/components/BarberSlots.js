import React, { useEffect, useState } from 'react';
import { fetchBarberSlots } from '../api/barberSlotsApi';

const BarberSlots = ({ barberId, date }) => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        const getBarberSlots = async () => {
            const data = await fetchBarberSlots(barberId, date);
            setSlots(data);
        };
        getBarberSlots();
    }, [barberId, date]);

    return (
        <div>
            <h1>Barber Slots</h1>
            <ul>
                {slots.map((slot, index) => (
                    <li key={index}>
                        Start Time: {slot.Start}, End Time: {slot.End}, {slot.IsBusy ? 'Busy' : 'Available'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BarberSlots;
