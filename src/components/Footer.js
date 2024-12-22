import {  Image, Group } from "@mantine/core";
import logo from "../assets/logo-no-background.png";

export default function Footer() {

  return (
    <Group 
    className="footer"
    >

  <div className="info-label">  
      <a href="https://www.instagram.com/topmaster_uz"  target="_blank" rel="noreferrer">
        <Image
        // href="https://www.instagram.com/topmaster_uz"
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
