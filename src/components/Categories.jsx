const data = ["Тюль", "Портьеры", "Жалюзи", "Блэкаут"];

export default function Categories() {
  return (
    <section className="container">
      <h2>Категории</h2>
      
      <div className="grid">
        {data.map((item, i) => (
          <div key={i} className="card">{item}</div>
        ))}
      </div>
    </section>
  );
}