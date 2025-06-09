// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import LoadSizePage from './pages/LoadSizePage';
import ItemizedPage from './pages/ItemizedPage';
import SchedulePage from './pages/SchedulePage';
import ConfirmationPage from './pages/ConfirmationPage';
import BlogPage from './pages/BlogPage';
import HowMuchDoesJunkRemovalCost from './pages/blog/HowMuchDoesJunkRemovalCost';
import SaveMoneyOnJunkRemoval from './pages/blog/SaveMoneyOnJunkRemoval';
import FaqPage from './pages/FaqPage';
import ServiceAreasPage from './pages/ServiceAreasPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/selection" element={<SelectionPage />} />
          <Route path="/load-size" element={<LoadSizePage />} />
          <Route path="/itemized" element={<ItemizedPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />

          {/* ✅ Blog Routes must go here inside the component */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/how-much-does-junk-removal-cost" element={<HowMuchDoesJunkRemovalCost />} />
          <Route path="/blog/save-money-on-junk-removal" element={<SaveMoneyOnJunkRemoval />} />
          <Route path="/faq" element={<FaqPage />} />
         <Route path="/service-areas" element={<ServiceAreasPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
