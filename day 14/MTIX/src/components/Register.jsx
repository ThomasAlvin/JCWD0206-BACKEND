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
  Textarea,
  Icon,
} from "@chakra-ui/react";
import {
  FaAddressBook,
  FaAddressCard,
  FaFaucet,
  FaKey,
  FaLock,
  FaMailBulk,
  FaMailchimp,
  FaPersonBooth,
  FaPhone,
  FaVoicemail,
} from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Formik, useFormik } from "formik";
import { api } from "../api/api";

export default function Register() {
  YupPassword(Yup);
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      phonenum: "",
      address: "",
      name: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("You need to enter your email")
        .email("This is not a valid email"),
      password: Yup.number("needs to be a 6 digit number")
        .required("You need to create your Password")
        .min(100000, "Password needs to be a 6 digit number"),
      phonenum: Yup.string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        )
        .required("You need to enter your phone number"),
      address: Yup.string().required("You need to enter your address"),
      name: Yup.string().required("Please enter your username"),
    }),
    onSubmit: async () => {
      const { email, password, phonenum, address, name } = formik.values;
      const account = { email, password, phonenum, address, name };

      const user = { ...formik.values };

      await api.post("http://localhost:4000/auth", account).then(() => {
        alert("account created");
        nav("/login");
      });
    },
  });
  function inputHandler(event) {
    const { value, id } = event.target;
    console.log(value);
    console.log(formik.values);
    formik.setFieldValue(id, value);
  }
  return (
    <>
      <Flex flexDir={"column"} w="100vw" maxW="420px" paddingTop="20px">
        <Box fontWeight={"bold"} padding="10px 20px">
          M-Tix Registeration
        </Box>

        <Box padding="10px 20px">
          <Box
            padding="20px"
            fontSize="13px"
            color="#8a6d3b"
            bgColor="#fcf8e3"
            border="1px solid #faebcc"
            borderRadius={"10px"}
          >
            <ul style={{ padding: "10px", margin: "0px" }}>
              <li>
                Fill in your profile data as per your ID (Lengkapi data sesuai
                dengan KTP/SIM/PASPOR).
              </li>{" "}
              <li>
                Fill in your active mobile number and email ID (Masukkan nomor
                dan email yang benar).
              </li>{" "}
              <li>
                In case of transaction discrepancy, we can only validate your
                account with your ID (Dalam hal terjadinya perbedaan transaksi,
                kami hanya dapat melakukan verifikasi sesuai dengan data
                KTP/SIM/PASPOR).
              </li>{" "}
            </ul>
          </Box>
        </Box>

        <Stack
          spacing={3}
          w="100vw"
          maxW="420px"
          padding="15px"
          fontSize={"14px"}
        >
          <Box>
            Handphone:
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
                onChange={inputHandler}
                padding={"6px 12px"}
                type="tel"
                id="phonenum"
                placeholder="Handphone number"
                border="1px solid #ccc"
                w="100vw"
                maxW="355px"
              />
            </InputGroup>
            <Flex pt={"10px"} color={"red"}>
              {formik.errors.phonenum}
            </Flex>
          </Box>
          <Box>
            Full Name as per your ID:
            <InputGroup h="34px">
              <InputLeftAddon
                bgColor="#eee"
                padding={"6px 12px"}
                color="#555"
                border="1px solid #ccc"
              >
                <FaPersonBooth fontSize="16px" />
              </InputLeftAddon>
              <Input
                onChange={inputHandler}
                id="name"
                padding={"6px 12px"}
                placeholder="Your name"
                border="1px solid #ccc"
                w="100vw"
                maxW="355px"
              />
            </InputGroup>
            <Flex pt={"10px"} color={"red"}>
              {formik.errors.name}
            </Flex>
          </Box>
          <Box>
            Email:
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
                id="email"
                padding={"6px 12px"}
                placeholder="Your valid email"
                border="1px solid #ccc"
                w="100vw"
                maxW="355px"
              />
            </InputGroup>
            <Flex pt={"10px"} color={"red"}>
              {formik.errors.email}
            </Flex>
          </Box>

          <Box>
            Address:
            <InputGroup>
              <InputLeftAddon
                bgColor="#eee"
                padding={"6px 12px"}
                color="#555"
                border="1px solid #ccc"
                h="80px"
              >
                <FaAddressCard fontSize="16px" />
              </InputLeftAddon>
              <Textarea
                onChange={inputHandler}
                padding={"6px 12px"}
                id="address"
                borderLeftRadius={"0"}
                placeholder="Correspondence address based on ID/KTP"
                border="1px solid #ccc"
                w="100vw"
                resize={"none"}
                maxW="355px"
              />
            </InputGroup>
            <Flex pt={"10px"} color={"red"}>
              {formik.errors.address}
            </Flex>
          </Box>

          <Box>
            PIN/Password:
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
                onChange={(e) => {
                  if (!isNaN(e.target.value)) {
                    // e.target.value = e.target.value.slice();
                    inputHandler(e);
                  } else {
                    e.target.value = formik.values.password;
                  }
                }}
                id="password"
                padding={"6px 12px"}
                type="password"
                maxLength={"6"}
                placeholder="6 digits Number"
                border="1px solid #ccc"
                w="100vw"
                maxW="355px"
              />
            </InputGroup>
            <Flex pt={"10px"} color={"red"}>
              {formik.errors.password}
            </Flex>
          </Box>
        </Stack>

        <Flex
          fontSize={"14px"}
          justifyContent={"space-between"}
          w="100%"
          padding="10px"
          paddingY="20px"
          flexDir={"column"}
        >
          <Button
            fontSize={"14px"}
            color="white"
            bgColor={"#006666"}
            border="1px solid #005350"
            w="130px"
            onClick={formik.handleSubmit}
          >
            Register Account
          </Button>

          <Box paddingY={"20px"} fontSize="13.6px">
            <Flex>
              <Link>
                By clicking Register Account, I confirm I have agreed to
                <Link>
                  {" "}
                  <u>Terms & Condition</u>
                </Link>{" "}
                and{" "}
                <Link>
                  <u>Privacy Policy</u>
                </Link>{" "}
                of Cinema XXI.
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
