import  { useState } from "react";
import styled from "styled-components";


const Checkbox = ({ label, duration, onChangeFunc, isCheckedIn}) => {
    const [isChecked, setIsChecked] = useState(isCheckedIn);

    return (
      <div className="checkbox-wrapper">
          <input
            type="checkbox"
            onChange={onChangeFunc!=null?
                ()=>{setIsChecked(!isChecked); onChangeFunc();}
                :()=>setIsChecked(!isChecked)}

            className={isChecked ? "checked" : ""}
          />
         <ServiceName>{label}</ServiceName>
         {duration != null && <Duration> ({duration} minut)</Duration>}
      </div>
    );
  };

  export default Checkbox;


const ServiceName = styled.span`
margin-left: 16px;
font: 16px Roboto, sans-serif;
flex: 1;
font-weight: 600;
`;


const Duration = styled.span`
margin-left: 8px;
font: 16px Roboto, sans-serif;
font-weight: 400;
`;