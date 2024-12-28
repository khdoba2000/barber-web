import { Flex, Image, Text } from "@mantine/core";
import {  Link } from 'react-router-dom';
import styled from "styled-components";
import LanguagePicker from './LanguagePicker';

import logo from "../assets/logo-no-background.png";
export default function Navbar(props) {

  return (
    <Flex p={"xs"} 
    align={"center"} 
    justify={"space-between"}
    padding={"10px"}
    >
      <Flex align={"center"}>
        {props.link_to && (
           <Link to={`/${props.link_to}`}>
          <IconWrapper>
            <Icon src="https://cdn.builder.io/api/v1/image/assets/TEMP/82bdbaf7d9576d129b6a07c4693b6c81faa1282868e1822876c984946f76f55b?apiKey=70b926e372dc42878f761519e49b3044&" alt="Schedule icon" />
          </IconWrapper>
          </Link> 
        )}
        {!props.link_to &&(
        <Image
          fit="cover"
          width={110}
          height={22}
          src={logo}
          alt="Random image"
          radius={"md"}
        /> )}
        {!props.only_logo && (
        <Text
          weight={500}
          sx={{
            fontFamily: "Rubik",
            fontSize: 28,
            "@media (max-width: 480px)": {
              fontSize: 20,
            },
          }}
          ml={"md"}
        >
          {props.title}
        </Text>)
        }
      </Flex>
      {!props.without_languagePicker && (
         <LanguagePicker />
      )}
    </Flex>
  );
}

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
`;

const Icon = styled.img`
  width: 24px;
  aspect-ratio: 1;
  object-fit: contain;
`;