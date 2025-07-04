import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import "./books.css";
import { CartContext } from "../CartContext.jsx";

const bookData = [
  {
    id: 1,
    title: "The Way of a Pilgrim",
    price: 22.99,
    subcategory: "Saints Lives and Writings",
    description: "A classic spiritual journey of an anonymous Russian pilgrim seeking the Jesus Prayer.",
    image: "/books/thewayofapilgrim.jpg",
  },
  {
    id: 2,
    title: "Orthodox Prayer Book",
    price: 15.0,
    subcategory: "Prayer Book",
    description: "A compact and essential guide to daily Orthodox prayers and services.",
    image: "/books/orthodoxprayerbook.jpg",
  },
  {
    id: 3,
    title: "The Ladder of Divine Ascent",
    price: 27.5,
    subcategory: "Theology",
    description: "A foundational text of Orthodox spirituality by St. John Climacus.",
    image: "/books/theladderofdivineascent.jpg",
  },
  {
    id: 4,
    title: "Wounded by Love: The Life and Wisdom of Elder Porphyrios",
    price: 24.99,
    subcategory: "Saints Lives and Writings",
    description: "The beautiful and humble teachings of Elder Porphyrios on divine love.",
    image: "/books/woundedbylove.jpg",
  },
  {
    id: 5,
    title: "The Orthodox Church",
    price: 25.0,
    subcategory: "History",
    description: "The Orthodox Church, an Introduction to Eastern Christianity, by Timothy Ware",
    image: "/books/theorthodoxchurch.jpg",
  },
];

function Books() {
  const [quantities, setQuantities] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const { addToCart } = useContext(CartContext);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const subcategory = params.get("subcategory");

  const filteredBooks = subcategory
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
        {filteredBooks.map((book) => (
          <div key={book.id} className="product-card">
            <img src={book.image} alt={book.title} />
            <h2 className="product-title">{book.title}</h2>
            <p className="product-description">{book.description}</p>
            <p className="product-price">${book.price.toFixed(2)}</p>
            <div className="product-actions">
              <input
                type="number"
                min="1"
                value={quantities[book.id] || 1}
                onChange={(e) =>
                  handleQuantityChange(book.id, parseInt(e.target.value))
                }
                className="quantity-selector"
              />
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(book)}
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

export default Books;