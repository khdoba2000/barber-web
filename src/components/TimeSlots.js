// TimeSlots.js
import React, { useState } from 'react';
import styled from "styled-components";
import { Input} from '@mantine/core';
import { useId, useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput } from '@mantine/core';


import { IMaskInput } from 'react-imask';
import { Link } from 'react-router-dom';
import {dateFormatter} from '../util';

import { createReservation } from '../api/createReservationApi'; // Import your API functions
import {sendVerificationCode, verifyVerificationCode} from '../api/sendCodeApi';
import {reformatPhoneNumber, splitSlot} from '../util';

const calculatePriceSum = (arr) => {
    return arr.reduce((total, current) => {
        return total + current.price;
    }, 0);
  }

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
    const [reservationMessage, setReservationMessage] = useState('');
    const [codeInput, setCodeInput] = useState(null);

    const selectedServices=props.selectedServices

    const selectedServiceNames = selectedServices.map((service) => service.name).join(', ');
    const [opened, { open, close }] = useDisclosure(false);

    // const selectedServicesPrice = selectedServices.map((service) => service.price).
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
                date: dateFormatter(selectedDate),
                time_start: selectedSlot.Start,
                time_end: selectedSlot.End,
                barber_info: {"id": barberData.id},
                barbershop_info: {"id": barberData.barbershop_id},
                client_phone: userPhone,
                services: selectedServices,
                // Other reservation details like client phone, services, etc.
            };

            createReservation(reservationData)
                .then((response) => {
                if (response){
                    console.log('response:', response);
                    console.log('response.data:', response.data);
                    if (response.id) {
                        // Handle successful reservation
                        console.log('Reservation successful:', response);
                        console.log('response.id:', response.id);
                        setReservationMessage('Bron muvaffaqiyatli amalga oshirildi.');
                    } else if (response.message){
                        setReservationMessage(response.message);
                    }else{
                        // Handle failed reservation
                        console.log('Reservation failed:', response);
                        setReservationMessage('Bron amalga oshirilmadi. Iltimos, qaytadan urinib ko\'ring.');
                    }
                }
                })
                .catch((error) => console.error('Error creating reservation:', error));
        }
    };


    const handleSendCode = async () => {
        console.log('Phone:', userPhone);
        const response = await sendVerificationCode(userPhone);
        setMessage(response ? '' : 'Kod yuborilmadi. Iltimos, qaytadan urinib ko\'ring.');
       
        const success = response ? true : false;
        setIsCodeSent(success)
        setEnableSendCode(!success);
        console.log('response:', response==null);
        console.log('success:', success);
        // if (success){
            open()
        // }
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
                <div >
                            <div>
                            <p className="info-label">
                                Tanlangan vaqt: 
                            </p>
                            <p className="info">
                            {selectedSlot.Start} - {selectedSlot.End}
                            </p>
                            </div>
                            
                            <div>
                            <p className="info-label">
                                Tanlangan xizmat(lar):
                            </p> 
                            <p className="info">
                            {selectedServiceNames}
                            </p>

                            </div>

                            <div>
                            <p className="info-label">
                                Umumiy narx: 
                            </p>
                            <p className="info">
                            {calculatePriceSum(selectedServices)} so'm
                            </p>
                            </div>

                   
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
                    <Modal opened={opened} onClose={close} title="">
                    {isCodeSent && (<Input id={id} 
                            data-autofocus
                            title="Yuborilgan sms kodni kiriting"
                            mt="md"
                            placeholder="Yuborilgan sms kodni kiriting" 
                            onChange={(event) => handleCodeInput(event.target.value)}
                            allowNegative={false}
                            value={codeInput}
                            disabled={isCodeVerified}
                        />)
                        }
                    {!isCodeSent && (<p>{message}</p>)}
                    </Modal>
                    </Input.Wrapper>
                   
                    <div className='info-label'>
                    {enableSendCode && (
                        <Button onClick={handleSendCode}>Kod yuborish</Button>
                    )}
                    <p className="info">
                    {message!='' && (
                        <p>{message}</p>
                    )} 
                    </p>
                    </div>
        

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

                        <AcceptButton onClick={handleReservationConfirm}>
                            Tasdiqlash
                        </AcceptButton>

                )}
                {reservationMessage && (
                    <p>{reservationMessage}</p>
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



const AcceptButton = styled.button`
background-color: var(--Primary-orange, #b3532d);
color: #fff;
font: 700 18px/24px Poppins, sans-serif;
text-align: right;
padding: 12px 22px;
border-radius: 150px;
margin-top: 0px;
justify-content: right;
align-items: right;
`;
