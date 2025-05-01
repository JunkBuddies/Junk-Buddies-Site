// File: src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';
import LoadSizePage from './pages/LoadSizePage';
import ItemizedPage from './pages/ItemizedPage';
import SchedulePage from './pages/SchedulePage';
import ConfirmationPage from './pages/ConfirmationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/load-size" element={<LoadSizePage />} />
        <Route path="/itemized" element={<ItemizedPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;// App.jsx - routing
