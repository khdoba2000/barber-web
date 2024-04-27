import  React, {useEffect, useState}  from "react";
import styled from "styled-components";
import { useParams, Link } from 'react-router-dom';

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
          <Header>
        <Link to={`/barbers/${barberData.id}`}>
          <IconWrapper>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/82bdbaf7d9576d129b6a07c4693b6c81faa1282868e1822876c984946f76f55b?apiKey=70b926e372dc42878f761519e49b3044&" alt="Schedule icon" />
          </IconWrapper>
          </Link>
        </Header>
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
padding: 2px 0px 0px;
display: flex;
flex-direction: column;
align-items: center;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 2px 2px 2px 2px;
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


export default BookingPage;
