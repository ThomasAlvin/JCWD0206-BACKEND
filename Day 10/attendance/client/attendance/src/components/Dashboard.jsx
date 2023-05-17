import { Box, Center, Flex, Button } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Footer from './Footer';

export default function Dashboard() {
 return (
  <>
   <Flex h="100vh" justifyContent={'center'}>
    <Flex color={'white'} flexDir={'column'}>
     <Box padding={'30px'} w="100vw" maxW="500px" bgColor={'#BF2935'}>
      <Center fontWeight={'500'} flexDir={'column'} h="400px">
       <Box> Live Attendance</Box>
       <Center padding={'20px'} flexDir={'column'}>
        <Box fontSize={'40px'} fontWeight={'500'}>
         09 23
        </Box>
        <Box>Wed, 17 May 2023</Box>
       </Center>

       <Flex
        bgColor={'white'}
        h={'100%'}
        w="100%"
        borderRadius={'10px'}
        flexDir={'column'}
        alignItems={'center'}
        padding={'30px'}
        gap="10px"
       >
        <Box color={'#8A8A8A'}> Schedule, 17 May 2023</Box>
        <Box color={'black'} fontWeight={'bold'} fontSize={'40px'}>
         08:00 - 17:00{' '}
        </Box>

        <Center justifyContent={'space-between'} w="100%" h="100%" gap="10px">
         <Button w="100%" maxW="180px" h="50px" bgColor="#035EBF">
          Clock In
         </Button>

         <Button w="100%" maxW="180px" h="50px" bgColor="#035EBF">
          Clock Out{' '}
         </Button>
        </Center>
       </Flex>
      </Center>
     </Box>

     <Flex
      bgColor={'white'}
      color="black"
      w="100%"
      paddingX={'20px'}
      paddingTop={'20px'}
      flexDir={'column'}
      fontSize={'18px'}
      paddingBottom={'70px'}
     >
      <Flex justifyContent={'space-between'} w="100%" fontWeight={'500'}>
       <Box>Attendance Log</Box>
       <Box color="#8A8A8A">View Log</Box>
      </Flex>

      <Flex justifyContent={'space-between'}>
       <Box padding="10px" fontWeight={'500'}>
        <Box>07:30</Box>
        <Box color="#8A8A8A">17 May</Box>
       </Box>

       <Center color="#8A8A8A" fontWeight={'500'} fontSize={'18px'}>
        Clock In
       </Center>
       <Center>
        <ChevronRightIcon fontSize={'30px'} color="#8A8A8A" />
       </Center>
      </Flex>

      <Flex justifyContent={'space-between'}>
       <Box padding="10px" fontWeight={'500'}>
        <Box>17:30</Box>
        <Box color="#8A8A8A">17 May</Box>
       </Box>

       <Center color="#8A8A8A" fontWeight={'500'} fontSize={'18px'}>
        Clock Out
       </Center>
       <Center>
        <ChevronRightIcon fontSize={'30px'} color="#8A8A8A" />
       </Center>
      </Flex>
     </Flex>
    </Flex>
   </Flex>

   <Footer />
  </>
 );
}
