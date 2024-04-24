import  React, {useEffect, useState}  from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

import Calendar from './Calendar';
import ServiceSelector from './ServiceSelector';
import { fetchBarberProfile } from '../api/barberProfileApi';

const BookingPage = () => {
  const { id } = useParams(); 

  const [barberData, setProfile] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);

  const barberID = id

  console.log("BookingPage: barberID:", barberID) 
  
  useEffect(() => {
        const getBarberProfile = async () => {
            const profile = await fetchBarberProfile(id);
            // console.log("profile:", profile)
            setProfile(profile);
        };
        getBarberProfile();
  }, []);

  if (!barberData) {
        return <div>Loading...</div>;
  }
  
  return (
      <div>
          {/* <Button>Click me!</Button>; */}
          <h2>Booking page</h2>
          <ServiceSelector 
            id={id} 
            barberData={barberData} 
            selectedServices={selectedServices} 
            setSelectedServices={setSelectedServices}
            // serviceChangeCallback={serviceChangeCallback}
           />
          <Calendar 
            barberID={barberID} 
            barberData={barberData}
            selectedServices={selectedServices}
          />
          {/* {/* Add a button to confirm booking */}
          {/* {selectedServices.len > 0 && (
            <p>selectedServices[0].name </p>
          )} */}
      </div>
  );
};


export default BookingPage;
