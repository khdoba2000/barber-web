// TimeSlots.js
import React, { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import { Input} from '@mantine/core';
import { useId, useDisclosure } from '@mantine/hooks';
import { Modal, Button, rem } from '@mantine/core';

import { IMaskInput } from 'react-imask';
import {dateFormatter} from '../util';

import { createReservation } from '../api/createReservationApi'; // Import your API functions
import {sendVerificationCode, verifyVerificationCode} from '../api/sendCodeApi';
import {reformatPhoneNumber, splitSlot} from '../util';

const calculatePriceSum = (arr) => {
    return arr.reduce((total, current) => {
        return total + current.price;
    }, 0);
  }


const ReservationInfo = ({selectedSlot, selectedServices}) => {
    const selectedServiceNames = selectedServices.map((service) => service.name).join(', ');

    console.log(`reservationInfo: ${selectedSlot.Start} - ${selectedSlot.End}`);
    console.log(`selectedServiceNames: ${selectedServiceNames}`);
    return (
        <div>
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

           
           
        </div>
        )
}
   

const TimeSlots = (props) => {
    const [selectedSlot, setSelectedSlot] = useState(null);

    // const selectedSlot = props.selectedSlot;
    // const setSelectedSlot = props.setSlot;
    const availableSlots = props.availableSlots
    const isReservationSucceeded = props.isReservationSucceeded;
    const setIsReservationSucceeded = props.setIsReservationSucceeded
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

    const [opened, { open, close }] = useDisclosure(false);
    const handleModalClose = () => {
        close();
    }

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
        open();
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
                        setIsReservationSucceeded(true);
                        close();
                        console.log('Reservation successful:', response);
                        console.log('response.id:', response.id);
                        setReservationMessage('Bron muvaffaqiyatli amalga oshirildi.');
                    } else if (response.message){
                        console.log('Reservation failed:', response.message);
                        setReservationMessage('Bron amalga oshirilmadi. Iltimos, qaytadan urinib ko\'ring. Xatolik:'+response.message);
                    } else {
                        // Handle failed reservation
                        console.log('Reservation failed:', response);
                        setReservationMessage('Bron amalga oshirilmadi. Iltimos, qaytadan urinib ko\'ring.');
                    }
                } else {
                    // Handle failed reservation
                    console.log('Reservation failed: no response', response);
                    setReservationMessage('Bron amalga oshirilmadi. Iltimos, qaytadan urinib ko\'ring.');
                }
                })
                .catch((error) => console.error('Error creating reservation:', error));
        }
    };


    const handleSendCode = async () => {
        setEnableSendCode(false);
        console.log('Phone:', userPhone);
        const response = await sendVerificationCode(userPhone);
        setMessage(response ? '' : 'Kod yuborilmadi. Iltimos, qaytadan urinib ko\'ring.');
       
        const success = response ? true : false;
        setIsCodeSent(success)
        setEnableSendCode(!success);
        console.log('response:', response==null);
        console.log('success:', success);
        // if (success){
           
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

    // useEffect(() => {
    // }, {selectedSlot, selectedServices, selectedDate, barberData});
    
    const id = useId();
    return (
        <div>
            {!isReservationSucceeded && (<SlotContainer>
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
            </SlotContainer>)
            }
            {selectedSlot && !isReservationSucceeded && (
                <div className='modal'> 
                    <Modal 
                    opened={opened} 
                    onClose={handleModalClose} 
                    title={barberData.fullname + ' da buyurtmani tasdiqlash'}
                    position="bottom"
                    classNames={{
                        wrapper: 'custom-modal-wrapper', // Custom class for modal wrapper
                        overlay: 'custom-modal-overlay', // Custom class for modal overlay
                        dialog: 'custom-modal-dialog', // Custom class for modal dialog
                    }}
                    >

                    <ReservationInfo 
                        selectedSlot={selectedSlot}
                        selectedServices={selectedServices}
                    />
                   
                        <Input.Wrapper
                                    id={id} label="Telefon raqamingizni kiriting" 
                                    required maw={520} 
                                    message={message}
                        >
                        <Input
                            component={IMaskInput}
                            mask="+998(00) 000-00-00"
                            id={id}
                            placeholder="Telefon raqamingizni kiriting"
                            defaultValue={userPhone?userPhone:'+998'}
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

                            <div className='info-label'>
                            {enableSendCode && (
                                <Button 
                                    onClick={handleSendCode} 
                                    fullWidth={true}
                                >
                                    Kod yuborish
                                </Button>
                            )}

                            <p className="info">
                            {message!='' && (
                                <p>{message}</p>
                            )} 
                            </p>
                            </div>
                        
                            {isCodeSent && !isCodeVerified &&(<Input id={id} 
                                    data-autofocus
                                    title={"+"+userPhone+" ga yuborilgan sms kodni kiriting"}
                                    mt="md"
                                    placeholder={"Tasdiqlash kodini kiriting"}
                                    onChange={(event) => handleCodeInput(event.target.value)}
                                    allowNegative={false}
                                    value={codeInput}
                                    maxLength={4}
                                    disabled={isCodeVerified}
                                />)
                            }
                             {isCodeVerified && (

                            <Button 
                                variant="gradient" 
                                onClick={handleReservationConfirm}
                                gradient={{ from: 'green', to: 'green' }}
                                styles={(theme) => ({
                                root: {
                                height: rem(42),
                                marginTop: rem(10),
                                paddingLeft: rem(40),
                                paddingRight: rem(40),
                                '&:not([data-disabled])': theme.fn.hover({
                                    backgroundColor: theme.fn.darken('#00acee', 0.05),
                                }),
                                },
                                })}
                            >
                            Buyurtmani tasdiqlash
                            </Button>
                            // <AcceptButton onClick={handleReservationConfirm}>
                            //     Buyurtmani tasdiqlash
                            // </AcceptButton>
                            )
                            }
                            {reservationMessage && (
                                <p>{reservationMessage}</p>
                            )}
                         </Input.Wrapper>

                   
                    </Modal>

                </div>
            )}
            {isReservationSucceeded && (
                <div>
                <div style={{"margin-bottom": "10px"}}>
                <p className="info-label">
                </p>
                </div>
                    Sizning buyurtmangiz sartaroshga yuborildi. Sartarosh telefoni <a href={`tel:${barberData.phone_number}`}>{barberData.phone_number}</a>
            
                <ReservationInfo 
                        selectedSlot={selectedSlot}
                        selectedServices={selectedServices}
                    />

            <div>
                <h3 className="info-label">
                    Iltimos, buyurtmangizni kuzatish uchun ilovamizni yuklab oling
                    </h3>
                <p className="info" >
                    <a href="https://t.me/ubarberapp" target="_blank">UBarber ilovasi</a>
                </p>
            </div>
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

    background-color: ${({ busy, selected }) => (busy ? '#ffcccc' : (selected ? `var(--Primary-Blue, #248BE6)` : '#fff'))};
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
