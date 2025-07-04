import React, { useState } from "react";
import "./books.css";

const bookData = [
  {
    id: 1,
    title: "The Way of a Pilgrim",
    price: 22.99,
    description: "A classic spiritual journey of an anonymous Russian pilgrim seeking the Jesus Prayer.",
    image: "/public/books/thewayofapilgrim.jpg",
  },
  {
    id: 2,
    title: "Orthodox Prayer Book",
    price: 15.0,
    description: "A compact and essential guide to daily Orthodox prayers and services.",
    image: "/public/books/orthodoxprayerbook.jpg",
  },
  {
    id: 3,
    title: "The Ladder of Divine Ascent",
    price: 27.5,
    description: "A foundational text of Orthodox spirituality by St. John Climacus.",
    image: "/public/books/theladderofdivineascent.jpg",
  },
  {
    id: 4,
    title: "Wounded by Love: The Life and Wisdom of Elder Porphyrios",
    price: 24.99,
    description: "The beautiful and humble teachings of Elder Porphyrios on divine love.",
    image: "/public/books/woundedbylove.jpg",
  },
];

function Books() {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    alert(`Added ${quantity} of "${product.title}" to cart.`);
  };

  return (
    <div className="product-page">
      <h1 className="page-title">Books</h1>
      <div className="product-grid">
        {bookData.map((book) => (
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
                onChange={(e) => handleQuantityChange(book.id, parseInt(e.target.value))}
                className="quantity-selector"
              />
              <button className="add-to-cart-button" onClick={() => handleAddToCart(book)}>
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
