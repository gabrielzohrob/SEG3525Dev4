import React, { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./card.css";
import { Row, Col } from 'react-bootstrap';
import { CartContext } from "../CartContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

// Static image imports
import prayerRope33Img from '/others/33knot.jpg';
import prayerRope100Img from '/others/100knot.jpg';
import incenseImg from '/others/incense.jpg';
import charcoalImg from '/others/charcoal.jpg';
import crossImg from '/others/cross.jpg';
import candlesImg from '/others/candles.jpg';

// Items with static image paths
const otherItems = [
  {
    id: 1,
    title: "Prayer Rope (33 knots)",
    price: 12.0,
    description: "Traditional woolen prayer rope used for the Jesus Prayer.",
    image: prayerRope33Img,
    subcategory: "Prayer Rope",
    link: "prayerrope33"
  },
  {
    id: 2,
    title: "Prayer Rope (100 knots)",
    price: 20.0,
    description: "Longer woolen prayer rope for extended prayer and meditation.",
    image: prayerRope100Img,
    subcategory: "Prayer Rope",
    link: "prayerrope100"
  },
  {
    id: 3,
    title: "Incense - Byzantine Blend",
    price: 8.5,
    description: "High-quality incense with a rich, aromatic Byzantine fragrance.",
    image: incenseImg,
    subcategory: "Incense",
    link: "incensebyzantine"
  },
  {
    id: 4,
    title: "Charcoal Tablets (Box)",
    price: 6.0,
    description: "Quick-lighting charcoal for burning incense at home or church.",
    image: charcoalImg,
    subcategory: "Incense",
    link: "charcoaltablets"
  },
  {
    id: 5,
    title: "Orthodox Wall Cross (Wooden)",
    price: 18.0,
    description: "Hand-carved wooden wall cross for prayer corners.",
    image: crossImg,
    subcategory: "Cross",
    link: "woodencross"
  },
  {
    id: 6,
    title: "Pure Beeswax Candles",
    price: 30.0,
    description: "Candles made out of Pure Beeswax",
    image: candlesImg,
    subcategory: "Candles",
    link: "beeswaxcandles"
  },
];

function Other() {
  const { addToCart } = useContext(CartContext);
  const [showMessage, setShowMessage] = useState(false);
  const [quantities, setQuantities] = useState(
    otherItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subcategory = searchParams.get("subcategory");

  const filteredItems = subcategory
    ? otherItems.filter((item) => item.subcategory === subcategory)
    : otherItems;

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
            padding: "0.75rem 1.25rem",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          ✅ Added to cart!
        </div>
      )}

      <h1 className="page-title">Other Items</h1>
      <div className="product-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h2 className="product-title">{item.title}</h2>
            <p className="product-price">${item.price.toFixed(2)}</p>
            <p className="product-description">{item.description}</p>
            <Row className="product-actions">
              <Link
                to={`/product/${item.link}`}
                className="details-button"
              >
                View Details
              </Link>
            </Row>

            <Col className="add-cart-buttons">
              <button
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
            </Col>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Other;
