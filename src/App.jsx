import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Catalog from "./pages/Catalog.jsx"
import Header from "./components/Header.jsx";
import TelegramButton from "./components/TelegramButton.jsx";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </main>
      <TelegramButton />
    </BrowserRouter>
  );
}
