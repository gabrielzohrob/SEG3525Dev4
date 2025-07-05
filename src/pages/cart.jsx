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
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shippingCost = 7.99;
  const taxRate = 0.13;
  const taxAmount = totalPrice * taxRate;
  const grandTotal = totalPrice + taxAmount + shippingCost;

  return (
    <div className="cart-container">
      <div className="cart-left">
        <h1 className="page-title">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => {
              const key = `${item.id}-${item.title}`;
              return (
                <div key={key} className="cart-item">
                  <img
                    src={`${import.meta.env.BASE_URL}${item.image}`}
                    alt={item.title}
                    className="cart-img"
                  />
                  <div>
                    <h2 className="cart-title">{item.title}</h2>
                    <p className="cart-price">
                      Price: ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>

                  <div className="cart-actions">
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
                      className="update-btn"
                      onClick={() => handleUpdate(item)}
                    >
                      Add
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
        )}
      </div>

      <div className="cart-right">
        <h1 className="page-title">Order Summary</h1>
        <div className="cart-total">
          <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
          <h4>Shipping: ${shippingCost.toFixed(2)}</h4>
          <h4>Tax (13%): ${taxAmount.toFixed(2)}</h4>
          <h3>Total: ${grandTotal.toFixed(2)}</h3>
        </div>
        <div className="checkout-button-container">
          <button
            className="add-to-cart-button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
          <button
            className="add-to-cart-button"
            onClick={() => navigate("/checkout")}
            style={{ marginTop: "1rem" }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;