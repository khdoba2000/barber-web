import  React, {useEffect, useState}  from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

import Calendar from './Calendar';
import { fetchBarberProfile } from '../api/barberProfileApi';

const BookingPage = () => {
  const { id } = useParams(); 

  const [barberData, setProfile] = useState(null);

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
    <ProfileHeader>

          {/* <Button>Click me!</Button>; */}
          <h2>{barberData.fullname}</h2>
          
          <Calendar 
            barberData={barberData}
          />
          {/* {/* Add a button to confirm booking */}
          {/* {selectedServices.len > 0 && (
            <p>selectedServices[0].name </p>
          )} */}
              </ProfileHeader>

  );
};



const ProfileHeader = styled.header`
background-color: #fff;
padding: 2px 10px 6px;
display: flex;
flex-direction: column;
align-items: center;
`;
export default BookingPage;
