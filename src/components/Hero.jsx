import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <h1>Шторы на заказ</h1>
        <p>Тюль, портьеры, жалюзи</p>
        <Link to="/catalog" className="btn">Смотреть каталог</Link>
      </div>
    </section>
  );
}