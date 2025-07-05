import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../CartContext.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import logoImg from '/logos/st-elias-logo.png'; // ✅ static import

import "./navbar.css";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="navbar">
      <div>
        <Link to="/" className="navbar-logo">
          <img src={logoImg} alt="logo" />
          <span className="logo-text">St. Elias Bookstore</span>
        </Link>
      </div>

      <ul className="navbar-links">
        {/* Books Dropdown */}
        <li className="dropdown">
          <Link to="/books">Books</Link>
          <ul className="dropdown-menu">
            <li><Link to="/books?subcategory=History">History</Link></li>
            <li><Link to="/books?subcategory=Theology">Theology</Link></li>
            <li><Link to="/books?subcategory=Saints%20Lives%20and%20Writings">Saints' Lives and Writings</Link></li>
            <li><Link to="/books?subcategory=Bible">Bible</Link></li>
            <li><Link to="/books?subcategory=Prayer%20Book">Prayer Book</Link></li>
          </ul>
        </li>

        {/* Icons Dropdown */}
        <li className="dropdown">
          <Link to="/icons">Icons</Link>
          <ul className="dropdown-menu">
            <li><Link to="/icons?subcategory=Christ">Christ</Link></li>
            <li><Link to="/icons?subcategory=Feasts">Feasts</Link></li>
            <li><Link to="/icons?subcategory=Theotokos">Theotokos</Link></li>
            <li><Link to="/icons?subcategory=Saints">Saints</Link></li>
          </ul>
        </li>

        {/* Other Dropdown */}
        <li className="dropdown other-dropdown">
          <Link to="/other">Other</Link>
          <ul className="dropdown-menu">
            <li><Link to="/other?subcategory=Incense">Incense</Link></li>
            <li><Link to="/other?subcategory=Prayer%20Rope">Prayer Rope</Link></li>
            <li><Link to="/other?subcategory=Candles">Candles</Link></li>
            <li><Link to="/other?subcategory=Cross">Cross</Link></li>
          </ul>
        </li>

        {/* Cart */}
        <li className="cart-link-wrapper">
          <Link to="/cart" className="cart-link">
            <FontAwesomeIcon className="cart-image" icon={faShoppingCart} />
            {totalItems > 0 && (
              <span className="cart-counter">{totalItems}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;