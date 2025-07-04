import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext.jsx";
import "./cart.css";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);
  const [editQuantities, setEditQuantities] = useState({});

  const handleQuantityChange = (item, value) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed > 0) {
      const key = `${item.id}-${item.title}`;
      setEditQuantities((prev) => ({ ...prev, [key]: parsed }));
    }
  };

  const handleUpdate = (item) => {
    const key = `${item.id}-${item.title}`;
    const updatedCart = cartItems.map((cartItem) =>
      cartItem.id === item.id && cartItem.title === item.title
        ? { ...cartItem, quantity: editQuantities[key] || cartItem.quantity }
        : cartItem
    );
    setCartItems(updatedCart);
  };

  const handleRemove = (item) => {
    const updatedCart = cartItems.filter(
      (cartItem) => !(cartItem.id === item.id && cartItem.title === item.title)
    );
    setCartItems(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="product-page">
      <h1 className="page-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="product-grid">
            {cartItems.map((item) => {
              const key = `${item.id}-${item.title}`;
              return (
                <div key={key} className="product-card">
                  <img src={item.image} alt={item.title} />
                  <h2 className="product-title">{item.title}</h2>
                  <p className="product-price">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="product-description">
                    Quantity: {item.quantity}
                  </p>
                  <div className="product-actions">
                    <input
                      type="number"
                      min="1"
                      value={editQuantities[key] || item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, e.target.value)
                      }
                      className="quantity-selector"
                    />
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-total">
            <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
          </div>

          <div
            className="checkout-button-container"
            style={{ textAlign: "center", marginTop: "2rem" }}
          >
            <button
              className="add-to-cart-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;