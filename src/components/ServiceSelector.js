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

  const selectedServices = props.selectedServices;
  const setSelectedServices = props.setSelectedServices;
  // const serviceChangeCallback = props.serviceChangeCallback
    const handleServiceSelection = (service) => {
        if (selectedServices.filter((s) => s.id === service.id).length>0) {
            setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
        console.log("Selected services", selectedServices);
        // serviceChangeCallback(selectedServices);
    };
    let defaultCheckedServiceID = ''
    
    let services=props.barberData.services;
    if (services.length>0 &&
        selectedServices.length==0 &&
        !selectedServices.includes(services[0])) {//should be selected by default
            setSelectedServices([...selectedServices, services[0]]);
            defaultCheckedServiceID=services[0].id;
    }
    const mappedServices = services.map((service) => {
      const labelName = `${service.name} ` ;
      return(
      <ServiceCard key={service.id} value={service.id} >
             <Checkbox 
                label={labelName} 
                labelRight={`${service.duration}(min) - ${service.price}`} 
                onChangeFunc={() => handleServiceSelection(service)}
                isCheckedIn={service.id===defaultCheckedServiceID}/>                        
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
  justify-content: space-between;
  align: left;
  padding: 4px 8px;
  margin-top: 4px;
  margin-bottom: 6px;
  width: 100%;
  max-width: 493px;
  border: 1px solid rgba(208, 215, 222, 1);
  border-radius: 3px;
  font-weight: 400;
`;


export default ServiceSelector;
