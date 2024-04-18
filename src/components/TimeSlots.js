// TimeSlots.js
import React, { useState } from 'react';
import { Button } from '@mantine/core';
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
            <ul>
                {availableSlots.map((slot, index) => (
                    <Button key={index}
                     onClick={() => handleSlotSelection(slot)}>
                       <p>{slot.Start} - {slot.End}</p>
                        <p>IsBusy: {slot.IsBusy ? 'Yes' : 'No'}</p>
                    </Button>
                ))}
            </ul>
            {selectedSlot && (
                <div>
                    <p>Selected Slot: {selectedSlot.Start} - {selectedSlot.End}</p>
                    <Button onClick={handleReservation}>Confirm Reservation</Button>
                </div>
            )}
        </div>
    );
};

export default TimeSlots;
