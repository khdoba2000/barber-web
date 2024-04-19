// TimeSlots.js
import React, { useState } from 'react';
import styled from "styled-components";
import { Input } from '@mantine/core';
import { useId } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';

import { Button } from '@mantine/core';
import { createReservation } from '../api/createReservationApi'; // Import your API functions
import {sendVerificationCode} from '../api/sendCodeApi';
const TimeSlots = (props) => {
    // const { id } = useParams(); // Get barberID and selectedDate from URL params
    // const [selectedSlot, setSelectedSlot] = useState(null);
    const selectedSlot = props.selectedSlot;
    const setSelectedSlot = props.setSlot;
    const availableSlots = props.availableSlots
    const barberID = props.barberID
    const selectedDate = props.selectedDate
    const [userPhone, setUserPhone] = useState(null);
    const [message, setMessage] = useState('');

    // props.selectedDate.onChange(() => {
    //     setSelectedSlot(null);
    // })

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


    const handleSendCode = async () => {
        const response = await sendVerificationCode(userPhone);
        setMessage(response ? 'Kod yuborildi' : 'Kod yuborilmadi. Iltimos, qaytadan urinib ko\'ring.');
    };

    const id = useId();

    return (
        <div>
            <SlotContainer>
                {availableSlots.map((slot, index) => (
                    <SlotItem key={index}>
                        <SlotButton key={index} 
                            busy={slot.Busy} 
                            selected={selectedSlot === slot}
                            onClick={() => handleSlotSelection(slot)}
                            disabled={slot.IsBusy}>
                        <p>{slot.Start} - {slot.End}</p>
                        </SlotButton>
                    </SlotItem>
                ))}
            </SlotContainer>
            {selectedSlot && (
                <div>
                    <p>Selected Slot: {selectedSlot.Start} - {selectedSlot.End}</p>
                    <Input.Wrapper id={id} label="Telefon raqam" required maw={320} mx="auto">
                    <Input
                        component={IMaskInput}
                        mask="+998(00) 000-00-00"
                        id={id}
                        placeholder="Telefon raqamingizni kiriting"
                        defaultValue="+998"
                        required={true}
                        onChange={(event) => setUserPhone(event.target.value)}
                    />
                    </Input.Wrapper>
                    {userPhone && (
                        <Button onClick={handleSendCode}>Kod yuborish</Button>
                    )}
                    {message!='' && (
                        <p>{message}</p>
                    )}

                    {/* {userPhone && (
                        <Button onClick={handleReservation}>Confirm Reservation</Button>
                    )} */}
                </div>
            )}
        </div>
    );
};

export default TimeSlots;

// const SlotContainer = styled.ul`
//   display: flex;
//   margin-top: 16px;
//   gap: 10px;
//   font-weight: 600;
//   white-space: nowrap;
//   text-align: center;
// `;


// Define styled components
const SlotContainer = styled.div`
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    align-items: center;
`;

const SlotItem = styled.div`
    flex:  calc(45% - 30px);
    max-width: calc(45% - 30px);
    margin-left: 10px;
`;


const SlotButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 14px;
    border-color: rgba(208, 215, 222, 1);
    border-style: solid;
    border-width: 1px;
    width: 80%;
    color: ${({ busy, selected }) => (busy ? '#fff' : (selected ? '#fff' : '--Dark, #323232'))};

    background-color: ${({ busy, selected }) => (busy ? '#ffcccc' : (selected ? `var(--Primary-Orange, #b3532d)` : '#fff'))};
    cursor: ${({ busy }) => (busy ? 'not-allowed' : 'pointer')};

    align-items: center;

    &:hover {
        background-color: ${({ busy }) => (busy ? '#ffcccc' : '#e0e0e0')};
    }

    &:disabled {
        background-color: #ddd;
        cursor: not-allowed;
    }
`;
const SlotItem2 = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 14px;
    border-color: rgba(208, 215, 222, 1);
    border-style: solid;
    border-width: 1px;
    background-color: #fff;
    color: var(--Dark, #323232);
`;