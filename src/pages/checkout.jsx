import React, { useContext, useState } from "react";
import {Row} from 'react-bootstrap';
import { CartContext } from "../CartContext.jsx";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

function Checkout() {
  const { cartItems, setCartItems } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [pickupInStore, setPickupInStore] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shippingCost = 7.99;
  const taxRate = 0.13; // 13% tax
  const taxAmount = totalPrice * taxRate;
  const grandTotal = totalPrice + taxAmount + shippingCost;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    province: "",
    postalCode: "",
    paymentMethod: "Credit Card",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, phone } = formData;

    if (!firstName || !lastName || !email || !phone) {
      alert("Please fill in all required fields.");
      return;
    }

    if (
      !pickupInStore &&
      (!formData.address1 || !formData.city || !formData.province || !formData.postalCode)
    ) {
      alert("Please complete your shipping address or select pickup in store.");
      return;
    }

    console.log("Order Details:", { ...formData, cartItems, pickupInStore });
    setOrderPlaced(true);
    setCartItems([]);
  };

  return (
    <div className="product-page">
      <h1 className="page-title">Checkout</h1>

      {orderPlaced ? (
        <div className="order-success">
          <h2>✅ Thank you for your order!</h2>
          <p>You will receive a confirmation email shortly.</p>
          <button
            className="add-to-cart-button"
            onClick={() => navigate("/")}
            style={{ marginTop: "1.5rem" }}
          >
            Return to Shop
          </button>
        </div>
      ) : (
        <div className="checkout-container">
          {/* Left: Form */}
          <div className="checkout-left">
            <form onSubmit={handleOrderSubmit} className="checkout-form" id="checkout-form">
              <div className="customer-info">
                <h2>Customer Information</h2>
                <div className="form-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-row-more">
                  <input
                    class="contactInput"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                    class="contactInput"
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                </div>
                

                <div className="pickup-checkbox">
                  <input
                    type="checkbox"
                    id="pickup"
                    checked={pickupInStore}
                    onChange={(e) => setPickupInStore(e.target.checked)}
                  />
                  <label htmlFor="pickup">Pick up in store</label>
                </div>

                <h2>Shipping Address</h2>
                <input
                  type="text"
                  name="address1"
                  placeholder="Address Line 1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  disabled={pickupInStore}
                  required={!pickupInStore}
                />
                <input
                  type="text"
                  name="address2"
                  placeholder="Address Line 2 (optional)"
                  value={formData.address2}
                  onChange={handleInputChange}
                  disabled={pickupInStore}
                />

                <div className="form-row">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={pickupInStore}
                    required={!pickupInStore}
                  />
                  <input
                    type="text"
                    name="province"
                    placeholder="Province"
                    value={formData.province}
                    onChange={handleInputChange}
                    disabled={pickupInStore}
                    required={!pickupInStore}
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    disabled={pickupInStore}
                    required={!pickupInStore}
                  />
                </div>
              </div>

              <div className="payment-section">
                <h2>Payment Method</h2>

                <div className="payment-option">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Credit Card"
                      checked={formData.paymentMethod === "Credit Card"}
                      onChange={handleInputChange}
                    />
                    <span className="payment-label">Credit/Debit Card</span>
                  </label>

                  {formData.paymentMethod === "Credit Card" && (
                    <div className="card-details">
                      <input type="text" name="cardNumber" placeholder="Card number" />
                      <div className="card-row">
                        <input type="text" name="expiry" placeholder="Expiration date (MM / YY)" />
                        <input type="text" name="cvc" placeholder="Security code" />
                      </div>
                      <input type="text" name="cardName" placeholder="Name on card" />
                      <div className="pickup-checkbox">
                        <input
                          type="checkbox"
                          defaultChecked
                        />
                        <label htmlFor="pickup">Use shipping address as billing address</label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="payment-option">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="eTransfer"
                      checked={formData.paymentMethod === "eTransfer"}
                      onChange={handleInputChange}
                    />
                    <span className="payment-label">eTransfer</span>
                  </label>
                </div>

                <div className="payment-option">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Pay in Store"
                      checked={formData.paymentMethod === "Pay in Store"}
                      onChange={handleInputChange}
                    />
                    <span className="payment-label">Pay in Store</span>
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="checkout-right">
            <Row>
                <div className="order-summary-scrollable">
                  <h2>Order Summary</h2>
                  {cartItems.map((item) => (
                    <div key={`${item.id}-${item.title}`} className="summary-item">
                      <p><strong>{item.title}</strong></p>
                      <p>Qty: {item.quantity}</p>
                      <p>${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
            </Row>

            <Row className="order-summary">
              <h3>Subtotal: ${totalPrice.toFixed(2)}</h3>
              <h4>Shipping: ${shippingCost.toFixed(2)}</h4>
              <h4>Tax (13%): ${taxAmount.toFixed(2)}</h4>
              <h3>Total: ${grandTotal.toFixed(2)}</h3>

              <button
                type="submit"
                form="checkout-form"
                className="add-to-cart-button"
                style={{ marginTop: "1rem" }}
              >
                Place Order
              </button>
              
            </Row>
            
            
          </div>
          
        </div>
      )}
    </div>
  );
}

export default Checkout;