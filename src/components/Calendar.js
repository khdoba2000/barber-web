import { useState } from 'react';
import styled from "styled-components";

import { DatePicker } from '@mantine/dates';
import TimeSlots from './TimeSlots';
import { fetchAvailableSlots } from '../api/barberSlotsApi';

const Calendar = (props) => {
    const [selectedDate, setDate] = useState(null);
    const [selectedSlot, setSlot] = useState(null);
    let [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDateString, setSelectedDateString] = useState(null);
  const barberData=props.barberData
  const selectedServices=props.selectedServices

  // selectedServices.onChange=()=>{
  // console.log("Calendar reloaded. selectedServices:", selectedServices)
  // if (selectedDateString && barberData.id && selectedServices.length > 0) {
  //       fetchAvailableSlots(barberData.id, selectedDateString, selectedServices)
  //           .then((slots) => setAvailableSlots(slots))
  //           .catch((error) => console.error('Error fetching available slots:', error));
  // }

  // }
  console.log("Calendar reloaded. selectedServices:", selectedServices)
  // const [resetKey, setResetKey] = useState(0);
  return (
     <CalendarStyle>
      <DatePicker
        value={selectedDate}
        onChange={(selectedDate)=>{ 
            setDate(selectedDate)

            if (barberData.id) {
                fetchAvailableSlots(barberData.id, selectedDate, selectedServices)
                    .then((slots) => setAvailableSlots(slots))
                    .catch((error) => console.error('Error fetching available slots:', error));
            } else {
                    console.log("No selected barber ID", barberData.id)
            }

            setSlot(null)
            // setResetKey((prevKey) => prevKey + 1);
        }}
        defaultDate={new Date()}
        minDate={new Date(2024, 3, 18)}
        maxDate={new Date(2026, 8, 1)}
      />

      <TimeSlots 
      // key={resetKey}
      selectedDate={selectedDate} 
      selectedSlot={selectedSlot}
      setSlot={setSlot}
      selectedServices={selectedServices}
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