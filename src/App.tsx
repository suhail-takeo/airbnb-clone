import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookingsPage from './pages/BookingsPage';
import HomePage from './pages/HomePage';
import HotelsPage from './pages/HotelsPage';
import LocationDetailPage from './pages/LocationDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

/*
  / -> index page -> HomePage
  /hotel-detail -> LocationDetailPage
*/

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel-detail/:hotelId" element={<LocationDetailPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
