import {
  Center,
  Flex,
  Image,
  Input,
  InputGroup,
  Stack,
  InputLeftAddon,
  InputRightAddon,
  InputLeftElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaLock, FaPhone } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { api } from "../api/api";
export default function ChangePasswordPage() {
  const [token, setToken] = useState();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [newPassword, setNewPassword] = useState({
    password: "",
  });
  useEffect(() => {
    console.log(location);
    //   "/","forgot-password", "sahkdjsahkdjsahjkdhsakjdsa"
    const token2 = location.pathname.split("/")[2]; // ini variable sementara untuk nampung
    //   ["", forgot-password , setiPkRkDCbKGZ6aYy-fq]
    //setiPkRkDCbKGZ6aYy-fq
    fetchUser(token2);
    setToken(token2);
  }, []);
  async function fetchUser(token) {
    await api
      .get("http://localhost:4000/auth/v3?token=" + token)
      .then((res) => {
        console.log("lola");
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  async function submit() {
    await api
      .patch("http://localhost:4000/auth/v4?token=" + token, newPassword)
      .then(() => alert("password succesfully changed"));
  }

  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...newPassword };
    tempobject[id] = value;
    setNewPassword(tempobject);
    console.log(tempobject);
  }
  return (
    <>
      <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Center fontWeight={"bold"} padding="10px">
          Change New Password
        </Center>
        <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaLock fontSize="16px" />
            </InputLeftAddon>
            <Input
              padding={"6px 12px"}
              type="password"
              id="password"
              maxLength={"6"}
              placeholder="6 digits Number"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  // e.target.value = e.target.value.slice();
                  inputHandler(e);
                } else {
                  console.log(user);
                  console.log("lol");
                  e.target.value = user.password;
                }
              }}
            />
          </InputGroup>
        </Stack>

        <Flex
          justifyContent={"space-between"}
          w="100%"
          padding="10px"
          paddingBottom="20px"
          flexDir={"column"}
        >
          <Center
            w="100%"
            padding="10px"
            paddingBottom="20px"
            borderBottom={"1px solid #333"}
          >
            <Button
              color="white"
              bgColor={"#006666"}
              border="1px solid #005350"
              padding="6px 12px"
              onClick={submit}
            >
              Change Password
            </Button>
          </Center>
        </Flex>
      </Center>
    </>
  );
}

export function ChangePasswordPage2() {
  return (
    <>
      <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Center fontWeight={"bold"} padding="10px">
          Change Password
        </Center>
        <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaLock fontSize="16px" />
            </InputLeftAddon>
            <Input
              padding={"6px 12px"}
              type="password"
              maxLength={"6"}
              placeholder="6 digits Number"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              onChange={(e) => {
                if (isNaN(e.target.value)) {
                  e.target.value = "";
                }
              }}
            />
          </InputGroup>

          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaLock fontSize="16px" />
            </InputLeftAddon>
            <Input
              padding={"6px 12px"}
              type="password"
              placeholder="Input New Password"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
            />
          </InputGroup>
        </Stack>

        <Flex
          justifyContent={"space-between"}
          w="100%"
          padding="10px"
          paddingBottom="20px"
          flexDir={"column"}
        >
          <Center
            w="100%"
            padding="10px"
            paddingBottom="20px"
            borderBottom={"1px solid #333"}
          >
            <Button
              color="white"
              bgColor={"#006666"}
              border="1px solid #005350"
              padding="6px 12px"
            >
              Change Password
            </Button>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
