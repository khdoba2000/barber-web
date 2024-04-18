import  React, {useEffect, useState}  from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { Button } from '@mantine/core';

import Calendar from './Calendar';
import ServiceSelector from './ServiceSelector';
import { fetchBarberProfile } from '../api/barberProfileApi';

const BookingPage = () => {
  const { id } = useParams(); 

  const [barberData, setProfile] = useState(null);
  const barberID = id

  console.log("barberID:", barberID) 
  
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
          <ServiceSelector id={id} barberData={barberData} />
          <Calendar barberID={barberID}/>
          {/* {/* Add a button to confirm booking */}
      </div>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 375px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 0 16px 16px;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
`;

const Heading = styled.h1`
  color: #1d1d1d;
  font: 700 20px/120% Roboto, sans-serif;
  flex-grow: 1;
  text-align: center;
`;

const ServiceCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 12px 16px;
  margin-top: 12px;
  width: 100%;
  max-width: 343px;
  background-color: #fff;
  border: 1px solid rgba(208, 215, 222, 1);
  border-radius: 8px;
  font-weight: 600;
`;

const ServiceDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
`;

const ServiceIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const ServiceName = styled.span`
  font-family: Roboto, sans-serif;
`;

const Duration = styled.span`
  font-weight: 400;
`;

const Price = styled.span`
  color: #1d1d1d;
  font: 20px Roboto, sans-serif;
`;

export default BookingPage;
