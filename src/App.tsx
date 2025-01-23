import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Contact from "./components/Contact";

function App() {
  return (
    <BrowserRouter basename="/hw">
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Navigate to="/contact" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
