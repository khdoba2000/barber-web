import { Alert, Anchor, Box, List, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

export default function AlertBox() {
  const { t } = useTranslation();

  return (
    <Alert
      m={"md"}
      icon={<IconAlertCircle size="2rem" />}
      title={t("alert")}
      color="red"
      radius="md"
    >
      <Text sx={{ fontSize: 14, fontFamily: "Rubik" }}>
        {t("delete account text1")}
      </Text>
      <List sx={{ fontFamily: "Rubik", fontSize: 14 }} mt={"sm"}>
        <List.Item>{t("delete account text2")}</List.Item>
        <List.Item>{t("delete account text3")}</List.Item>
      </List>
      {/* <Text mt={"md"} sx={{ fontSize: 14, fontFamily: "Rubik" }}>
        {t("delete account text4")}
      </Text> */}
      <Text mt={"sm"} sx={{ fontSize: 14, fontFamily: "Rubik" }}>
        {t("delete account text5")}
      </Text>
      <Box mt={"sm"}>
        <Anchor href="mailto:ubarberadm@gmail.com" target="_blank">
          ubarberadm@gmail.com
        </Anchor>
      </Box>
    </Alert>
  );
}
