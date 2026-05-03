import { useState, useEffect } from "react";

const defaultWorks = [
  "https://images.unsplash.com/photo-1616628182504-3c3c4f8f4c5c",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1582582494700-0a0b33f0a4b5",
];

export default function Works() {
  const [works, setWorks] = useState(defaultWorks);

  useEffect(() => {
    // Подгружаем фото, которые мы добавили из админ-панели
    const customWorks = JSON.parse(localStorage.getItem("customWorks")) || [];
    if (customWorks.length > 0) {
      setWorks([...customWorks, ...defaultWorks]);
    }
  }, []);

  return (
    <section className="container">
      <h2 className="fade-in">Наши работы</h2>
      <div className="grid">
        {works.map((img, i) => (
          <img key={i} src={img} alt="work" className="img fade-in-up" style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </section>
  );
}