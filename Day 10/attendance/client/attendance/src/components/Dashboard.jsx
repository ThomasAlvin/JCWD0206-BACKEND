import {
  Box,
  Center,
  Flex,
  Button,
  Avatar,
  Image,
  Input,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Footer from "./Footer";
import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function Dashboard() {
  const nav = useNavigate();
  const inputFileRef = useRef(null);
  const dispatch = useDispatch();
  const [log, setLog] = useState({ clock_in: "", clock_out: "" });
  const userSelector = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };
  useEffect(() => {
    async function getTodayLog() {
      if (!userSelector.id) {
        return nav("/login");
      }
      await axios
        .get("http://localhost:2000/attendances/", {
          params: {
            date: moment().format("yyyy-MM-DD"),
            UserId: userSelector.id,
          },
        })
        .then((res) => setLog(res.data));
    }

    getTodayLog();
    console.log(userSelector);
  }, []);

  async function uploadAvatar() {
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    // formData.append("name", selectedFile);
    // formData.append("producer", selectedFile);
    // formData.append("director", selectedFile);
    // formData.append("writer", selectedFile);
    // formData.append("cast", selectedFile);
    // formData.append("distributor", selectedFile);
    // formData.append("website", selectedFile);
    // formData.append("synopsis", selectedFile);
    // formData.append("genre", selectedFile);
    // formData.append("rating", selectedFile);
    // formData.append("dimensions", selectedFile);
    // formData.append("img_url", selectedFile);
    console.log(formData);
    let user = "";
    await axios
      .post("http://localhost:2000/auth/image/v1/" + userSelector.id, formData)
      .then((res) => {
        console.log(res.data);
        user = res.data;
      });
    // const token = localStorage.getItem("token");
    // const user = await axios.get("http://localhost:2000/auth/v3", {
    //   params: {
    //     token,
    //   },
    // });
    console.log(user);
    if (user) {
      dispatch({
        type: "login",
        payload: user,
      });
      console.log("lol");
    }
  }

  async function InputClock(e) {
    const { id } = e.target;
    console.log(id);
    console.log(moment().format("HH:mm"));
    await axios
      .post("http://localhost:2000/attendances/v1", {
        UserId: userSelector.id,
        [id]: moment().format("HH:mm"),
      })
      .then((res) => {
        console.log(res.data);
        setLog(res.data);
      });
  }

  return (
    <>
      <Flex h="100vh" justifyContent={"center"}>
        <Flex alignItems={"center"} color={"white"} flexDir={"column"}>
          <Center padding={"20px"} w="100vw" bgColor={"#BF2935"} maxW="768px">
            <Center
              fontWeight={"500"}
              flexDir={"column"}
              h="300px"
              w="100%"
              maxW={"378px"}
            >
              <Box pt={"50px"}>Welcome, {userSelector.name}</Box>

              <Center padding={"10px"} flexDir={"column"}>
                <Box fontSize={"30px"} fontWeight={"500"}>
                  <Time />
                </Box>
                <Avatar paddingY={"5px"} src={userSelector.avatar_url}></Avatar>
                <Box>{moment().format("dddd, DD MMMM YYYY")}</Box>
                <Flex gap={"20px"}>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    id="file"
                    ref={inputFileRef}
                    onChange={handleFile}
                    display={"none"}
                  ></Input>
                  <Button
                    colorScheme="teal"
                    onClick={() => inputFileRef.current.click()}
                  >
                    {" "}
                    Change icon
                  </Button>
                  <Button colorScheme="teal" onClick={uploadAvatar}>
                    To Submit
                  </Button>
                </Flex>
              </Center>

              <Flex
                bgColor={"white"}
                h={"100%"}
                w="100%"
                borderRadius={"10px"}
                flexDir={"column"}
                alignItems={"center"}
                padding={"20px"}
                gap="10px"
              >
                <Box color={"#8A8A8A"}>
                  Schedule, {moment().format("dddd, DD MMMM YYYY")}
                </Box>
                <Box color={"black"} fontWeight={"bold"} fontSize={"30px"}>
                  08:00 - 17:00{" "}
                </Box>

                <Center
                  justifyContent={"space-between"}
                  w="100%"
                  h="100%"
                  gap="10px"
                >
                  <Button
                    w="100%"
                    maxW="180px"
                    h="50px"
                    bgColor="#035EBF"
                    onClick={InputClock}
                    id="clock_in"
                  >
                    Clock In
                  </Button>

                  <Button
                    w="100%"
                    maxW="180px"
                    h="50px"
                    bgColor="#035EBF"
                    onClick={InputClock}
                    id="clock_out"
                  >
                    Clock Out{" "}
                  </Button>
                </Center>
              </Flex>
            </Center>
          </Center>

          <Flex
            bgColor={"white"}
            color="black"
            w="100%"
            paddingX={"20px"}
            paddingTop={"20px"}
            flexDir={"column"}
            fontSize={"18px"}
            paddingBottom={"70px"}
            maxW="768px"
          >
            <Flex justifyContent={"space-between"} w="100%" fontWeight={"500"}>
              <Box>Attendance Log</Box>
              <Box color="#8A8A8A">View Log</Box>
            </Flex>

            {log.clock_in ? (
              <Flex justifyContent={"space-between"}>
                <Box padding="10px" fontWeight={"500"}>
                  <Box> {log.clock_in} </Box>
                  <Box color="#8A8A8A">
                    {moment(log.createdAt).format("DD MMMM")}
                  </Box>
                </Box>

                <Center color="#8A8A8A" fontWeight={"500"} fontSize={"18px"}>
                  Clock In
                </Center>
                <Center>
                  <ChevronRightIcon fontSize={"30px"} color="#8A8A8A" />
                </Center>
              </Flex>
            ) : null}

            {log.clock_out ? (
              <Flex justifyContent={"space-between"}>
                <Box padding="10px" fontWeight={"500"}>
                  <Box>{log.clock_out}</Box>
                  <Box color="#8A8A8A">
                    {moment(log.createdAt).format("DD MMMM")}
                  </Box>
                </Box>

                <Center color="#8A8A8A" fontWeight={"500"} fontSize={"18px"}>
                  Clock Out
                </Center>
                <Center>
                  <ChevronRightIcon fontSize={"30px"} color="#8A8A8A" />
                </Center>
              </Flex>
            ) : null}
          </Flex>
        </Flex>
      </Flex>

      <Footer />
    </>
  );
}

function Time() {
  const [time, setTime] = useState(moment().format("hh:mm"));

  async function updateTime() {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        resolve(setTime(moment().format("hh:mm:ss")));
      }, 1000);
    });
    return await promise;
  }

  useEffect(() => {
    updateTime();
  }, [time]);

  return <>{moment().format("HH mm")}</>;
}

// password asli = hello => abc123
// abc123 => hello

// salt = 3ab9
// => abc123456
// haexlelxo3ab9

// hello3ab9 => value yang lain 39e19b234hdskfhskdhsak

// bcrypt
