import { useState } from 'react';
import { Group } from '@mantine/core';
import styled from "styled-components";

import { DatePicker } from '@mantine/dates';
import TimeSlots from './TimeSlots';
import { fetchAvailableSlots } from '../api/barberSlotsApi';

const Calendar = (props) => {
    const [selectedDate, setDate] = useState(null);
    const [selectedSlot, setSlot] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDateString, setSelectedDateString] = useState(null);
  const barberID = props.barberID
  
  return (
     <CalendarStyle>
      <DatePicker
        value={selectedDate}
        onChange={(selectedDate)=>{ 
            const year = selectedDate.getFullYear()
            let month = selectedDate.getMonth() + 1
            if (month < 10) {
                month = `0${month}`
            }
            let day = selectedDate.getDate()
            if (day < 10) {
                day = `0${day}`
            }
            const selectedDateString = `${year}-${month}-${day}`
            setSelectedDateString(selectedDateString)
            
            if (barberID) {
                fetchAvailableSlots(barberID, selectedDateString)
                    .then((slots) => setAvailableSlots(slots))
                    .catch((error) => console.error('Error fetching available slots:', error));
            } else {
                    console.log("No selected barber ID", barberID)
            }
            setDate(selectedDate)

            setSlot(null)
        }}
        defaultDate={new Date()}
        minDate={new Date(2024, 3, 18)}
        maxDate={new Date(2026, 8, 1)}
      />

      <TimeSlots 
      selectedDate={selectedDateString} 
      selectedSlot={selectedSlot}
      setSlot={setSlot}
      availableSlots={availableSlots} 
      barberID={barberID}/>
    </CalendarStyle>
  );
};

export default Calendar;


const CalendarStyle = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  padding: 20 24px;
  align-items: center;
`;