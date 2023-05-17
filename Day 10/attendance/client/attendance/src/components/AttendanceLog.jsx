import { Box, Center, Flex, Input } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import Footer from './Footer';

export default function Attendance() {
 return (
  <Flex h="100vh" alignItems={'center'} flexDir={'column'}>
   <Center
    color={'white'}
    bgColor={'#BF2935'}
    // h="40px"
    padding={'20px'}
    fontWeight={'500'}
    w="100%"
    maxW="500px"
   >
    Attendance Log
   </Center>

   <Flex
    h="100%"
    flexDirection={'column'}
    w="100%"
    maxW="500px"
    padding={'10px'}
   >
    <Input
     width="100%"
     type="month"
     defaultValue={'2023-05'}
     fontWeight={'500'}
    ></Input>

    <Center
     justifyContent={'space-between'}
     borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}
     padding={'20px'}
    >
     <Box fontWeight={'bold'}>24 Jan</Box>
     <Box fontWeight={500}>07:45</Box>
     <Box fontWeight={500}>17:01</Box>
     <AddIcon fontSize={'8px'} />
    </Center>

    <Center
     justifyContent={'space-between'}
     borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}
     padding={'20px'}
    >
     <Box fontWeight={'bold'}>24 Jan</Box>
     <Box fontWeight={500}>07:45</Box>
     <Box fontWeight={500}>17:01</Box>
     <AddIcon fontSize={'8px'} />
    </Center>

    <Center
     justifyContent={'space-between'}
     borderBottom={'1px solid rgba(0, 0, 0, 0.1)'}
     padding={'20px'}
    >
     <Box fontWeight={'bold'}>24 Jan</Box>
     <Box fontWeight={500}>07:45</Box>
     <Box fontWeight={500}>17:01</Box>
     <AddIcon fontSize={'8px'} />
    </Center>
   </Flex>
   <Footer />
  </Flex>
 );
}

// tanggal,user sebagai where untuk cek di table database
// create
// update
// att = db.Attendance.findOne({
//     where : {
//         create = req.date ,
//         user = req.user
//     }
// })
// att ?
// db.Attendance.update({
//     where :
// })
// :
// db.Attendance.create

// id,in ,out, userid, createdAt,updatedAt
//  createdAt = tgl clockin
//  in = time
