import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h2>Pretty Shtor</h2>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/catalog">Каталог</Link>
      </nav>
    </header>
  );
}