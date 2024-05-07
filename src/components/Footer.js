import {  Image, Group } from "@mantine/core";
import google_play from "../assets/google_play.png";
import logo from "../assets/ubarber.png";

export default function Footer() {

  return (
    <Group 
    className="footer"
    >

  <div className="info-label">  

      <a href="https://www.instagram.com/u_barber_uz?igsh=MXBzZ2M5Y2NjZ25scg==">
        <Image
        // href="https://www.instagram.com/u_barber_uz?igsh=MXBzZ2M5Y2NjZ25scg=="
          fit="contain"
          width={200}
          height={35}
          src={logo}
          alt="Random image"
          radius={"md"}
        />
        </a>
    </div>

    <div className="info-label">  
  
        <a href="https://play.google.com/store/apps/details?id=com.nest_app.ubarber">
                    <Image 
                    // href="https://play.google.com/store/apps/details?id=com.nest_app.ubarber"
                     fit="contain"
                     width={40}
                     height={40}
                     src={google_play}
                     alt="Random image"
                     radius={"md"}
                   
                     target="_blank" rel="noreferrer"/>
                    
                    </a>
        </div>      
    </Group>
  );
}
