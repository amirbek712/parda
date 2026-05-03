import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home.jsx"
import Catalog from "./pages/Catalog.jsx"
import AdminPage from "./pages/AdminPage.jsx" // Подключили админку
import Header from "./components/Header.jsx";
import TelegramButton from "./components/TelegramButton.jsx";
import "./App.css";

export default function App() {
  // Считаем просмотры при каждом заходе на сайт
  useEffect(() => {
    let views = parseInt(localStorage.getItem("siteViews") || "0");
    localStorage.setItem("siteViews", views + 1);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/admin" element={<AdminPage />} /> {/* Путь в админку */}
        </Routes>
      </main>
      <TelegramButton />
    </BrowserRouter>
  );
}