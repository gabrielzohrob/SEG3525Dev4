import React, { useState, useContext } from "react";
import { Link, useLocation } from 'react-router-dom';
import "./card.css";
import { CartContext } from "../CartContext.jsx";
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

const iconsData = [
  { id: 1, title: "Icon of Christ Pantocrator", price: 30, subcategory: "Christ", image: `${import.meta.env.BASE_URL}icons/pantocrator.jpg`, link: "pantocrator", description: "An iconic image of Christ the Almighty, symbolizing divine authority and wisdom." },
  { id: 2, title: "Theotokos of Vladimir", price: 28, subcategory: "Theotokos", image: `${import.meta.env.BASE_URL}icons/theotokosofvladimir.jpg`, link: "theotokosvladimir", description: "A revered icon of the Virgin Mary as the Mother of God, embodying compassion and protection." },
  { id: 3, title: "St. George the Trophy-Bearer", price: 25, subcategory: "Saints", image: `${import.meta.env.BASE_URL}icons/georgethetrophybearer.jpg`, link: "georgethetrophybearer", description: "Depicts St. George slaying the dragon, symbolizing the victory of good over evil." },
  { id: 4, title: "Holy Trinity (Rublev)", price: 32, subcategory: "Feasts", image: `${import.meta.env.BASE_URL}icons/holytrinityrublev.jpg`, link: "holytrinityrublev", description: "A famous icon representing the Holy Trinity, emphasizing unity and divine mystery." },
  { id: 5, title: "St. Nicholas the Wonderworker", price: 26, subcategory: "Saints", image: `${import.meta.env.BASE_URL}icons/stnicholasthewonderworker.jpg`, link: "stnicholasthewonderworker", description: "Icon of St. Nicholas, known for his miracles and generosity to the needy." },
  { id: 6, title: "Theotokos of Kazan", price: 28, subcategory: "Theotokos", image: `${import.meta.env.BASE_URL}icons/theotokosofkazan.jpg`, link: "theotokoskazan", description: "A revered icon of the Virgin Mary, symbolizing protection and intercession." },
  { id: 7, title: "Resurrection of Christ (Anastasis)", price: 35, subcategory: "Feasts", image: `${import.meta.env.BASE_URL}icons/iconofresurrection.jpg`, link: "iconofresurrection", description: "Depicts Christ’s resurrection, triumphing over death and sin." },
  { id: 8, title: "Icon of the Nativity", price: 33, subcategory: "Feasts", image: `${import.meta.env.BASE_URL}icons/iconofnativity.jpg`, link: "iconofnativity", description: "Represents the birth of Christ, a central event in Christian faith." },
  { id: 9, title: "St. Seraphim of Sarov", price: 27, subcategory: "Saints", image: `${import.meta.env.BASE_URL}icons/seraphimofsarov.jpg`, link: "seraphimofsarov", description: "Icon of St. Seraphim, known for his spiritual teachings and miracles." },
  { id: 10, title: "St. Paisios the Athonite", price: 29, subcategory: "Saints", image: `${import.meta.env.BASE_URL}icons/paisios.jpg`, link: "paisios", description: "Honors St. Paisios, a modern saint known for his wisdom and humility." },
  { id: 11, title: "St. Moses the Black", price: 27, subcategory: "Saints", image: `${import.meta.env.BASE_URL}icons/mosestheblack.jpg`, link: "mosestheblack", description: "Depicts St. Moses the Black, a former outlaw turned ascetic and saint." },
  { id: 12, title: "Transfiguration of Christ", price: 34, subcategory: "Feasts", image: `${import.meta.env.BASE_URL}icons/iconoftransfiguration.jpg`, link: "iconoftransfiguration", description: "Shows Christ’s transfiguration, revealing his divine glory to the apostles." },
  { id: 13, title: "Theotokos Joy of All Who Sorrow", price: 28, subcategory: "Theotokos", image: `${import.meta.env.BASE_URL}icons/joyofallsorrow.jpg`, link: "joyofallsorrow", description: "An icon of the Virgin Mary offering comfort to those in distress." },
  { id: 14, title: "Icon of the Crucifixion", price: 33, subcategory: "Feasts", image: `${import.meta.env.BASE_URL}icons/iconofcrucifixion.jpg`, link: "iconofcrucifixion", description: "Depicts the crucifixion of Christ, central to Christian salvation." },
  { id: 15, title: "Archangel Michael", price: 26, subcategory: "Saints", image: `${import.meta.env.BASE_URL}icons/archangelmichael.jpg`, link: "archangelmichael", description: "Icon of Archangel Michael, the protector and leader of heavenly hosts." }
];

function Icons() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("subcategory") || searchParams.get("filter");

  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState(
    iconsData.reduce((acc, icon) => ({ ...acc, [icon.id]: 1 }), {})
  );
  const [showMessage, setShowMessage] = useState(false);

  const handleQuantityChange = (id, value) => {
    const parsed = parseInt(value);
    if (!isNaN(parsed) && parsed > 0) {
      setQuantities((prev) => ({ ...prev, [id]: parsed }));
    }
  };

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, quantity });

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const filteredItems = filter
    ? iconsData.filter((item) => item.subcategory === filter)
    : iconsData;

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
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          ✅ Added to cart!
        </div>
      )}

      <h1 className="page-title">Orthodox Icons</h1>
      <div className="product-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="product-card">
            <div className="icon-preview">
              <img src={item.image} alt={item.title} />
            </div>
            <h2 className="product-title">{item.title}</h2>
            <p className="product-price">${item.price.toFixed(2)}</p>
            <p className="product-description">{item.description}</p>
            <Row className="product-actions">
              <Link to={`/product/${item.link}`} className="details-button">
                View Details
              </Link>
            </Row>

            <Col className="add-cart-buttons">
              <button
                style={{ backgroundColor: 'transparent', border: 'none' }}
                onClick={() => handleAddToCart(item)}
                title="Add to Cart"
              >
                <FontAwesomeIcon className="bag-image" icon={faBagShopping} size="lg" />
              </button>
              <input
                type="number"
                min="1"
                className="quantity-selector"
                value={quantities[item.id]}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              />
            </Col>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Icons;