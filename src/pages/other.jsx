import React, { useState } from "react";
import "./other.css";

const otherItems = [
  {
    id: 1,
    title: "Prayer Rope (33 knots)",
    price: 12.0,
    description: "Traditional woolen prayer rope used for the Jesus Prayer.",
    image: "/public/others/33knot.jpg",
  },
  {
    id: 2,
    title: "Prayer Rope (100 knots)",
    price: 20.0,
    description: "Longer woolen prayer rope for extended prayer and meditation.",
    image: "/public/others/100knot.jpg",
  },
  {
    id: 3,
    title: "Incense - Byzantine Blend",
    price: 8.5,
    description: "High-quality incense with a rich, aromatic Byzantine fragrance.",
    image: "/public/others/incense.jpg",
  },
  {
    id: 4,
    title: "Charcoal Tablets (Box)",
    price: 6.0,
    description: "Quick-lighting charcoal for burning incense at home or church.",
    image: "/public/others/charcoal.jpg",
  },
  {
    id: 5,
    title: "Orthodox Wall Cross (Wooden)",
    price: 18.0,
    description: "Hand-carved wooden wall cross for prayer corners.",
    image: "/public/others/cross.jpg",
  },
];

function Other() {
  const [quantities, setQuantities] = useState(
    otherItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value) });
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id];
    alert(`Added ${quantity} x "${item.title}" to cart.`);
    // Add to cart logic here
  };

  return (
    <div className="product-page">
      <h1 className="page-title">Other Items</h1>
      <div className="product-grid">
        {otherItems.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h2 className="product-title">{item.title}</h2>
            <p className="product-price">${item.price.toFixed(2)}</p>
            <p className="product-description">{item.description}</p>
            <div className="product-actions">
              <input
                type="number"
                min="1"
                className="quantity-selector"
                value={quantities[item.id]}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
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

export default Other;
