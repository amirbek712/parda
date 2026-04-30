const works = [
  "https://images.unsplash.com/photo-1616628182504-3c3c4f8f4c5c",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1582582494700-0a0b33f0a4b5",
];

export default function Works() {
  return (
    <section className="container">
      <h2>Наши работы</h2>
      <div className="grid">
        {works.map((img, i) => (
          <img key={i} src={img} alt="work" className="img" />
        ))}
      </div>
    </section>
  );
}