import * as React from "react";
import  { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Checkbox from './Checkbox';
// const services = [
//   {
//     id: 1,
//     name: "Hair Cut",
//     duration: "1 hour",
//     price: "50000",
//   },
//   {
//     id: 2,
//     name: "Beard",
//     duration: "20 min",
//     price: "25000",
//   },
//   {
//     id: 3,
//     name: "Special Cut",
//     duration: "1 hour",
//     price: "90000",
//   },
// ];



const ServiceSelector = (props) => {

    const [selectedServices, setSelectedServices] = useState([]);
    const handleServiceSelection = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter((id) => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    
    let services=props.barberData.services;
    const mappedServices = services.map((service, index) => {
        const labelName = `${service.name} - ${service.duration}(min)` ;
       
       return  (<ServiceCard key={service.id} value={service.id} >
             <Checkbox 
                label={labelName} 
                labelRight={service.price} 
                onChangeFunc={() => handleServiceSelection(service.id)}
                checked={index==0?true:false}/>                        
        </ServiceCard>
        )
       });

  return (
    <Container>
      <Header>
      <Link to={`/barbers/${props.id}`}>
        <IconWrapper>
          <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/82bdbaf7d9576d129b6a07c4693b6c81faa1282868e1822876c984946f76f55b?apiKey=70b926e372dc42878f761519e49b3044&" alt="Schedule icon" />
        </IconWrapper>
        </Link>
      </Header>
       {mappedServices}
      <p>Selected Services: {selectedServices.join(', ')}</p>
       
    </Container>
  );
}

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

// const Heading = styled.h1`
//   color: #1d1d1d;
//   font: 700 20px/120% Roboto, sans-serif;
//   flex-grow: 1;
//   text-align: center;
// `;

const ServiceCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 4px 8px;
  margin-top: 4px;
  margin-bottom: 6px;
  width: 100%;
  max-width: 343px;
  background-color: #fff;
  border: 1px solid rgba(208, 215, 222, 1);
  border-radius: 4px;
  font-weight: 600;
`;

const ServiceDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
`;

const ServiceIcon = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  left: 32px;
  top: 244px;
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

export default ServiceSelector;
