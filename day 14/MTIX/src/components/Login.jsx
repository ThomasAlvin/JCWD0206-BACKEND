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
import { useState } from "react";
import { FaLock, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api } from "../api/api";
export default function Login() {
  const [logginIn, setLoggingIn] = useState({});
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...logginIn };
    tempobject[id] = value;
    setLoggingIn(tempobject);
    console.log(logginIn);
  }
  async function onSubmit() {
    let token;
    try {
      await api.post("http://localhost:4000/auth/v2", logginIn).then((res) => {
        localStorage.setItem("auth", JSON.stringify(res.data.token));
        token = res.data.token;
        alert("sukses");
      });
    } catch (err) {
      alert("phonenum/password salah");
    }
  }
  return (
    <>
      <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Image
          src="https://m.21cineplex.com/images/mtixlogo.jpg"
          w="100vw"
          maxW="296px"
          h="120px"
        />
        <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaPhone fontSize="16px" />
            </InputLeftAddon>
            <Input
              padding={"6px 12px"}
              type="tel"
              placeholder="Handphone number"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              id="phonenum"
              onChange={inputHandler}
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
              type="tel"
              placeholder="PIN/Password"
              border="1px solid #ccc"
              w="100vw"
              maxW="355px"
              onChange={inputHandler}
              id="pin"
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
          <Flex
            justifyContent={"space-between"}
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
              w="59px"
              onClick={onSubmit}
            >
              Login
            </Button>
            <Flex
              justifyContent={"end"}
              flexDir={"column"}
              textDecor={"underline"}
            >
              <Link to="/forgot-password">Forgot/Password</Link>
            </Flex>
          </Flex>

          <Box paddingY={"10px"} fontSize="13.6px">
            <Flex>
              <Link to="/register">
                New Member, <u>Register M-Tix </u>
              </Link>
            </Flex>
            <Flex pt="10px">
              If you have receive OTP Activation code through SMS,
            </Flex>
            <u>Please activate your M-Tix here</u>
          </Box>
        </Flex>
      </Center>
    </>
  );
}
