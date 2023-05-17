import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AttendanceLog from './components/AttendanceLog';
import Login from './components/Login';
import Register from './components/Register';
function App() {
 return (
  // <Box w="100vw" h="100vh" bgColor={'blue'}>
  //  asda
  // </Box>

  <Routes>
   <Route path="/" key="dashboard" element={<Dashboard />}></Route>
   <Route
    path="/attendance-log"
    key="attendance-log"
    element={<AttendanceLog />}
   ></Route>

   <Route path="/login" key="attendance-log" element={<Login />}></Route>
   <Route path="/register" key="attendance-log" element={<Register />}></Route>

   {/* <Route></Route>
     <Route></Route>
     <Route></Route> */}
  </Routes>
 );
}

export default App;
