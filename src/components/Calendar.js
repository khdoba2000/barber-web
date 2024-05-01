import { useState,useEffect,useRef} from 'react';
import styled from "styled-components";

import { DatePicker } from '@mantine/dates';
import TimeSlots from './TimeSlots';
import { fetchAvailableSlots } from '../api/barberSlotsApi';
import ServiceSelector from './ServiceSelector';


const Calendar = (props) => {
  const [selectedDate, setDate] = useState(null);
  let [availableSlots, setAvailableSlots] = useState([]);
  const [isReservationSucceeded, setIsReservationSucceeded] = useState(false);
  const barberData=props.barberData

  const [selectedServices, setSelectedServices] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    console.log("useEffect reloaded. selectedDate,barberData.id,selectedServices.length:", selectedDate, barberData.id,selectedServices.length)
    if (barberData.id && selectedDate && selectedServices.length>0) {
       fetchAvailableSlots(barberData.id, selectedDate, selectedServices)
          .then((slots) => setAvailableSlots(slots))
          .catch((error) => console.error('Error fetching available slots:', error));
    } else {
          console.log("No selected barber ID", barberData.id)
    }
  }, [selectedServices]);

  const scrollToLowerPart = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  console.log("Calendar reloaded. selectedServices: ,isReservationSucceeded: ", selectedServices, isReservationSucceeded)
  // const [resetKey, setResetKey] = useState(0);
  // refreshSlots(selectedServices);

  return (
     <CalendarStyle>
      {!isReservationSucceeded && (
        <ServiceSelector 
        barberData={barberData} 
        selectedServices={selectedServices} 
        setSelectedServices={setSelectedServices}
       />
      )}

      {!isReservationSucceeded &&(
        <div style={{
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
        }}>  
          <DatePicker
            value={selectedDate}
            onChange={(selectedDate)=>{ 
                setDate(selectedDate);
                if (barberData.id) {
                    fetchAvailableSlots(barberData.id, selectedDate, selectedServices)
                        .then((slots) => {setAvailableSlots(slots);scrollToLowerPart();})
                        .catch((error) => console.error('Error fetching available slots:', error));
                } else {
                      console.log("No selected barber ID", barberData.id)
                }
                // setResetKey((prevKey) => prevKey + 1);
            }}
            defaultDate={new Date()}
            minDate={new Date()}
            maxDate={new Date().setMonth(new Date().getMonth() + 1)}
            size={"lg"}
            style={{ marginLeft: '10px',
            marginRight: '10px',
            }} // Add margin here
          />
         </div>
      )}
      
      <div ref={ref}>
      <TimeSlots 
      // key={resetKey}
      selectedDate={selectedDate} 
      selectedServices={selectedServices}
      availableSlots={availableSlots} 
      barberData={barberData}
      isReservationSucceeded={isReservationSucceeded}
      setIsReservationSucceeded={setIsReservationSucceeded} 
      />
        </div>
    </CalendarStyle>
  );
};

export default Calendar;


const CalendarStyle = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 400;
  padding: 10px 15px;
  

`;