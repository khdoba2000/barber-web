// TimeSlots.js
import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Input} from '@mantine/core';
import { useId, useDisclosure } from '@mantine/hooks';
import { Modal, Button, Image, rem, Group } from '@mantine/core';

import google_play from "../assets/google_play.png";

import OtpInput from 'react-otp-input';

import { IMaskInput } from 'react-imask';
import {dateFormatter} from '../util';

import { createReservation } from '../api/createReservationApi'; // Import your API functions
import {sendVerificationCode, verifyVerificationCode} from '../api/sendCodeApi';
import {reformatPhoneNumber} from '../util';

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

    // const selectedSlot = props.selectedSlot;
    // const setSelectedSlot = props.setSlot;
    const { availableSlots, 
        isReservationSucceeded, 
        setIsReservationSucceeded,
        barberData, 
        selectedDate,
        selectedServices} = props;
  
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [enableSendCode, setEnableSendCode] = useState(false);
    const [message, setMessage] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(null);
    const [isCodeVerified, setIsCodeVerified] = useState(null);
    const [reservationMessage, setReservationMessage] = useState('');
    const [codeInput, setCodeInput] = useState(null);
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);

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
        setMinutes(1);
        setSeconds(30);
        setEnableSendCode(false);
        const response = await sendVerificationCode(userPhone);
        setMessage(response ? '' : 'Kod yuborilmadi. Iltimos, qaytadan urinib ko\'ring.');
       
        const success = response ? true : false;
        setIsCodeSent(success)
        setEnableSendCode(!success);
        console.log('response:', response==null);
        console.log('success:', success);
    };

    const handleCodeInput = async (code) => {
        setCodeInput(code);
        if (code.length >= 4) {
            const response = await verifyVerificationCode(userPhone, code);
            setIsCodeVerified(response ? true : false);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
    }, [seconds]);

    const id = useId();
    // Get the current time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

    return (
        <div>
            {!isReservationSucceeded && (
            <SlotContainer>
                {availableSlots.filter((slot) => {
                    if (selectedDate.getDate() === now.getDate() &&
                        selectedDate.getMonth() === now.getMonth() && 
                        selectedDate.getFullYear() === now.getFullYear()) {
                        return slot.Start > currentTime;
                    }
                    return true;
                }).
                map((slot, index) => (
                    <SlotItem key={index}>
                        <SlotButton key={index} 
                            busy={slot.Busy} 
                            selected={selectedSlot === slot}
                            onClick={() => handleSlotSelection(slot)}
                            disabled={slot.IsBusy}>
                        <span style={{fontSize: "16px"}}>{slot.Start} - {slot.End}</span>
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
                    classNames={{
                        wrapper: 'custom-modal-wrapper', // Custom class for modal wrapper
                        overlay: 'custom-modal-overlay', // Custom class for modal overlay
                        dialog: 'custom-modal-dialog', // Custom class for modal dialog
                        title: 'custom-modal-title', // Custom class
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
                            size="large"
                            required={true}
                            maxLength="18"
                            onChange={(event) => {
                                console.log('Phone:', event.target.value);
                                console.log('Length:', event.target.value.length);
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
                                <Button 
                                        onClick={handleSendCode} 
                                        fullWidth={true}
                                        disabled={!enableSendCode}  
                                >
                                        Kod yuborish
                                </Button>
                            

                            <p className="info">
                            {message!=='' && (
                                <p>{message}</p>
                            )} 
                            </p>
                            </div>
                        
                            {isCodeSent && !isCodeVerified && (
                                <p>{userPhone} ga yuborilgan sms kodni kiriting</p>
                            )
                            }
                            {isCodeSent &&!isCodeVerified && (
                                <OtpInput 
                               value={codeInput}
                               inputStyle={{fontSize:24, color:'black', width: 50, height: 50}}
                               onChange={handleCodeInput}
                               numInputs={4}
                               inputType="number"
                               renderSeparator={<span> - </span>}
                               renderInput={(props) => <input {...props} />}
                             />
                             
                            )
                            }
                            {isCodeSent && !isCodeVerified && (
                                <Group className="countdown-text">
                                {seconds > 0 || minutes > 0 ? (
                                    <p>  
                                     {minutes < 10 ? `0${minutes}` : minutes}: 
                                    {seconds < 10 ? `0${seconds}` : seconds} dan keyin
                                    </p>
                                ) : (
                                    <p>Kod kelmadimi?</p>
                                )}

                                <Button
                                    disabled={seconds > 0 || minutes > 0}
                                    style={{
                                    color: seconds > 0 || minutes > 0 ? "grey" : "black",
                                    }}
                                    onClick={handleSendCode}
                                >
                                   Qaytadan yuborish
                                </Button>
                                
                                </Group>
                            )}
                    

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
                <div style={{"margin-left": "20px"}}>
                <div style={{"margin-bottom": "10px"}}>
                <h4 className="info-label">
                Sizning buyurtmangiz sartaroshga yuborildi!
                </h4>
                </div>
            
                <ReservationInfo 
                        selectedSlot={selectedSlot}
                        selectedServices={selectedServices}
                    />

                  <div>
                <h4 className="info-label">
                    Iltimos, buyurtmangizni kuzatish uchun ilovamizga {userPhone} bilan kiring
                    </h4>
                    <h4 className="info-label">
                        Ubarber ilovasi
                    </h4>
                <p className="info" >
                    <Group >
                
                    <Image href="https://play.google.com/store/apps/details?id=com.nest_app.ubarber"
                     fit="cover"
                     width={50}
                     height={50}
                     src={google_play}
                     alt="Random image"
                     radius={"md"}
                     target="_blank" rel="noreferrer"/>
                      {/* <a href="https://play.google.com/store/apps/details?id=com.nest_app.ubarber">(Play Market) </a> */}
                      </Group>
                    </p>
                    
                <p className="info-label" >
                 Sartarosh telefoni <p className="info" ><a href={`tel:${barberData.phone_number}` } target="_blank" rel="noreferrer">{barberData.phone_number}</a>
                 </p>
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
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
`;

const SlotItem = styled.div`
    flex:  calc(45% - 30px);
`;


const SlotButton = styled.button`
    font-family: Roboto, sans-serif;
    justify-content: center;
    border-radius: 14px;
    border-color: rgba(208, 215, 222, 1);
    border-style: solid;
    border-width: 1px;
    padding: 14px;
    margin-left: 20px;
    color: ${({ busy, selected }) => (busy ? '#fff' : (selected ? '#fff' : '--Dark, #323232'))};

    background-color: ${({ busy, selected }) => (busy ? '#ffcccc' : (selected ? `var(--Primary-Blue, #248BE6)` : '#f9f6ed'))};
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
