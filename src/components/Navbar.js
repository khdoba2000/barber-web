import { Flex, Image, Select, Text } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/barber.ico";
export default function Navbar() {
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  const [currentLang, setCurrentLanguage] = useState(
    window.localStorage.getItem("currentLanguage") || "ru"
  );

  return (
    <Flex p={"xs"} align={"center"} justify={"space-between"}>
      <Flex align={"center"}>
        <Image
          fit="cover"
          width={70}
          height={70}
          src={logo}
          alt="Random image"
          radius={"md"}
        />
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
          uBarber
        </Text>
      </Flex>

    </Flex>
  );
}
