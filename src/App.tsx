import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LocationDetailPage from './pages/LocationDetailPage';

/*
  / -> index page -> HomePage
  /hotel-detail -> LocationDetailPage
*/

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotel-detail/:hotelId" element={<LocationDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
