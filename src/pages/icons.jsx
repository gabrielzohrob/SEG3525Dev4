import React, { useState, useContext } from "react";
import {Link} from 'react-router-dom'
import { useLocation } from "react-router-dom";
import "./icons.css";
import { CartContext } from "../CartContext.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

const iconsData = [
  { id: 1, title: "Icon of Christ Pantocrator", price: 30, subcategory: "Christ", image: "/icons/pantocrator.jpg", link: "pantocrator" },
  { id: 2, title: "Theotokos of Vladimir", price: 28, subcategory: "Theotokos", image: "/icons/theotokosofvladimir.jpg", link: "theotokosvladimir" },
  { id: 3, title: "St. George the Trophy-Bearer", price: 25, subcategory: "Saints", image: "/icons/georgethetrophybearer.jpg", link: "georgethetrophybearer" },
  { id: 4, title: "Holy Trinity (Rublev)", price: 32, subcategory: "Feasts", image: "/icons/holytrinityrublev.jpg", link: "holytrinityrublev" },
  { id: 5, title: "St. Nicholas the Wonderworker", price: 26, subcategory: "Saints", image: "/icons/stnicholasthewonderworker.jpg", link: "stnicholasthewonderworker" },
  { id: 6, title: "Theotokos of Kazan", price: 28, subcategory: "Theotokos", image: "/icons/theotokosofkazan.jpg", link: "theotokoskazan" },
  { id: 7, title: "Resurrection of Christ (Anastasis)", price: 35, subcategory: "Feasts", image: "/icons/iconofresurrection.jpg", link: "iconofresurrection" },
  { id: 8, title: "Icon of the Nativity", price: 33, subcategory: "Feasts", image: "/icons/iconofnativity.jpg", link: "iconofnativity" },
  { id: 9, title: "St. Seraphim of Sarov", price: 27, subcategory: "Saints", image: "/icons/seraphimofsarov.jpg", link: "seraphimofsarov" },
  { id: 10, title: "St. Paisios the Athonite", price: 29, subcategory: "Saints", image: "/icons/paisios.jpg", link: "paisios" },
  { id: 11, title: "St. Moses the Black", price: 27, subcategory: "Saints", image: "/icons/mosestheblack.jpg", link: "mosestheblack" },
  { id: 12, title: "Transfiguration of Christ", price: 34, subcategory: "Feasts", image: "/icons/iconoftransfiguration.jpg", link: "iconoftransfiguration" },
  { id: 13, title: "Theotokos Joy of All Who Sorrow", price: 28, subcategory: "Theotokos", image: "/icons/joyofallsorrow.jpg", link: "joyofallsorrow" },
  { id: 14, title: "Icon of the Crucifixion", price: 33, subcategory: "Feasts", image: "/icons/iconofcrucifixion.jpg", link: "iconofcrucifixion" },
  { id: 15, title: "Archangel Michael", price: 26, subcategory: "Saints", image: "/icons/archangelmichael.jpg", link: "archangelmichael" }
];

function Icons() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("subcategory") || searchParams.get("filter");

  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    iconsData.reduce((acc, icon) => ({ ...acc, [icon.id]: 1 }), {})
  );
  const [showMessage, setShowMessage] = useState(false);

  const handleQuantityChange = (id, value) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed > 0) {
      setQuantities((prev) => ({ ...prev, [id]: parsed }));
    }
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, quantity });

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const filteredIcons = filter
    ? iconsData.filter((item) => item.subcategory === filter)
    : iconsData;

  return (
    <div className="product-page">
      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            backgroundColor: "#0c1f1a",
            color: "#f7eddc",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          ✅ Added to cart!
        </div>
      )}

      <h1 className="page-title">Orthodox Icons</h1>
      <div className="product-grid">
        {filteredIcons.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h2 className="product-title">{item.title}</h2>
            <p className="product-price">${item.price.toFixed(2)}</p>
            <p className="product-description">{item.description}</p>
            <div className="product-actions">
              <Link
                to={`/product/${item.link}`}
                className="details-button"
              >
                View Details
              </Link>
              <button
                className="fab-cart-button"
                style={{ backgroundColor: 'transparent', border: 'none' }}
                onClick={() => handleAddToCart(item)}
                title="Add to Cart"
              >
                <FontAwesomeIcon className="bag-image" icon={faBagShopping} size="lg" />
              </button>
              <input
                type="number"
                min="1"
                className="quantity-selector"
                value={quantities[item.id]}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Icons;
