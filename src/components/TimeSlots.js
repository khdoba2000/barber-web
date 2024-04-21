// TimeSlots.js
import React, { useState } from 'react';
import styled from "styled-components";
import { Input} from '@mantine/core';
import { useId } from '@mantine/hooks';
import { IMaskInput } from 'react-imask';
import { Link } from 'react-router-dom';

import { Button } from '@mantine/core';
import { createReservation } from '../api/createReservationApi'; // Import your API functions
import {sendVerificationCode, verifyVerificationCode} from '../api/sendCodeApi';
import reformatPhoneNumber from '../util';
const TimeSlots = (props) => {
    const selectedSlot = props.selectedSlot;
    const setSelectedSlot = props.setSlot;
    const availableSlots = props.availableSlots
    const barberData = props.barberData
    const selectedDate = props.selectedDate
    const [userPhone, setUserPhone] = useState(null);
    const [enableSendCode, setEnableSendCode] = useState(false);
    const [message, setMessage] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(null);
    const [isCodeVerified, setIsCodeVerified] = useState(null);
    const [codeInput, setCodeInput] = useState(null);

    // props.selectedDate.onChange(() => {
    //     setSelectedSlot(null);
    // })
    // useEffect(() => {
    //     // Your initialization logic here
    
    //     return () => {
    //       // Your cleanup logic here
    //       clearAll()
    //       console.log('ChildComponent unmounted or reset');
    //     };
    //   }, []);

    // const clearAll = () => {
    //     setSelectedSlot(null);
    //     // setUserPhone(null);
    //     // setEnableSendCode(false);
    //     // setMessage('');
    //     // setIsCodeSent(null);
    //     // setIsCodeVerified(null);
    //     // setCodeInput(null);
    // };

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleReservationConfirm = () => {
        if (selectedSlot) {
            const reservationData = {
                barberData,
                date: selectedDate,
                time: selectedSlot,
                // Other reservation details like client phone, services, etc.
            };

            createReservation(reservationData)
                .then((response) => {
                    if (response.code === 200) {
                        // Handle successful reservation
                        console.log('Reservation successful:', response);
                    } else {
                        // Handle failed reservation
                        console.log('Reservation failed:', response);
                    }
                })
                .catch((error) => console.error('Error creating reservation:', error));
        }
    };


    const handleSendCode = async () => {
        console.log('Phone:', userPhone);
        const response = await sendVerificationCode(userPhone);
        setMessage(response ? '' : 'Kod yuborilmadi. Iltimos, qaytadan urinib ko\'ring.');
        setIsCodeSent(true)
        setEnableSendCode(false);
    };

    const handleCodeInput = async (code) => {
        setCodeInput(code);
        console.log('CodeInput:', code);
        if (code.length >= 4) {
            const response = await verifyVerificationCode(userPhone, code);
            setIsCodeVerified(response ? true : false);
        }
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
                        onChange={(event) => {
                            console.log('Phone:', event.target.value);
                            if (event.target.value.length >= 18) {
                                setUserPhone(reformatPhoneNumber(event.target.value));
                                setEnableSendCode(true);
                            }else{
                                setEnableSendCode(false);
                            }
                            setIsCodeVerified(false);
                            setMessage('');
                            setCodeInput('');
                            setIsCodeSent(false);
                        }}
                    />
                     {enableSendCode && (
                        <Button onClick={handleSendCode}>Kod yuborish</Button>
                    )} 
                    {message!='' && (
                        <p>{message}</p>
                    )}
                    </Input.Wrapper>
                   
                    {isCodeSent && (
                        <Input.Wrapper id={id} label="Telefon raqamingizga yuborilgan kodni kiriting" required maw={320} mx="auto">
                        <Input id={id} 
                        placeholder="Kodni kiriting" 
                        onChange={(event) => handleCodeInput(event.target.value)}
                        allowNegative={false}
                        value={codeInput}
                        disabled={isCodeVerified}
                        />   
                        </Input.Wrapper>
                    )}

                <Link to={{
                    pathname: `/barbers/${barberData.id}`, 
                    // state:  {testState},
                    }}>
                     {( <IconWrapper>
                                <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/82bdbaf7d9576d129b6a07c4693b6c81faa1282868e1822876c984946f76f55b?apiKey=70b926e372dc42878f761519e49b3044&" alt="Schedule icon" />
                        </IconWrapper> 
                    )}
                </Link>

                {isCodeVerified && (
                        <Button onClick={handleReservationConfirm}>
                            Tasdiqlash
                        </Button>
                )}

                </div>
            )}
        </div>
    );
} ;

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


const IconWrapper = styled.div`
  display: flex;
  justify-content: left;
  align-items: left;
  color: var(--Primary-Orange, #b3532d);
`;

const Icon = styled.img`
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
  color: var(--Primary-Orange, #b3532d);
`;