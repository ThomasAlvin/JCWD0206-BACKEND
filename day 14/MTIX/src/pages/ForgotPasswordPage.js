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
import { FaLock, FaMailBulk, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { api } from "../api/api";
export default function ForgotPasswordPage() {
  async function submit() {
    await api
      .post(
        "http://localhost:4000/auth/generate-token/email?email=" + email.email
      )
      .then(() => alert("check your email"));
  }
  const [email, setEmail] = useState({});
  function inputHandler(input) {
    const { value, id } = input.target;
    const tempobject = { ...email };
    tempobject[id] = value;
    setEmail(tempobject);
    console.log(tempobject);
  }
  return (
    <>
      <Center flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Center fontWeight={"bold"} padding="10px">
          Forgot Password
        </Center>
        <Stack spacing={4} w="100vw" maxW="420px" padding="15px">
          <InputGroup h="34px">
            <InputLeftAddon
              bgColor="#eee"
              padding={"6px 12px"}
              color="#555"
              border="1px solid #ccc"
            >
              <FaMailBulk fontSize="16px" />
            </InputLeftAddon>
            <Input
              onChange={inputHandler}
              padding={"6px 12px"}
              type="email"
              id="email"
              placeholder="Email"
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
              onClick={submit}
            >
              Submit
            </Button>
          </Center>
        </Flex>
      </Center>
    </>
  );
}
