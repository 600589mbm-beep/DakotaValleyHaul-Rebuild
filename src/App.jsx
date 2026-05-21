import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CityPage from './pages/CityPage.jsx';
import ServicePage from './pages/ServicePage.jsx';

// On github.io subpath preview, BrowserRouter needs to know the repo prefix.
// At custom domain root, basename stays empty.
const basename =
  typeof window !== 'undefined' && window.location.hostname.endsWith('.github.io')
    ? '/DakotaValleyHaul-Rebuild'
    : '';

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cities/:slug" element={<CityPage />} />
        <Route path="/services/:slug" element={<ServicePage />} />
      </Routes>
    </BrowserRouter>
  );
}
