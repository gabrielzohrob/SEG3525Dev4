import React, { useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { CartContext } from "../CartContext.jsx";
import './product.css';

const base = import.meta.env.BASE_URL;

const productData = {
    studybible: {
        title: 'Orthodox Study Bible',
        image: `${base}books/orthodox-bible.jpg`,
        description: 'The Orthodox Study Bible presents the Holy Scriptures in the trusted New King James Version, ...',
        price: 49.99,
    },
    pantocrator: {
        title: 'Icon of Christ Pantocrator',
        image: `${base}icons/pantocrator.jpg`,
        description: 'The Icon of Christ Pantocrator is one of the most ancient and revered images in Orthodox Christianity, ...',
        price: 30.00,
    },
    theotokosvladimir: {
        title: 'Theotokos of Vladimir',
        image: `${base}icons/theotokosofvladimir.jpg`,
        description: 'The Theotokos of Vladimir is one of the most venerated icons in Russian Orthodoxy, ...',
        price: 28.00,
    },
    georgethetrophybearer: {
        title: 'St. George the Trophy-Bearer',
        image: `${base}icons/georgethetrophybearer.jpg`,
        description: 'St. George the Trophy-Bearer is a celebrated saint known for his courage and faith, ...',
        price: 25.00,
    },
    holytrinityrublev: {
        title: 'Holy Trinity (Rublev)',
        image: `${base}icons/holytrinityrublev.jpg`,
        description: 'The Holy Trinity icon by Andrei Rublev is a masterpiece of Russian iconography, ...',
        price: 32.00,
    },
    stnicholasthewonderworker: {
        title: 'St. Nicholas the Wonderworker',
        image: `${base}icons/stnicholasthewonderworker.jpg`,
        description: 'St. Nicholas the Wonderworker is one of the most beloved saints in Orthodoxy, ...',
        price: 26.00,
    },
    theotokoskazan: {
        title: 'Theotokos of Kazan',
        image: `${base}icons/theotokosofkazan.jpg`,
        description: 'The Theotokos of Kazan is one of the most revered icons in Russia, ...',
        price: 28.00,
    },
    iconofresurrection: {
        title: 'Resurrection of Christ (Anastasis)',
        image: `${base}icons/iconofresurrection.jpg`,
        description: 'The Resurrection icon, known as the Anastasis, depicts Christ’s triumphant descent into Hades, ...',
        price: 35.00,
    },
    iconofnativity: {
        title: 'Icon of the Nativity',
        image: `${base}icons/iconofnativity.jpg`,
        description: 'The Icon of the Nativity portrays the birth of Christ with deep theological symbolism, ...',
        price: 33.00,
    },
    seraphimofsarov: {
        title: 'St. Seraphim of Sarov',
        image: `${base}icons/seraphimofsarov.jpg`,
        description: 'St. Seraphim of Sarov is a renowned Russian ascetic and mystic, ...',
        price: 27.00,
    },
    paisios: {
        title: 'St. Paisios the Athonite',
        image: `${base}icons/paisios.jpg`,
        description: 'St. Paisios the Athonite was a 20th-century monk of Mount Athos ...',
        price: 29.00,
    },
    mosestheblack: {
        title: 'St. Moses the Black',
        image: `${base}icons/mosestheblack.jpg`,
        description: 'St. Moses the Black was a former gang leader who converted to Christianity ...',
        price: 27.00,
    },
    iconoftransfiguration: {
        title: 'Transfiguration of Christ',
        image: `${base}icons/iconoftransfiguration.jpg`,
        description: 'The Icon of the Transfiguration depicts Christ revealed in divine glory ...',
        price: 34.00,
    },
    joyofallsorrow: {
        title: 'Theotokos Joy of All Who Sorrow',
        image: `${base}icons/joyofallsorrow.jpg`,
        description: 'The Theotokos Joy of All Who Sorrow is a comforting icon depicting the Mother of God ...',
        price: 28.00,
    },
    iconofcrucifixion: {
        title: 'Icon of the Crucifixion',
        image: `${base}icons/iconofcrucifixion.jpg`,
        description: 'The Icon of the Crucifixion portrays the moment of Christ’s sacrifice ...',
        price: 33.00,
    },
    archangelmichael: {
        title: 'Archangel Michael',
        image: `${base}icons/archangelmichael.jpg`,
        description: 'Archangel Michael is the leader of the heavenly hosts and a powerful protector ...',
        price: 26.00,
    },
    prayerrope33: {
        title: "Prayer Rope (33 knots)",
        image: `${base}others/33knot.jpg`,
        description: "...",
        price: 12.00,
    },
    prayerrope100: {
        title: "Prayer Rope (100 knots)",
        image: `${base}others/100knot.jpg`,
        description: "...",
        price: 20.00,
    },
    incensebyzantine: {
        title: "Incense - Byzantine Blend",
        image: `${base}others/incense.jpg`,
        description: "...",
        price: 8.50,
    },
    charcoaltablets: {
        title: "Charcoal Tablets (Box)",
        image: `${base}others/charcoal.jpg`,
        description: "...",
        price: 6.00,
    },
    woodencross: {
        title: "Orthodox Wall Cross (Wooden)",
        image: `${base}others/cross.jpg`,
        description: "...",
        price: 18.00,
    },
    beeswaxcandles: {
        title: "Pure Beeswax Candles",
        image: `${base}others/candles.jpg`,
        description: "...",
        price: 30.00,
    },
    thewayofapilgrim: {
        title: "The Way of a Pilgrim",
        image: `${base}books/thewayofapilgrim.jpg`,
        description: "...",
        price: 22.99,
    },
    orthodoxprayerbook: {
        title: "Orthodox Prayer Book",
        image: `${base}books/orthodoxprayerbook.jpg`,
        description: "...",
        price: 15.00,
    },
    ladderofdivineascent: {
        title: "The Ladder of Divine Ascent",
        image: `${base}books/theladderofdivineascent.jpg`,
        description: "...",
        price: 27.50,
    },
    woundedbylove: {
        title: "Wounded by Love: The Life and Wisdom of Elder Porphyrios",
        image: `${base}books/woundedbylove.jpg`,
        description: "...",
        price: 24.99,
    },
    orthodoxchurch: {
        title: "The Orthodox Church",
        image: `${base}books/theorthodoxchurch.jpg`,
        description: "...",
        price: 25.00,
    },
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
        return (
            <div style={{ padding: '2rem', fontFamily: 'Georgia, serif' }}>
                <h2>Product not found</h2>
            </div>
        );
    }

    return (
        <Container className="product-page-container">
            {showMessage && (
                <div
                    style={{
                        position: "fixed",
                        top: "1rem",
                        right: "1rem",
                        backgroundColor: "#0c1f1a",
                        color: "#f7eddc",
                        padding: "0.75rem 1.25rem",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                        zIndex: 1000,
                    }}
                >
                    ✅ Added to cart!
                </div>
            )}
            <Row>
                <Col md={6}>
                    <img
                        src={product.image}
                        alt={product.title}
                        className="product-image"
                    />
                </Col>
                <Col md={6}>
                    <div className="product-details">
                        <h1>{product.title}</h1>
                        <h2 className="product-price">${product.price.toFixed(2)}</h2>
                        <p className="product-description">{product.description}</p>
                        <Row className="product-actions mt-4">
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Button
                                        variant="primary"
                                        className="product-add-btn-left"
                                        onClick={() => handleAddToCart(product)}>Add to Cart</Button>
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