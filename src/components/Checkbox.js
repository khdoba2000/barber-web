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
         {duration != null && <Duration> ({duration} min)</Duration>}
      </div>
    );
  };

  export default Checkbox;


const ServiceName = styled.span`
margin-left: 12px;
font: 16px Roboto, sans-serif;
flex: 1;
font-weight: 600;
`;


const Duration = styled.span`
margin-left: 4px;
font: 16px Roboto, sans-serif;
font-weight: 400;
`;