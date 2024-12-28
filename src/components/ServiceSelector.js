import * as React from "react";
import styled from "styled-components";
import Checkbox from './Checkbox';
import { useTranslation } from "react-i18next";

import {formattedNumber} from '../util';
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

  const lan = window.localStorage.getItem("currentLanguage") || "ru"
  console.log("language", lan)
  const { t } = useTranslation();

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
    // let defaultCheckedServiceID = ''
    
    let services=props.barberData.services;
    // if (services.length>0 &&
    //     selectedServices.length==0)
    //     // !selectedServices.includes(services[0])) //should be selected by default
    //     {
    //         setSelectedServices([...selectedServices, services[0]]);
    //         defaultCheckedServiceID=services[0].id;
    //      }
    const mappedServices = services.map((service) => {
     const lan = window.localStorage.getItem("currentLanguage") || "ru"
    
      const serviceTypeInfo =service.service_type_info
      const description = `${service.description}`
      const labelName = `${
        lan=="uz"
        ?serviceTypeInfo.name_uz:
         lan=='en'
         ?serviceTypeInfo.name_en
         :serviceTypeInfo.name_ru}` ;
      
      return(
      <ServiceCard key={service.id} value={service.id} >
             <Checkbox 
                label={labelName} 
                description={description}
                duration={`${service.duration}`} 
                onChangeFunc={() => handleServiceSelection(service)}
                // isCheckedIn={false}
                />
        <div>
            {service.price != null && <RightItem> {formattedNumber(service.price)} {t("sum")}</RightItem>}
        </div>                           
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
  margin-bottom: 20px;
`;

// const Heading = styled.h1`
//   color: #1d1d1d;
//   font: 700 20px/120% Roboto, sans-serif;
//   flex-grow: 1;
//   text-align: center;
// `;

const ServiceCard = styled.div`
  padding: 0px 12px;
  margin-bottom: 12px;
  width: 100%;
  border: 1px solid #D0D7DE;
  border-radius: 8px;
  font-weight: 400;
  background-color:  #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const RightItem = styled.span`
margin: auto 0;
font: 13px Roboto, sans-serif;
font-weight: 500;
`;

export default ServiceSelector;
