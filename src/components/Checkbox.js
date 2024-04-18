import  { useState } from "react";
import styled from "styled-components";


const Checkbox = ({ label, labelRight, onChangeFunc }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
    
      <div className="checkbox-wrapper">
          <input
            type="checkbox"
            onChange={onChangeFunc!=null?
                ()=>{setIsChecked(!isChecked);onChangeFunc();}
                :()=>setIsChecked(!isChecked)}

            className={isChecked ? "checked" : ""}
          />
         <ServiceName>{label}</ServiceName> {labelRight != null && <RightItem> - {labelRight} so‘m</RightItem>}
      </div>
    );
  };

  export default Checkbox;


const ServiceName = styled.span`
margin: auto 0;
font: 14px Roboto, sans-serif;
flex: 1;
font-weight: 700;
`;


const RightItem = styled.span`
margin: auto 0;
font: 14px Roboto, sans-serif;
font-weight: 500;
`;