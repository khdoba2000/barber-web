import {  Image, Group } from "@mantine/core";
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

    
    </Group>
  );
}
