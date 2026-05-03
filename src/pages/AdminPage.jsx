import React, { useState, useEffect } from "react";
import { db } from "../firebase"; 
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  query,
  orderBy
} from "firebase/firestore";

export default function AdminPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visitCount, setVisitCount] = useState(0);

  // --- ТВОИ ДАННЫЕ ДОСТУПА ---
  const ADMIN_LOGIN = "Amirbek_Zohidov_-_712__045"; 
  const ADMIN_PIN = "Amirbek_-_712"; 
  // --------------------------

  const handleLogin = (e) => {
    e.preventDefault();
    if (login === ADMIN_LOGIN && password === ADMIN_PIN) {
      setIsLoggedIn(true);
    } else {
      alert("Ошибка! Проверьте логин или пин-код.");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;

    const q = query(collection(db, "works"), orderBy("createdAt", "desc"));
    const unsubPhotos = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubVisits = onSnapshot(doc(db, "stats", "visits"), (docSnap) => {
      if (docSnap.exists()) {
        setVisitCount(docSnap.data().count);
      }
    });

    return () => {
      unsubPhotos();
      unsubVisits();
    };
  }, [isLoggedIn]);

  const uploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload?key=8ecf17d9be891c48cd8f27a4173edb11", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        await addDoc(collection(db, "works"), {
          url: data.data.url,
          createdAt: serverTimestamp(),
        });
        alert("Готово! Фото добавлено в каталог.");
      }
    } catch (error) {
      alert("Ошибка при загрузке фото.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const deletePhoto = async (id) => {
    if (window.confirm("Удалить эту работу?")) {
      await deleteDoc(doc(db, "works", id));
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#1a1a1a", color: "white" }}>
        <form onSubmit={handleLogin} style={{ background: "#333", padding: "40px", borderRadius: "20px", textAlign: "center", width: "100%", maxWidth: "400px" }}>
          <h2 style={{ marginBottom: "25px" }}>Вход в Pretty Shtor Admin</h2>
          
          <input 
            type="text" 
            placeholder="Введите логин" 
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "none", width: "100%", marginBottom: "15px", background: "#444", color: "white" }}
          />

          <input 
            type="password" 
            placeholder="Введите Pin" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "12px", borderRadius: "8px", border: "none", width: "100%", marginBottom: "20px", background: "#444", color: "white" }}
          />

          <button type="submit" style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "none", background: "#c8a97e", color: "white", fontWeight: "bold", cursor: "pointer" }}>
            Войти в панель
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container" style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", color: "white" }}>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1>Панель управления</h1><div style={{ background: "#333", padding: "8px 15px", borderRadius: "20px", border: "1px solid #c8a97e" }}>
          <span style={{ fontSize: "14px", color: "#ccc" }}>Визиты: </span>
          <strong style={{ fontSize: "18px", color: "#c8a97e" }}>{visitCount}</strong>
        </div>
      </div>

      <div className="upload-card" style={{ background: "#222", padding: "20px", borderRadius: "12px", marginBottom: "30px", border: "1px solid #333" }}>
        <h3 style={{ marginBottom: "10px" }}>Добавить новую работу</h3>
        <input type="file" onChange={uploadPhoto} disabled={loading} />
        {loading && <p style={{ color: "#c8a97e", marginTop: "10px" }}>⏳ Загружаем...</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "15px" }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ position: "relative", borderRadius: "10px", overflow: "hidden" }}>
            <img src={photo.url} alt="work" style={{ width: "100%", height: "140px", objectFit: "cover" }} />
            <button 
              onClick={() => deletePhoto(photo.id)}
              style={{ position: "absolute", top: "5px", right: "5px", background: "rgba(255,0,0,0.8)", color: "white", border: "none", borderRadius: "5px", padding: "4px 8px", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setIsLoggedIn(false)} style={{ marginTop: "50px", background: "none", color: "#777", border: "none", cursor: "pointer", textDecoration: "underline" }}>
        Выйти
      </button>
    </div>
  );
}


