import React, { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./card.css";
import { CartContext } from "../CartContext.jsx";
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

// Static image imports (based on your original paths)
import book1Img from '/books/thewayofapilgrim.jpg';
import book2Img from '/books/orthodoxprayerbook.jpg';
import book3Img from '/books/theladderofdivineascent.jpg';
import book4Img from '/books/woundedbylove.jpg';
import book5Img from '/books/theorthodoxchurch.jpg';

const bookData = [
  {
    id: 1,
    title: "The Way of a Pilgrim",
    price: 22.99,
    subcategory: "Saints Lives and Writings",
    description: "A classic spiritual journey of an anonymous Russian pilgrim seeking the Jesus Prayer.",
    image: book1Img,
    link:"thewayofapilgrim",
  },
  {
    id: 2,
    title: "Orthodox Prayer Book",
    price: 15.0,
    subcategory: "Prayer Book",
    description: "A compact and essential guide to daily Orthodox prayers and services.",
    image: book2Img,
    link: "orthodoxprayerbook",
  },
  {
    id: 3,
    title: "The Ladder of Divine Ascent",
    price: 27.5,
    subcategory: "Theology",
    description: "A foundational text of Orthodox spirituality by St. John Climacus.",
    image: book3Img,
    link:"ladderofdivineascent",
  },
  {
    id: 4,
    title: "Wounded by Love: The Life and Wisdom of Elder Porphyrios",
    price: 24.99,
    subcategory: "Saints Lives and Writings",
    description: "The beautiful and humble teachings of Elder Porphyrios on divine love.",
    image: book4Img,
    link:"woundedbylove",
  },
  {
    id: 5,
    title: "The Orthodox Church",
    price: 25.0,
    subcategory: "History",
    description: "The Orthodox Church, an Introduction to Eastern Christianity, by Timothy Ware",
    image: book5Img,
    link:"orthodoxchurch",
  },
];

function Books() {
  const [quantities, setQuantities] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const { addToCart } = useContext(CartContext);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const subcategory = params.get("subcategory");

  const filteredItems = subcategory
    ? bookData.filter((book) => book.subcategory === subcategory)
    : bookData;

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value) });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart({ ...product, quantity });

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

      <h1 className="page-title">Books</h1>
      <div className="product-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.title} />
            <h2 className="product-title">{item.title}</h2>
            <p className="product-price">${item.price.toFixed(2)}</p>
            <p className="product-description">{item.description}</p>
            <Row className="product-actions">
              <Link to={`/product/${item.link}`} className="details-button">
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
                value={quantities[item.id] || 1}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
            </Col>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;