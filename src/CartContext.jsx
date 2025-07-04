import React, { createContext, useState, useEffect } from "react";

// Create the CartContext
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load from localStorage on first render
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Helper: generate unique key
  const getKey = (item) => `${item.id}-${item.title}`;

  // Add or update item in cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => getKey(i) === getKey(item));
      if (existing) {
        return prev.map((i) =>
          getKey(i) === getKey(item)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  // Optional: remove item completely
  const removeFromCart = (item) => {
    setCartItems((prev) =>
      prev.filter((i) => getKey(i) !== getKey(item))
    );
  };

  // Optional: update item quantity
  const updateQuantity = (item, newQuantity) => {
    setCartItems((prev) =>
      prev.map((i) =>
        getKey(i) === getKey(item) ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  // Optional: clear entire cart
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};