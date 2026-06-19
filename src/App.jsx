import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import InnGenerator from "./pages/InnGenerator.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tavern-tales" element={<InnGenerator />} />
      </Routes>
    </BrowserRouter>
  );
}
