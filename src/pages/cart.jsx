import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext.jsx";
import "./cart.css";

// BOOK images
import book1Img from "/books/thewayofapilgrim.jpg";
import book2Img from "/books/orthodoxprayerbook.jpg";
import book3Img from "/books/theladderofdivineascent.jpg";
import book4Img from "/books/woundedbylove.jpg";
import book5Img from "/books/theorthodoxchurch.jpg";

// ICON images
import pantocratorImg from '/icons/pantocrator.jpg';
import vladimirImg from '/icons/theotokosofvladimir.jpg';
import georgeImg from '/icons/georgethetrophybearer.jpg';
import trinityImg from '/icons/holytrinityrublev.jpg';
import nicholasImg from '/icons/stnicholasthewonderworker.jpg';
import kazanImg from '/icons/theotokosofkazan.jpg';
import resurrectionImg from '/icons/iconofresurrection.jpg';
import nativityImg from '/icons/iconofnativity.jpg';
import seraphimImg from '/icons/seraphimofsarov.jpg';
import paisiosImg from '/icons/paisios.jpg';
import mosesImg from '/icons/mosestheblack.jpg';
import transfigurationImg from '/icons/iconoftransfiguration.jpg';
import joyImg from '/icons/joyofallsorrow.jpg';
import crucifixionImg from '/icons/iconofcrucifixion.jpg';
import michaelImg from '/icons/archangelmichael.jpg';

// OTHER images
import other1Img from "/others/33knot.jpg";
import other2Img from "/others/100knot.jpg";
import other3Img from "/others/incense.jpg";
import other4Img from "/others/charcoal.jpg";
import other5Img from "/others/cross.jpg";
import other6Img from "/others/candles.jpg";

// Static image mapping
const imageMap = {
  "/books/thewayofapilgrim.jpg": book1Img,
  "/books/orthodoxprayerbook.jpg": book2Img,
  "/books/theladderofdivineascent.jpg": book3Img,
  "/books/woundedbylove.jpg": book4Img,
  "/books/theorthodoxchurch.jpg": book5Img,

  '/icons/pantocrator.jpg' :pantocratorImg,
  '/icons/theotokosofvladimir.jpg':vladimirImg,
  '/icons/georgethetrophybearer.jpg':georgeImg,  
  '/icons/holytrinityrublev.jpg': trinityImg,  
  '/icons/stnicholasthewonderworker.jpg':nicholasImg,
  '/icons/theotokosofkazan.jpg':kazanImg, 
  '/icons/iconofresurrection.jpg': resurrectionImg,  
  '/icons/iconofnativity.jpg': nativityImg, 
  '/icons/seraphimofsarov.jpg': seraphimImg,
  '/icons/paisios.jpg': paisiosImg,
  '/icons/mosestheblack.jpg': mosesImg,
  '/icons/iconoftransfiguration.jpg': transfigurationImg,
  '/icons/joyofallsorrow.jpg':joyImg,
  '/icons/iconofcrucifixion.jpg': crucifixionImg ,
  '/icons/archangelmichael.jpg':michaelImg,

  "/others/33knot.jpg": other1Img,
  "/others/100knot.jpg": other2Img,
  "/others/incense.jpg": other3Img,
  "/others/charcoal.jpg": other4Img,
  "/others/cross.jpg": other5Img,
  "/others/candles.jpg": other6Img,
};

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
              const resolvedImage = imageMap[item.image] || item.image;

              return (
                <div key={key} className="cart-item">
                  <img src={resolvedImage} alt={item.title} className="cart-img" />
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
