import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { fetchBarberProfile } from '../api/barberProfileApi';
import { fetchBarberPhotos } from '../api/barberPhotosApi';

// import {BookingPage} from './BookingPage';

import { Link } from 'react-router-dom';


const weekdays = {
  en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  uz: ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba', 'Yakshanba'],
  ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
};

function BarberProfile() {
    const { id } = useParams(); // Get the ID parameter from the URL path
    const [barberData, setProfile] = useState(null);
    const [barberPhotos, setPhotos] = useState(null);
    useEffect(() => {
        const getBarberProfile = async () => {
            const profile = await fetchBarberProfile(id);
            const photos = await fetchBarberPhotos(id);
            // console.log("photos:", photos)
            // console.log("profile:", profile)

            setProfile(profile);
            setPhotos(photos);
        };
        getBarberProfile();
    }, []);

    if (!barberData) {
        return <div>Loading...</div>;
    }

    return (
      <ProfileWrapper>
        <ProfileHeader>
          <BarberInfo>
            <BarberAvatar src={barberData.profile_photo} alt="Barber avatar" />
            <BarberStats>
              <Stat>
                <StatValue>{barberData.rating}</StatValue>
                <StatLabel>Reyting</StatLabel>
              </Stat>
              <StatDivider />
              <Stat>
                <StatValue>{barberData.rated_cuts}</StatValue>
                <StatLabel>Baholar</StatLabel>
              </Stat>
              <StatDivider />
              <Stat>
                <StatValue>{barberData.total_cuts}</StatValue>
                <StatLabel>Ishlari</StatLabel>
              </Stat>
            </BarberStats>
          </BarberInfo>
          <BarberName>{barberData.fullname}</BarberName>
          <LocationText>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/64e7603049f9aa8e170b26012953b52e60e2b9ca43542e42717f02ca71517af3?apiKey=70b926e372dc42878f761519e49b3044&" alt="Location icon" />
            <span>{barberData.barbershop_info.address}</span>
          </LocationText>
          <BarberBio>
              {barberData.bio}
          </BarberBio>
        
        <WorkingHoursTitle>Ish vaqti</WorkingHoursTitle>
       
        <WorkingHours>
          {
          <BarberSchedule schedule={barberData.schedule} />
          }
        </WorkingHours>
        {/* {console.log("barberData:", barberData)}
        {console.log("testState:", testState)} */}
       
       <BookNowButton>
        <Link to={{
          pathname: `/booking/${id}`, 
          // state:  {testState},
        }}>
          <BookNowButtonText>
          Band qilish
          </BookNowButtonText>

        </Link>       
        </BookNowButton>
        
        </ProfileHeader>
        
        <ProfileContent>

        <HairCutsTitle>Ishlari</HairCutsTitle>
        <HairCutsGallery>
        {
          getBarberPhotos(barberPhotos).map((hairCut) => (
            // console.log("hairCut:", hairCut),
            <HairCutImage 
              key={hairCut.id} 
              src={hairCut.photo} 
              alt={`Hair Cut ${hairCut.id}`}             
            />
           ))
        }
        </HairCutsGallery>
        
      </ProfileContent>

      </ProfileWrapper>
    );
  }
  

const BarberSchedule = ({ schedule }) => {
  return (
      <div>
          <div className="schedule-list">
              {weekdays.en.map((day, index) => (
                    <div key={index} className="schedule-item">
                     {/* <ProfileDay>{weekdays.uz[index]} <ProfileHour>{schedule[`${day.toLowerCase()}_interval`]}</ProfileHour></ProfileDay> */}
                     <p className="weekday">{weekdays.uz[index]}</p>
                     <p className="interval">{schedule[`${day.toLowerCase()}_interval`]}</p>
                    </div>
                ))
            }
          </div>
      </div>
  );
};


  const getBarberPhotos = (barberPhotos) => {
  //  console.log("getBarberPhotos barberPhotos:", barberPhotos)
    if (barberPhotos==null || barberPhotos.photos==null) {
      return []
    }
    return barberPhotos.photos
  }
  const ProfileWrapper = styled.div`
    max-width: 375px;
    display: flex;
    flex-direction: column;
  `;
  
  const ProfileHeader = styled.header`
    background-color: #000;
    padding: 2px 10px 6px;
    display: flex;
    flex-direction: column;
  `;
  
  const BarberInfo = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    letter-spacing: 0.07px;
    margin-top: 17px;
  `;
  
  const BarberAvatar = styled.img`
    width: 90px;
    aspect-ratio: 0.95;
    object-fit: auto;
    object-position: center;
    border: 2px solid rgba(255, 255, 255, 1);
    border-radius: 50%;
  `;
  
  const BarberStats = styled.div`
    display: flex;
    gap: 20px;
    margin: auto 0;
    padding-right: 31px;
    align-items: start;
    justify-content: center;
  `;
  
  const Stat = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  
  const StatValue = styled.div`
    color: var(--White-bg, #fff);
    font: 600 28px Roboto, sans-serif;
    font-feature-settings: "clig" off, "liga" off;
    justify-content: center;
    white-space: nowrap;
  `;
  
  const StatLabel = styled.div`
    color: var(--Gray1, #959189);
    font: 500 14px Roboto, sans-serif;
    font-feature-settings: "clig" off, "liga" off;
    margin-top: 2px;
  `;
  
  const StatDivider = styled.div`
    width: 1px;
    height: 41px;
    background-color: #323232;
    border: 1px solid rgba(50, 50, 50, 1);
    align-self: stretch;
  `;
  
  const BarberName = styled.h1`
    color: var(--White-bg, #fff);
    font: 600 16px Roboto, sans-serif;
    font-feature-settings: "clig" off, "liga" off;
    letter-spacing: 0.06px;
    margin-top: 19px;
  `;
  
  const LocationText = styled.div`
    display: flex;
    gap: 4px;
    color: var(--Grey, #8fa0b4);
    font: 400 14px Roboto, sans-serif;
    margin-top: 9px;
  
    img {
      width: 16px;
      aspect-ratio: 1;
      object-fit: auto;
      object-position: center;
    }
  `;
  
  const BarberBio = styled.div`
    display: flex;
    gap: 11px;
    color: var(--White-bg, #fff);
    letter-spacing: 1px;
    margin-top: 11px;
  `;
  
 
 
  
  const WorkingHoursTitle = styled.h2`
    color: var(--White-bg, #fff);
    font: 700 18px Roboto, sans-serif;
    font-feature-settings: "clig" off, "liga" off;
    letter-spacing: 0.06px;
    margin-top: 20px;
    margin-bottom: 0px;
  `;
  
  const WorkingHours = styled.div`
    color: var(--White-bg, #fff);
    font: 15px Roboto, sans-serif;
    letter-spacing: 0.15px;
    padding: 0 2px;
  `;

  const BookNowButton = styled.button`
    background-color: var(--Primary-orange, #b3532d);
    color: #fff;
    font: 700 18px/24px Poppins, sans-serif;
    text-align: center;
    padding: 12px 22px;
    border-radius: 150px;
    margin-top: 20px;
    justify-content: center;
    align-items: center;
  `;

  const BookNowButtonText = styled.div`
    color: #fff;
    font: 700 18px/24px Poppins, sans-serif;
  `;
  
  const Tab = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 13px 21px;
    border-radius: 12px;
    box-shadow: 0px 0px 4px 0px rgba(147, 147, 147, 0.25);
    flex: 1;
  
    ${({ active }) =>
      active
        ? `
            color: var(--White-bg, #fff);
            background-color: var(--Color-1, #1d1d1d);
            border: 1px solid rgba(29, 29, 29, 1);
          `
        : `
            color: var(--Gray1, #959189);
            background-color: var(--white, #fff);
            border: 1px solid rgba(208, 215, 222, 1);
          `}
  `;
  

const ProfileContent = styled.main`
  padding: 8px 16px 0;
`;

const HairCutsTitle = styled.h2`
  margin-top: 0px;
  color: #000;
  font: 700 16px Roboto, sans-serif;
  letter-spacing: 0.06px;
`;

const HairCutsGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 21px;
`;

const HairCutImage = styled.img`
  width: calc(33.33% - 5.33px);
  aspect-ratio: 0.75;
  object-fit: cover;
`;

  
  export default BarberProfile;