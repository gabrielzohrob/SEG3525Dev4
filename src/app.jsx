import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Home from "./pages/home.jsx";
import Books from "./pages/books.jsx";
import Icons from "./pages/icons.jsx";
import Other from "./pages/other.jsx";
import Cart from "./pages/cart.jsx";
import ProductPage from "./pages/product.jsx"
import Checkout from "./pages/checkout.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/icons" element={<Icons />} />
        <Route path="/other" element={<Other />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
