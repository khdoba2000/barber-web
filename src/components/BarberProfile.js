import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { fetchBarberProfile } from '../api/barberProfileApi';
import { fetchBarberPhotos } from '../api/barberPhotosApi';

const BarberProfileOld = () => {
    const { id } = useParams(); // Get the ID parameter from the URL path
    const [profile, setProfile] = useState(null);


// const hairCutsData = [
//     { id: 1, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/bb668fb67db21e7d668c44e099ae3330cc6753394312f10a5f32b5d018526bf3?apiKey=70b926e372dc42878f761519e49b3044&" },
//     { id: 2, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/10408ea148b029b18bc5fb437c6d60b0a0807320d6d297d3ab2e48732ef8da8c?apiKey=70b926e372dc42878f761519e49b3044&" },
//     { id: 3, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/c60281cff6b1bbd20dd2119139830ac0619b19c757762655fd73cbd950f627e8?apiKey=70b926e372dc42878f761519e49b3044&" },
//     { id: 4, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/406ae5eea47ba6da7a346f67f20a234d54cf3a4d799f6c7e0aebcd40589542d3?apiKey=70b926e372dc42878f761519e49b3044&" },
//     { id: 5, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac20f2f47e42ed59b3cb78aeaeea449eabbd70c3cd5a095420b1c43e45f5cf29?apiKey=70b926e372dc42878f761519e49b3044&" },
//     { id: 6, src: "https://cdn.builder.io/api/v1/image/assets/TEMP/798b1d77385afd79ff2d7988bfdf5f30a054113c2ac9a2460329b95b1d0cea09?apiKey=70b926e372dc42878f761519e49b3044&" },
//   ];

  
    useEffect(() => {
        const getBarberProfile = async () => {
            const data = await fetchBarberProfile(id);
            setProfile(data);
        };
        getBarberProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h1>{profile.fullname}</h1>
            <img src={profile.profile_photo} alt="Barber Profile" />
            <p>{profile.bio}</p>
            <p>Profile data</p>
            
            {/* Render other profile details */}
        </div>
    );
};


function BarberProfile() {
    const { id } = useParams(); // Get the ID parameter from the URL path
    const [barberData, setProfile] = useState(null);
    const [barberPhotos, setPhotos] = useState(null);
    // let barberPhotos = null;
    useEffect(() => {
        const getBarberProfile = async () => {
            const data = await fetchBarberProfile(id);
            setProfile(data);
        };
        getBarberProfile();
    }, []);

    if (!barberData) {
        return <div>Loading...</div>;
    }

    const getBarberPhotos = () => {
            const data = fetchBarberPhotos(id);
            setPhotos(data);
    };
    getBarberPhotos();

    return (
      <ProfileWrapper>
        <ProfileHeader>
          <BarberInfo>
            <BarberAvatar src={barberData.profile_photo} alt="Barber avatar" />
            <BarberStats>
              <Stat>
                <StatValue>{barberData.rating}</StatValue>
                <StatLabel>Rating</StatLabel>
              </Stat>
              <StatDivider />
              <Stat>
                <StatValue>{barberData.rated_cuts}</StatValue>
                <StatLabel>Review</StatLabel>
              </Stat>
              <StatDivider />
              <Stat>
                <StatValue>{barberData.total_cuts}</StatValue>
                <StatLabel>Works</StatLabel>
              </Stat>
            </BarberStats>
          </BarberInfo>
          <BarberName>{barberData.fullname}</BarberName>
          <LocationText>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/64e7603049f9aa8e170b26012953b52e60e2b9ca43542e42717f02ca71517af3?apiKey=70b926e372dc42878f761519e49b3044&" alt="Location icon" />
            <span>{barberData.barbershop_info.address}</span>
          </LocationText>
          <BarberRating>
            <RatingWrapper>
              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f71cb0884877195fec656a359a148165ea905df49ea2e86fc78073cae4ac6a3a?apiKey=70b926e372dc42878f761519e49b3044&" alt="Star icon" />
              <RatingValue>{barberData.rating} {barberData.bio}</RatingValue>
            </RatingWrapper>
            <RatingLabel>{barberData.specialty}</RatingLabel>
          </BarberRating>
        
        <WorkingHoursTitle>Working Hours</WorkingHoursTitle>
        <WorkingHours>
          <DaysContainer>
            <Day>Monday</Day>
            <Day>Tuesday</Day>
          </DaysContainer>
          <HoursContainer>
            <Hours>08:00 AM - 10:00 PM</Hours>
            <Hours>10:00 AM - 20:00 PM</Hours>
          </HoursContainer>
        </WorkingHours>

          <BookNowButton>Book now</BookNowButton>
        </ProfileHeader>
        

        <ProfileContent>
        <ServicesNav>
          <ServiceNavItem>
            <ServiceNavButton>Hair cuts</ServiceNavButton>
          </ServiceNavItem>
          <ServiceNavItem>
            <ServiceNavButton className="active">Services</ServiceNavButton>
          </ServiceNavItem>
        </ServicesNav>
        <HairCutsTitle>Hair cuts</HairCutsTitle>
        {/* <HairCutsGallery>
        if (barberPhotos!=nil && barberPhotos.photos!=nil) {
            barberPhotos.photos.map((hairCut) => (
                <HairCutImage key={hairCut.id} src={hairCut.photo} alt={`Hair Cut ${hairCut.id}`} />
            ))
          };
        </HairCutsGallery> */}
      </ProfileContent>
    

      </ProfileWrapper>
    );
  }
  
  const ProfileWrapper = styled.div`
    max-width: 375px;
    display: flex;
    flex-direction: column;
  `;
  
  const ProfileHeader = styled.header`
    background-color: #000;
    padding: 12px 16px 12px;
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
    width: 72px;
    aspect-ratio: 1;
    object-fit: auto;
    object-position: center;
    border: 3px solid rgba(255, 255, 255, 1);
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
  `;
  
  const StatValue = styled.div`
    color: var(--White-bg, #fff);
    font: 500 18px Roboto, sans-serif;
    font-feature-settings: "clig" off, "liga" off;
    justify-content: center;
    white-space: nowrap;
  `;
  
  const StatLabel = styled.div`
    color: var(--Gray1, #959189);
    font: 400 12px Roboto, sans-serif;
    font-feature-settings: "clig" off, "liga" off;
    margin-top: 4px;
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
  
  const BarberRating = styled.div`
    display: flex;
    gap: 11px;
    color: var(--White-bg, #fff);
    letter-spacing: 1px;
    margin-top: 11px;
  `;
  
  const RatingWrapper = styled.div`
    display: flex;
    gap: 4px;
    font: 500 16px Poppins, sans-serif;
    white-space: nowrap;
    align-self: start;
  
    img {
      width: 16px;
      aspect-ratio: 1;
      object-fit: auto;
      object-position: center;
    }
  `;
  
  const RatingValue = styled.span`
    margin: auto 0;
  `;
  
  const RatingLabel = styled.div`
    font: 400 14px Poppins, sans-serif;
    flex: 1;
  `;
  
  const WorkingHoursTitle = styled.h2`
    color: var(--White-bg, #fff);
    font: 700 16px Roboto, sans-serif;
    font-feature-settings: "clig" off, "liga" off;
    letter-spacing: 0.06px;
    margin-top: 26px;
  `;
  
  const WorkingHours = styled.div`
    display: flex;
    gap: 20px;
    color: var(--White-bg, #fff);
    font: 14px Roboto, sans-serif;
    letter-spacing: 0.15px;
    margin-top: 21px;
    padding: 0 1px;
  `;

    const Day = styled.span`
    white-space: nowrap;

    &:not(:first-child) {
    margin-top: 20px;
    }
    `;
  const DaysContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 400;
    flex: 1;
  
    div {
      font-feature-settings: "clig" off, "liga" off;
  
      &:last-child {
        margin-top: 20px;
      }
    }
  `;
  


const Hours = styled.span`
&:not(:first-child) {
  margin-top: 23px;
}  
`;
  const HoursContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-weight: 500;
    text-align: right;
    align-self: start;
    flex: 1;
  
    div {
      font-feature-settings: "clig" off, "liga" off;
  
      &:last-child {
        margin-top: 23px;
      }
    }
  `;
  
  const BookNowButton = styled.button`
    background-color: var(--Primary-orange, #c79b5e);
    color: #fff;
    font: 500 14px/24px Poppins, sans-serif;
    text-align: center;
    padding: 12px 32px;
    border-radius: 10px;
    margin-top: 29px;
    justify-content: center;
    align-items: center;
  `;
  
  const ProfileTabs = styled.div`
    display: flex;
    gap: 8px;
    font: 400 14px Roboto, sans-serif;
    text-align: center;
    margin: 24px 0 0 16px;
    align-self: start;
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
  
  const TabLabel = styled.div`
    white-space: nowrap;
    justify-content: center;
  `;



const ProfileContent = styled.main`
  padding: 24px 16px 0;
`;

const ServicesNav = styled.nav`
  display: flex;
  gap: 8px;
  font: 400 14px Roboto, sans-serif;
  text-align: center;
`;

const ServiceNavItem = styled.div`
  flex: 1;
`;

const ServiceNavButton = styled.button`
  width: 100%;
  padding: 13px;
  color: #959189;
  font: inherit;
  background-color: #fff;
  border: 1px solid #d0d7de;
  border-radius: 12px;
  box-shadow: 0 0 4px rgba(147, 147, 147, 0.25);
  cursor: pointer;
  
  &.active {
    color: #fff;
    background-color: #1d1d1d;
    border-color: #1d1d1d;
  }
`;

const HairCutsTitle = styled.h2`
  margin-top: 27px;
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