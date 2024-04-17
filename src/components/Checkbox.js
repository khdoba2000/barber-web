import  { useState } from "react";


const Checkbox = ({ label, labelRight, onChangeFunc }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
    
      <div className="checkbox-wrapper">
        <label>
          <input
            type="checkbox"
            onChange={onChangeFunc!=null?
                ()=>{setIsChecked(!isChecked);onChangeFunc();}
                :()=>setIsChecked(!isChecked)}

            className={isChecked ? "checked" : ""}
          />
          <span style={{justifyContent: 'space-between', width: '100%', marginBottom: '0px'}}>{label}</span>
          {labelRight != null && <span style={{textAlign: 'right'}}> -  {labelRight} so‘m</span>}
        </label>
        {/* <p>{isChecked ? "Selected" : "Unchecked"}</p> */}
      </div>
    );
  };

  export default Checkbox;
  