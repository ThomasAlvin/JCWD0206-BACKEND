import Profile from '../components/Profile';
import CityPage from '../pages/CityPage';
import EditProfilePage from '../pages/EditProfile';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MovieDetailPage from '../pages/MovieDetailPage';
import RegisterPage from '../pages/RegisterPage';
import SeatPage from '../pages/SeatPage';
import TheaterMoviePage from '../pages/TheaterPage';
import TransactionPage from '../pages/TransactionPage';
import UpComingPage from '../pages/UpComingPage';
import ProtectedPage from './ProtectedPage';
import { Route } from 'react-router-dom';

const routes = [
 <Route
  path="login"
  key={'loginpage'}
  element={
   <ProtectedPage guestOnly={true}>
    <LoginPage />{' '}
   </ProtectedPage>
  }
 />,
 <Route
  path="register"
  key={'registerpage'}
  element={
   <ProtectedPage guestOnly={true}>
    <RegisterPage />{' '}
   </ProtectedPage>
  }
 />,
 <Route
  path="/profile/edit"
  key={'editprofile'}
  element={
   <ProtectedPage guestOnly={true}>
    <EditProfilePage />{' '}
   </ProtectedPage>
  }
 />,
 <Route
  path="/movies/:title"
  key={'moviedetail'}
  element={
   <ProtectedPage guestOnly={true}>
    <MovieDetailPage />
   </ProtectedPage>
  }
 />,
 <Route
  path="/movies/:id/theaters/:theater/seat"
  key={'seat'}
  element={
   <ProtectedPage guestOnly={true}>
    <SeatPage />
   </ProtectedPage>
  }
 />,
 <Route
  path="/Transactions"
  key={'transaction'}
  element={
   <ProtectedPage needLogin={true}>
    <TransactionPage />
   </ProtectedPage>
  }
 />,

 <Route
  path="/movies/:id/theaters/:theater"
  key={'movie-theater'}
  element={
   <ProtectedPage guestOnly={true}>
    <TheaterMoviePage />
   </ProtectedPage>
  }
 />,
 <Route
  path="profile"
  key={'profilepage'}
  element={
   <ProtectedPage needLogin={true}>
    <Profile />{' '}
   </ProtectedPage>
  }
 />,
 <Route
  path="/home"
  key={'home'}
  element={
   <ProtectedPage needLogin={true}>
    <HomePage />
   </ProtectedPage>
  }
 />,
 <Route
  path="/list-city"
  key={'city'}
  element={
   <ProtectedPage needLogin={true}>
    <CityPage />
   </ProtectedPage>
  }
 />,
 <Route
  path="/upcoming"
  key={'upcoming'}
  element={
   <ProtectedPage needLogin={true}>
    <UpComingPage />
   </ProtectedPage>
  }
 />
];

export default routes;
