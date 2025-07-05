import React, { useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { CartContext } from "../CartContext.jsx";
import './product.css';

// Static image imports
import studyBibleImg from '/books/orthodox-bible.jpg';
import theWayOfAPilgrimImg from '/books/thewayofapilgrim.jpg';
import orthodoxPrayerBookImg from '/books/orthodoxprayerbook.jpg';
import ladderOfDivineAscentImg from '/books/theladderofdivineascent.jpg';
import woundedByLoveImg from '/books/woundedbylove.jpg';
import orthodoxChurchImg from '/books/theorthodoxchurch.jpg';

import pantocratorImg from '/icons/pantocrator.jpg';
import theotokosVladimirImg from '/icons/theotokosofvladimir.jpg';
import georgeTheTrophyImg from '/icons/georgethetrophybearer.jpg';
import holyTrinityImg from '/icons/holytrinityrublev.jpg';
import stNicholasImg from '/icons/stnicholasthewonderworker.jpg';
import theotokosKazanImg from '/icons/theotokosofkazan.jpg';
import resurrectionImg from '/icons/iconofresurrection.jpg';
import nativityImg from '/icons/iconofnativity.jpg';
import seraphimImg from '/icons/seraphimofsarov.jpg';
import paisiosImg from '/icons/paisios.jpg';
import mosesImg from '/icons/mosestheblack.jpg';
import transfigurationImg from '/icons/iconoftransfiguration.jpg';
import joyOfAllSorrowImg from '/icons/joyofallsorrow.jpg';
import crucifixionImg from '/icons/iconofcrucifixion.jpg';
import archangelMichaelImg from '/icons/archangelmichael.jpg';

import rope33Img from '/others/33knot.jpg';
import rope100Img from '/others/100knot.jpg';
import incenseImg from '/others/incense.jpg';
import charcoalImg from '/others/charcoal.jpg';
import crossImg from '/others/cross.jpg';
import candlesImg from '/others/candles.jpg';

const productData = {
    studybible: { title: 'Orthodox Study Bible', image: studyBibleImg, description: 'The Orthodox Study Bible...', price: 49.99 },
    thewayofapilgrim: { title: 'The Way of a Pilgrim', image: theWayOfAPilgrimImg, description: '...', price: 22.99 },
    orthodoxprayerbook: { title: 'Orthodox Prayer Book', image: orthodoxPrayerBookImg, description: '...', price: 15.00 },
    ladderofdivineascent: { title: 'The Ladder of Divine Ascent', image: ladderOfDivineAscentImg, description: '...', price: 27.50 },
    woundedbylove: { title: 'Wounded by Love', image: woundedByLoveImg, description: '...', price: 24.99 },
    orthodoxchurch: { title: 'The Orthodox Church', image: orthodoxChurchImg, description: '...', price: 25.00 },

    pantocrator: { title: 'Icon of Christ Pantocrator', image: pantocratorImg, description: '...', price: 30.00 },
    theotokosvladimir: { title: 'Theotokos of Vladimir', image: theotokosVladimirImg, description: '...', price: 28.00 },
    georgethetrophybearer: { title: 'St. George the Trophy-Bearer', image: georgeTheTrophyImg, description: '...', price: 25.00 },
    holytrinityrublev: { title: 'Holy Trinity (Rublev)', image: holyTrinityImg, description: '...', price: 32.00 },
    stnicholasthewonderworker: { title: 'St. Nicholas', image: stNicholasImg, description: '...', price: 26.00 },
    theotokoskazan: { title: 'Theotokos of Kazan', image: theotokosKazanImg, description: '...', price: 28.00 },
    iconofresurrection: { title: 'Resurrection of Christ', image: resurrectionImg, description: '...', price: 35.00 },
    iconofnativity: { title: 'Icon of the Nativity', image: nativityImg, description: '...', price: 33.00 },
    seraphimofsarov: { title: 'St. Seraphim of Sarov', image: seraphimImg, description: '...', price: 27.00 },
    paisios: { title: 'St. Paisios the Athonite', image: paisiosImg, description: '...', price: 29.00 },
    mosestheblack: { title: 'St. Moses the Black', image: mosesImg, description: '...', price: 27.00 },
    iconoftransfiguration: { title: 'Transfiguration of Christ', image: transfigurationImg, description: '...', price: 34.00 },
    joyofallsorrow: { title: 'Theotokos Joy of All Who Sorrow', image: joyOfAllSorrowImg, description: '...', price: 28.00 },
    iconofcrucifixion: { title: 'Icon of the Crucifixion', image: crucifixionImg, description: '...', price: 33.00 },
    archangelmichael: { title: 'Archangel Michael', image: archangelMichaelImg, description: '...', price: 26.00 },

    prayerrope33: { title: "Prayer Rope (33 knots)", image: rope33Img, description: "...", price: 12.00 },
    prayerrope100: { title: "Prayer Rope (100 knots)", image: rope100Img, description: "...", price: 20.00 },
    incensebyzantine: { title: "Incense - Byzantine Blend", image: incenseImg, description: "...", price: 8.50 },
    charcoaltablets: { title: "Charcoal Tablets", image: charcoalImg, description: "...", price: 6.00 },
    woodencross: { title: "Orthodox Wall Cross", image: crossImg, description: "...", price: 18.00 },
    beeswaxcandles: { title: "Pure Beeswax Candles", image: candlesImg, description: "...", price: 30.00 },
};

function ProductPage() {
    const { id } = useParams();
    const product = productData[id];

    const { addToCart } = useContext(CartContext);
    const [showMessage, setShowMessage] = useState(false);
    const [quantities, setQuantities] = useState(
        Object.keys(productData).reduce((acc, key) => ({ ...acc, [key]: 1 }), {})
    );

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

    if (!product) {
        return <div style={{ padding: '2rem', fontFamily: 'Georgia, serif' }}><h2>Product not found</h2></div>;
    }

    return (
        <Container className="product-page-container">
            {showMessage && (
                <div style={{
                    position: "fixed", top: "1rem", right: "1rem",
                    backgroundColor: "#0c1f1a", color: "#f7eddc",
                    padding: "0.75rem 1.25rem", borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)", zIndex: 1000,
                }}>
                    ✅ Added to cart!
                </div>
            )}
            <Row>
                <Col md={6}>
                    <img src={product.image} alt={product.title} className="product-image" />
                </Col>
                <Col md={6}>
                    <div className="product-details">
                        <h1>{product.title}</h1>
                        <h2 className="product-price">${product.price.toFixed(2)}</h2>
                        <p className="product-description">{product.description}</p>
                        <Row className="product-actions mt-4">
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Button variant="primary" className="product-add-btn-left" onClick={() => handleAddToCart(product)}>
                                        Add to Cart
                                    </Button>
                                </Col>
                                <Col xs="auto">
                                    <label htmlFor="quantity" className="me-2">Quantity:</label>
                                    <input
                                        type="number"
                                        min="1"
                                        className="quantity-selector"
                                        value={quantities[id]}
                                        onChange={(e) => handleQuantityChange(id, e.target.value)}
                                    />
                                </Col>
                            </Row>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductPage;