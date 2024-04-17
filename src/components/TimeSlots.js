// TimeSlots.js

import React, { useState,useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { createReservation } from '../api/createReservationApi'; // Import your API functions

const TimeSlots = (props) => {
    // const { id } = useParams(); // Get barberID and selectedDate from URL params
    const [selectedSlot, setSelectedSlot] = useState(null);
    
    const availableSlots = props.availableSlots
    const barberID = props.barberID
    const selectedDate = props.selectedDate
    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleReservation = () => {
        if (selectedSlot) {
            const reservationData = {
                barberID,
                date: selectedDate,
                time: selectedSlot,
                // Other reservation details like client phone, services, etc.
            };

            createReservation(reservationData)
                .then((response) => {
                    // Handle successful reservation
                    console.log('Reservation successful:', response);
                })
                .catch((error) => console.error('Error creating reservation:', error));
        }
    };

    return (
        <div>
            <h2>Booking Page for Barber ID: {barberID}</h2>
            <p>Selected Date: {selectedDate}</p>
            <h3>Available Slots</h3>
            
            <ul>
                {availableSlots.map((slot, index) => (
                    <li key={index} onClick={() => handleSlotSelection(slot)}>
                       <p>{slot.Start} - {slot.End}</p>
                        <p>IsBusy: {slot.IsBusy ? 'Yes' : 'No'}</p>
                    </li>
                ))}
            </ul>
            {selectedSlot && (
                <div>
                    <p>Selected Slot: {selectedSlot.Start} - {selectedSlot.End}</p>
                    <button onClick={handleReservation}>Confirm Reservation</button>
                </div>
            )}
        </div>
    );
};

export default TimeSlots;
