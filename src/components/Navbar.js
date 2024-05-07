import { Flex, Image, Select, Text } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/ubarber.png";
export default function Navbar(props) {
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  const [currentLang, setCurrentLanguage] = useState(
    window.localStorage.getItem("currentLanguage") || "ru"
  );

  return (
    <Flex p={"xs"} 
    align={"center"} 
    justify={"space-between"}
    padding={"10px"}
    >
      <Flex align={"center"}>
        <Image
          fit="cover"
          width={110}
          height={22}
          src={logo}
          alt="Random image"
          radius={"md"}
        />
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
          uBarber
        </Text>)
        }
      </Flex>
      {!props.without_languagePicker && (
      <Select
        onChange={(lang) => {
          changeLanguage(lang);
          localStorage.setItem("currentLanguage", lang);
          setCurrentLanguage(lang);
        }}
        sx={{ width: 100 }}
        value={currentLang}
        placeholder="select a language"
        data={[
          { value: "ru", label: "ru" },
          { value: "uz", label: "uz" },
          { value: "en", label: "en" },
        ]}
        icon={<IconWorld size="1rem" />}
      />
      )}
    </Flex>
  );
}
