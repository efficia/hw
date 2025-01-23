import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Contact from './components/Contact';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Navigate to="/contact" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;