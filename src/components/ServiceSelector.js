import * as React from "react";
import styled from "styled-components";
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
        // console.log("Selected services", selectedServices);
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
        {mappedServices}    
      </Container>
    );
}

const Container = styled.div`
`;

// const Heading = styled.h1`
//   color: #1d1d1d;
//   font: 700 20px/120% Roboto, sans-serif;
//   flex-grow: 1;
//   text-align: center;
// `;

const ServiceCard = styled.div`
  padding: 4px 8px;
  margin-bottom: 8px;
  width: 100%;
  border: 1px solid rgba(208, 215, 222, 1);
  border-radius: 5px;
  font-weight: 400;
  background-color:  #f9f6ed;
`;


export default ServiceSelector;
