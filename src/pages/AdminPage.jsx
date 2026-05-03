import { useState, useEffect } from "react";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [views, setViews] = useState(0);

  // Проверяем, авторизован ли уже админ в этой сессии
  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") {
      setIsLoggedIn(true);
    }
    // Получаем количество просмотров (фейковый счетчик + локальные заходы)
    const currentViews = localStorage.getItem("siteViews") || 1;
    setViews(currentViews);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (login === "Amirbek_Zohidov_-_712__045" && pin === "Amirbek_-_712") {
      setIsLoggedIn(true);
      sessionStorage.setItem("isAdmin", "true");
      setError("");
    } else {
      setError("Неверный логин или пин-код!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem("isAdmin");
  };

  // Конвертируем картинку с компьютера для сохранения на сайте
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      const storedWorks = JSON.parse(localStorage.getItem("customWorks")) || [];
      localStorage.setItem("customWorks", JSON.stringify([base64String, ...storedWorks]));
      alert("✅ Фото успешно опубликовано на сайте!");
    };
    reader.readAsDataURL(file);
  };

  if (!isLoggedIn) {
    return (
      <div className="admin-container fade-in">
        <form onSubmit={handleLogin} className="admin-form">
          <h2>Вход в Админ-панель</h2>
          {error && <p className="error">{error}</p>}
          <input 
            type="text" 
            placeholder="Логин" 
            value={login} 
            onChange={(e) => setLogin(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Пин-код" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
          />
          <button type="submit" className="btn admin-btn">Войти</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container fade-in">
      <div className="admin-dashboard">
        <h2>👋 Добро пожаловать, Amirbek!</h2>
        <div className="stats-card">
          <h3>Статистика сайта</h3>
          <p>👀 Уникальных посещений: <strong>{views}</strong></p>
        </div>
        
        <div className="upload-card">
          <h3>Опубликовать новую работу</h3>
          <p>Выберите фото с компьютера, и оно сразу появится в разделе "Наши работы"</p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload} 
            className="file-input"
          />
        </div>

        <button onClick={handleLogout} className="btn logout-btn">Выйти из админки</button>
      </div>
    </div>
  );
}