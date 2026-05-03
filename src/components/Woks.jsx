import { useState, useEffect } from "react";

const defaultWorks = [
  "https://i.pinimg.com/736x/c8/e7/ef/c8e7ef3ab6e695e59184ae59387d39cc.jpg",
  "https://i.pinimg.com/736x/dd/4a/df/dd4adfcee67a4236629f514edffef56b.jpg",
  "https://i.pinimg.com/1200x/21/87/f6/2187f65e2b1b763f9a39ede188a4490a.jpg",
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