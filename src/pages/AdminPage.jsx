import { useState, useEffect } from "react";
import { db } from "../firebase"; // Оставляем только db
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState("");
  const [pin, setPin] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const IMGBB_API_KEY = "8ecf17d9be891c48cd8f27a4173edb11"; // Твой ключ

  // Проверка логина
  const handleLogin = (e) => {
    e.preventDefault();
    if (login === "Amirbek_Zohidov_-_712__045" && pin === "Amirbek_-_712") {
      setIsLoggedIn(true);
      sessionStorage.setItem("isAdmin", "true");
    } else {
      alert("Неверные данные доступа!");
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("isAdmin") === "true") setIsLoggedIn(true);
    
    const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsubscribe();
  }, []);

  // ОБНОВЛЕННАЯ ФУНКЦИЯ ЗАГРУЗКИ ЧЕРЕЗ IMGBB
  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Отправляем на ImgBB
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const url = data.data.url;

        try {
          // Записываем ссылку в Firebase Firestore
          await addDoc(collection(db, "works"), { 
            url: url, 
            createdAt: serverTimestamp() 
          });
          
          setLoading(false);
          e.target.value = ""; 
          alert("Фото успешно опубликовано!");
        } catch (dbError) {
          throw new Error("Ошибка базы данных: Проверьте правила (Rules) в Firebase Console!");
        } 
      } else {
        throw new Error(data.error?.message || "Ошибка ImgBB");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert(error.message);
    }
  };

  const deletePhoto = async (photo) => {
    if(window.confirm("Удалить эту работу из базы данных?")) {
      try {
        await deleteDoc(doc(db, "works", photo.id));
      } catch (err) {
        console.log("Ошибка при удалении");
      }
    }
  };

  if (!isLoggedIn) return (
    <div className="admin-container">
      <form className="admin-form" onSubmit={handleLogin}>
        <h2>Панель управления</h2>
        <input type="text" placeholder="Логин" onChange={e => setLogin(e.target.value)} />
        <input type="password" placeholder="Пин-код" onChange={e => setPin(e.target.value)} />
        <button className="btn admin-btn">Войти</button>
      </form>
    </div>
  );

  return (
    <div className="admin-container fade-in">
      <div className="admin-dashboard">
        <h2>Здравствуйте, Амирбек!</h2>
        
        <div className="upload-card">
          <h3>Опубликовать новое фото (ImgBB)</h3>
          <input type="file" accept="image/*" onChange={uploadPhoto} disabled={loading} />
          {loading && <p>⏳ Загружаем фото...</p>}
        </div>

        <div className="admin-grid">
          {photos.map(p => (
            <div key={p.id} className="admin-photo-item">
              <img src={p.url} alt="work" />
              <button onClick={() => deletePhoto(p)} className="del-btn">Удалить 🗑</button>
            </div>
          ))}
        </div>
        
        <button onClick={() => {setIsLoggedIn(false); sessionStorage.clear();}} className="btn logout-btn">Выйти</button>
      </div>
    </div>
  );
}