const catalogItems = [
  { title: "Тюль", img: "https://decoestet.md/wp-content/uploads/Tiuli-vuali-belaya1.jpeg" },
  { title: "Портьеры", img: "https://ir.ozone.ru/s3/multimedia-2/c1000/6191484506.jpg" },
  { title: "Жалюзи", img: "https://www.shtoranadom.ru/media/catalog/product/cache/1/image/85e4522595efc69f496374d01ef2bf13/d/e/delfa_plisse_blackout_37201_grey_okno2.jpg" },
  { title: "Блэкаут", img: "https://inthomestore.com/cdn/shop/files/5A59AD29-C0AD-42C5-9554-1013C844EA71.png?v=1747741358&width=1445" },
];

export default function Catalog() {
  return (
    <div className="container">
      <h1>Каталог штор</h1>
      <div className="grid">
        {catalogItems.map((item, i) => (
          <div key={i} className="card">
            <img 
              src={item.img} 
              alt={item.title} 
              className="img" 
              style={{ width: '100%', height: '300px', objectFit: 'cover' } } 
              
            />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
