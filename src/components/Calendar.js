import { useState } from 'react';
import styled from "styled-components";

import { DatePicker } from '@mantine/dates';
import TimeSlots from './TimeSlots';
import { fetchAvailableSlots } from '../api/barberSlotsApi';

const Calendar = (props) => {
    const [selectedDate, setDate] = useState(null);
    const [selectedSlot, setSlot] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDateString, setSelectedDateString] = useState(null);
  const barberData=props.barberData
  // const [resetKey, setResetKey] = useState(0);
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
            
            if (barberData.id) {
                fetchAvailableSlots(barberData.id, selectedDateString)
                    .then((slots) => setAvailableSlots(slots))
                    .catch((error) => console.error('Error fetching available slots:', error));
            } else {
                    console.log("No selected barber ID", barberData.id)
            }
            setDate(selectedDate)

            setSlot(null)
            // setResetKey((prevKey) => prevKey + 1);
        }}
        defaultDate={new Date()}
        minDate={new Date(2024, 3, 18)}
        maxDate={new Date(2026, 8, 1)}
      />

      <TimeSlots 
      // key={resetKey}
      selectedDate={selectedDateString} 
      selectedSlot={selectedSlot}
      setSlot={setSlot}
      
      availableSlots={availableSlots} 
      barberData={barberData}/>
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