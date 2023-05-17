import { Box, Center, Flex, Input, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
 const [user, setUser] = useState({
  email: '',
  password: ''
 });

 const nav = useNavigate();

 const inptHandler = (e) => {
  const { id, value } = e.target;
  const tempUser = { ...user };
  tempUser[id] = value;
  setUser(tempUser);
  console.log(tempUser);
 };

 const login = async () => {
  const result = await axios.post('http://localhost:2000/auth/v1', user);
  console.log(result.data);
  alert(result.data.message);
  if (result.data.value) {
   nav('/');
  }
  return;
 };

 return (
  <Box w="100vw" h="100vh" bgColor={'#F2F4F7'}>
   <Center w="100%" h="100%">
    <Flex
     bgColor={'white'}
     w="300px"
     flexDir={'column'}
     padding="20px"
     gap="10px"
     borderRadius={'10px'}
    >
     <Box fontWeight={'500'} fontSize={'30px'} fontFamily={'sans-serif'}>
      Absensi
     </Box>
     <Box>
      <Box fontWeight={'500'} paddingBottom={'10px'}>
       Email
      </Box>
      <Input id="email" onChange={inptHandler}></Input>
     </Box>
     <Box>
      <Box fontWeight={'500'} paddingBottom={'10px'}>
       {' '}
       Password
      </Box>
      <Input type="password" id="password" onChange={inptHandler}></Input>
     </Box>
     {/* <Link to="/"> */}
     <Button
      marginTop={'25px'}
      bgColor="#035EBF"
      color={'white'}
      w="100%"
      onClick={login}
     >
      Sign In
     </Button>
     {/* </Link> */}

     <Link to="/register">
      <Center>don't have an account? register</Center>
     </Link>
    </Flex>
   </Center>
  </Box>
 );
}
