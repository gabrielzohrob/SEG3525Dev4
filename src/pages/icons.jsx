import React, { useState } from "react";
import "./icons.css";

const iconsData = [
  {
    id: 1,
    title: "Icon of Christ Pantocrator",
    price: 30,
    image: "/public/icons/pantocrator.jpg",
  },
  {
    id: 2,
    title: "Theotokos of Vladimir",
    price: 28,
    image: "/public/icons/theotokosofvladimir.jpg",
  },
  {
    id: 3,
    title: "St. George the Trophy-Bearer",
    price: 25,
    image: "/public/icons/georgethetrophybearer.jpg",
  },
  {
    id: 4,
    title: "Holy Trinity (Rublev)",
    price: 32,
    image: "/public/icons/holytrinityrublev.jpg",
  },
  {
    id: 5,
    title: "St. Nicholas the Wonderworker",
    price: 26,
    image: "/public/icons/stnicholasthewonderworker.jpg",
  },
  {
    id: 6,
    title: "Theotokos of Kazan",
    price: 28,
    image: "/public/icons/theotokosofkazan.jpg",
  },
  {
    id: 7,
    title: "Resurrection of Christ (Anastasis)",
    price: 35,
    image: "/public/icons/iconofresurrection.jpg",
  },
  {
    id: 8,
    title: "Icon of the Nativity",
    price: 33,
    image: "/public/icons/iconofnativity.jpg",
  },
  {
    id: 9,
    title: "St. Seraphim of Sarov",
    price: 27,
    image: "/public/icons/seraphimofsarov.jpg",
  },
  {
    id: 10,
    title: "St. Paisios the Athonite",
    price: 29,
    image: "public/icons/paisios.jpg",
  },
  {
    id: 11,
    title: "St. Moses the Black",
    price: 27,
    image: "/public/icons/mosestheblack.jpg",
  },
  {
    id: 12,
    title: "Transfiguration of Christ",
    price: 34,
    image: "/public/icons/iconoftransfiguration.jpg",
  },
  {
    id: 13,
    title: "Theotokos Joy of All Who Sorrow",
    price: 28,
    image: "/public/icons/joyofallsorrow.jpg",
  },
  {
    id: 14,
    title: "Icon of the Crucifixion",
    price: 33,
    image: "/public/icons/iconofcrucifixion.jpg",
  },
  {
    id: 15,
    title: "Archangel Michael",
    price: 26,
    image: "/public/icons/archangelmichael.jpg",
  },
];

function Icons() {
  const [quantities, setQuantities] = useState(
    iconsData.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value) });
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id];
    alert(`Added ${quantity} x "${item.title}" to cart.`);
    // Add cart logic here
  };

  return (
    <div className="product-page">
      <h1 className="page-title">Orthodox Icons</h1>
      <div className="product-grid">
        {iconsData.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h2 className="product-title">{item.title}</h2>
            <p className="product-price">${item.price}</p>
            <div className="product-actions">
              <input
                type="number"
                min="1"
                value={quantities[item.id]}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                className="quantity-selector"
              />
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Icons;
