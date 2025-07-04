import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">St. Elias Orthodox Store</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/icons">Icons</Link></li>
        <li><Link to="/other">Other</Link></li>
        <li><Link to="/cart">Cart</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
