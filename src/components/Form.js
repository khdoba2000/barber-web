import { useState } from "react";
import { Modal, Button, Box, Input, Alert, Text } from "@mantine/core";
import { IconPhone, IconKey, IconInfoCircle } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { notifications } from "@mantine/notifications";
import {removeAccount, sendVerificationCode, verifyVerificationCode} from '../api/sendCodeApi';

import axios from 'axios';

export default function Form() {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState(0);
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    phoneNumber: "",
    smsCode: "",
    code_id: 0,
  });

  const setNumber = (value) => {
    setInputs((prev) => ({ ...prev, phoneNumber: value }));
  };

  const showError = (error) => {
    let str = String(error?.response?.data?.data?.message);
    notifications.show({
      title: error?.message,
      message: str,
      color: "red",
    });
  };

  const decodePhoneNumber = () => {
    let fix_number =
      inputs.phoneNumber.slice(1, 3) +
      inputs.phoneNumber.slice(5, 8) +
      inputs.phoneNumber.slice(9, 11) +
      inputs.phoneNumber.slice(12);
    return fix_number;
  };

  const handleOnChange = (event) => {
    let number = event.target.value;
    const phoneNumber = number.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 3) {
      return setNumber(phoneNumber);
    }
    if (phoneNumberLength < 6) {
      let newStr = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
      return setNumber(newStr);
    }
    if (phoneNumberLength < 8) {
      let newStr2 = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
        2,
        5
      )}-${phoneNumber.slice(5, 7)}`;
      return setNumber(newStr2);
    }
    let newStr3 = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(
      2,
      5
    )}-${phoneNumber.slice(5, 7)}-${phoneNumber.slice(7, 9)}`;
    return setNumber(newStr3);
  };

  const sendCode = async () => {
    setLoading(true);
    let phone_number = decodePhoneNumber();
    await sendVerificationCode(phone_number)
      .then((res) => {
        setInputs((prev) => ({ ...prev }));
        setStatus(1);
      })
      .catch((err) => {
        showError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const login = async () => {
    setLoading(true);
    let phone_number = decodePhoneNumber();

    removeAccount("998" + phone_number, inputs.smsCode)
      .then(() => {
        alert(t("account deleted successfully"));
        setInputs({
          phoneNumber: "",
          smsCode: "",
        });
        setStatus(0);
        close();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        showError(err);
      });
  };

  const check = async () => {
    let phone_number = decodePhoneNumber();
    if (status === 0) {
      if (phone_number?.length === 9) {
        notifications.clean();
        if (phone_number === "900000000") {
          setStatus(1);
        } else {
          sendCode();
        }
      } else {
        notifications.show({
          message: t("wrong phone number"),
          color: "red",
        });
      }
    } else if (status === 1) {
      if (inputs.smsCode?.length === 4) {
        notifications.clean();
        if (phone_number === "900000000" && inputs.smsCode === "0000") {
          login();
        } else {
          login();
        }
      } else {
        notifications.show({
          message: t("wrong verification code"),
          color: "red",
        });
      }
    }
  };

  return (
    <Box m={"md"}>
      <Modal
        overlayProps={{
          blur: 3,
        }}
        shadow="md"
        closeOnEscape={false}
        closeOnClickOutside={false}
        opened={opened}
        onClose={() => {
          close();
          notifications.clean();
        }}
        title=""
      >
        <Input
          disabled={status !== 0}
          value={inputs.phoneNumber}
          onChange={handleOnChange}
          icon={<IconPhone strokeWidth={1} />}
          placeholder="(xx) xxx-xx-xx"
        />

        {status === 1 && (
          <>
            <Alert color="green" icon={<IconInfoCircle />} mt={"sm"}>
              <Text sx={{ fontFamily: "Rubik" }}>
                {t("verification code prompt")}
              </Text>
            </Alert>
            <Input
              type="number"
              mt={"sm"}
              value={inputs.smsCode}
              onChange={(e) => {
                if (e.target.value?.length <= 4) {
                  setInputs((prev) => ({
                    ...prev,
                    smsCode: e.target.value?.trim(),
                  }));
                }
              }}
              icon={<IconKey strokeWidth={1} />}
              placeholder="xxxx"
            />
          </>
        )}

        <Button
          loading={loading}
          onClick={check}
          variant="light"
          color={status === 0 ? "blue" : "red"}
          fullWidth
          mt={"sm"}
        >
          {status === 0 ? t("getCode") : t("removeAccount")}
        </Button>
      </Modal>

      <Button onClick={open} color="red" variant="outline" mt={"sm"}>
        {t("removeAccount")}
      </Button>
    </Box>
  );
}
