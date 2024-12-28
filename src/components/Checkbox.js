import  { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


const Checkbox = ({ label, description, duration, onChangeFunc, isCheckedIn}) => {
    const [isChecked, setIsChecked] = useState(isCheckedIn);

    const { t } = useTranslation();

    
    return (
      <div className="checkbox-wrapper">
          <input
            type="checkbox"
            onChange={onChangeFunc!=null?
                ()=>{setIsChecked(!isChecked); onChangeFunc();}
                :()=>setIsChecked(!isChecked)}

            className={isChecked ? "checked" : ""}
          />
         <ServiceName>{label}
         <Desc>
          <Description>{description} - <Duration>({duration}{t("min")})</Duration></Description>
         </Desc>
         </ServiceName>
         {/* {duration != null && <Duration> ({duration}min)</Duration>} */}
      </div>
    );
  };

  export default Checkbox;


const ServiceName = styled.span`
margin-left: 7px;
font: 15px Roboto, sans-serif;
flex: 1;
font-weight: 600;
`;


const Description = styled.span`
margin-left: 0px;
font: 12px Roboto, sans-serif;
font-weight: 500;
`;

const Duration = styled.span`
margin-left: 4px;
font: 16px Roboto, sans-serif;
font-weight: 400;
`;

const Desc = styled.span`
display: block;
margin-inline-start: 0px;
margin-inline-end: 0px;
unicode-bidi: isolate;
`