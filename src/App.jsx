import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CityPage from './pages/CityPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cities/:slug" element={<CityPage />} />
      </Routes>
    </BrowserRouter>
  );
}
