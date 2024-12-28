import { Select } from "@mantine/core";
import { IconWorld } from "@tabler/icons-react";
import { useState } from "react";

import { useTranslation } from "react-i18next";


export default function LanguagePicker(){
    
    const {
        i18n: { changeLanguage },
    } = useTranslation();

    const [currentLang, setCurrentLanguage] = useState(
        window.localStorage.getItem("currentLanguage") || "ru"
    );

    return (
    <Select
        onChange={(lang) => {
          changeLanguage(lang);
          localStorage.setItem("currentLanguage", lang);
          setCurrentLanguage(lang);
        }}
        sx={{ width: 100 }}
        value={currentLang.slice({start:0, end:2})}
        placeholder="select a language"
        data={[
          { value: "ru", label: "Русский" },
          { value: "uz", label: "O'zbek" },
          { value: "en", label: "English" },
        ]}
        icon={<IconWorld size="1rem" />}
      />
    )

}