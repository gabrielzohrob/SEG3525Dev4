import React, { useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import { CartContext } from "../CartContext.jsx";
import './product.css';

const productData = {
    studybible: {
        title: 'Orthodox Study Bible',
        image: '/books/orthodox-bible.jpg',
        description: 'The Orthodox Study Bible presents the Holy Scriptures in the trusted New King James Version, augmented by commentary from the early Church Fathers. It serves as a profound guide for both new and seasoned believers seeking to understand the Orthodox Christian tradition.\n\nWith its rich annotations, liturgical references, and articles on Orthodox doctrine, this Bible is ideal for both study and prayer. It bridges the spiritual wisdom of ancient Christianity with the language and understanding of today.',
        price: 49.99,
    },
    pantocrator: {
        title: 'Icon of Christ Pantocrator',
        image: '/icons/pantocrator.jpg',
        description: 'The Icon of Christ Pantocrator is one of the most ancient and revered images in Orthodox Christianity, symbolizing Christ as the Almighty and Judge of all. Traditionally placed in the central dome or apse of Orthodox churches, it reminds the faithful of Christ’s divine authority and eternal presence.\n\nThis icon captures the dual nature of Christ as both human and divine, with one hand raised in blessing and the other holding the Gospels. It is a focal point for prayer and contemplation, inviting believers to recognize the majesty and mercy of the Lord.',
        price: 30.00,
    },
    theotokosvladimir: {
        title: 'Theotokos of Vladimir',
        image: '/icons/theotokosofvladimir.jpg',
        description: 'The Theotokos of Vladimir is one of the most venerated icons in Russian Orthodoxy, dating back to the 12th century. It depicts the tender relationship between the Mother of God and the Christ Child, emphasizing the loving and protective role of Mary.\n\nHistorically, this icon was credited with miraculous interventions, especially in times of war and crisis, and has been a spiritual symbol of Russian identity and faith. Its gentle expression invites deep reverence and trust in the Theotokos’s intercession.',
        price: 28.00,
    },
    georgethetrophybearer: {
        title: 'St. George the Trophy-Bearer',
        image: '/icons/georgethetrophybearer.jpg',
        description: 'St. George the Trophy-Bearer is a celebrated saint known for his courage and faith, often depicted slaying the dragon. This icon symbolizes the victory of good over evil and the power of faith to overcome worldly challenges.\n\nVenerated throughout the Orthodox world, St. George is a patron saint of soldiers and those facing spiritual battles. His story inspires believers to stand firm in their convictions and trust in God’s protection.',
        price: 25.00,
    },
    holytrinityrublev: {
        title: 'Holy Trinity (Rublev)',
        image: '/icons/holytrinityrublev.jpg',
        description: 'The Holy Trinity icon by Andrei Rublev is a masterpiece of Russian iconography, representing the three angels who visited Abraham. This icon is a profound symbol of the unity and mystery of the Holy Trinity in Orthodox theology.\n\nCreated in the 15th century, Rublev’s work is admired for its spiritual depth and harmony, inviting viewers into a contemplative experience of divine love and communion. It remains a central image in Orthodox worship and theology.',
        price: 32.00,
    },
    stnicholasthewonderworker: {
        title: 'St. Nicholas the Wonderworker',
        image: '/icons/stnicholasthewonderworker.jpg',
        description: 'St. Nicholas the Wonderworker is one of the most beloved saints in Orthodoxy, known for his generosity, miracles, and protection of the innocent. His life and deeds inspired the modern figure of Santa Claus, though his true legacy lies in his deep faith and charity.\n\nThis icon honors his role as a bishop and miracle worker, reminding the faithful of the power of compassion and the importance of caring for the vulnerable.',
        price: 26.00,
    },
    theotokoskazan: {
        title: 'Theotokos of Kazan',
        image: '/icons/theotokosofkazan.jpg',
        description: 'The Theotokos of Kazan is one of the most revered icons in Russia, credited with numerous miracles and protection of the nation. It depicts the Mother of God holding the Christ Child, symbolizing her role as protector and intercessor.\n\nThis icon has a rich history of being carried into battle and brought to churches during times of need, embodying the hope and faith of the Orthodox people. Its veneration continues to inspire devotion and prayer.',
        price: 28.00,
    },
    iconofresurrection: {
        title: 'Resurrection of Christ (Anastasis)',
        image: '/icons/iconofresurrection.jpg',
        description: 'The Resurrection icon, known as the Anastasis, depicts Christ’s triumphant descent into Hades, breaking the bonds of death and raising Adam and Eve from the grave. It is a vivid representation of the victory over sin and death central to Orthodox faith.\n\nThis icon is celebrated especially during Pascha (Easter), symbolizing hope, renewal, and the promise of eternal life. Its rich symbolism invites believers to participate spiritually in Christ’s resurrection.',
        price: 35.00,
    },
    iconofnativity: {
        title: 'Icon of the Nativity',
        image: '/icons/iconofnativity.jpg',
        description: 'The Icon of the Nativity portrays the birth of Christ with deep theological symbolism, emphasizing the Incarnation of God as man. It features the Virgin Mary, the Christ Child, angels, shepherds, and the Magi, all pointing to the fulfillment of prophecy.\n\nThis icon is central to the celebration of Christmas in Orthodoxy, reminding the faithful of God’s humility and love in taking on human flesh to redeem the world.',
        price: 33.00,
    },
    seraphimofsarov: {
        title: 'St. Seraphim of Sarov',
        image: '/icons/seraphimofsarov.jpg',
        description: 'St. Seraphim of Sarov is a renowned Russian ascetic and mystic, celebrated for his deep prayer life, humility, and spiritual gifts. His teachings emphasize the acquisition of the Holy Spirit and the transformation of the heart.\n\nKnown for his radiant holiness and miracles, St. Seraphim remains a model of Christian perfection and a beloved intercessor for many Orthodox Christians worldwide.',
        price: 27.00,
    },
    paisios: {
        title: 'St. Paisios the Athonite',
        image: '/icons/paisios.jpg',
        description: 'St. Paisios the Athonite was a 20th-century monk of Mount Athos known for his profound spiritual wisdom, humility, and prophetic gifts. He guided countless pilgrims and believers through his teachings and example.\n\nHis life exemplifies the contemporary relevance of Orthodox monasticism and the power of prayer, repentance, and love in the modern world. He was canonized in 2015 and continues to inspire many.',
        price: 29.00,
    },
    mosestheblack: {
        title: 'St. Moses the Black',
        image: '/icons/mosestheblack.jpg',
        description: 'St. Moses the Black was a former gang leader who converted to Christianity and became a desert monk, embodying a powerful story of redemption and transformation. His life teaches the mercy of God and the possibility of radical change.\n\nHe is remembered for his humility, patience, and dedication to prayer, serving as an inspiration for those seeking to overcome sin and find peace in Christ.',
        price: 27.00,
    },
    iconoftransfiguration: {
        title: 'Transfiguration of Christ',
        image: '/icons/iconoftransfiguration.jpg',
        description: 'The Icon of the Transfiguration depicts Christ revealed in divine glory to Peter, James, and John on Mount Tabor. It reveals the divine nature of Christ and foreshadows His resurrection.\n\nThis event is a cornerstone of Orthodox theology, emphasizing the union of divine and human in Christ and the promise of our own transformation through grace. The icon invites believers to contemplate the glory of God and the hope of eternal life.',
        price: 34.00,
    },
    joyofallsorrow: {
        title: 'Theotokos Joy of All Who Sorrow',
        image: '/icons/joyofallsorrow.jpg',
        description: 'The Theotokos Joy of All Who Sorrow is a comforting icon depicting the Mother of God interceding for those who suffer and face trials. It is a source of hope and consolation for many Orthodox Christians.\n\nThis icon is often venerated in times of distress, reminding believers of Mary’s compassionate love and her powerful intercession before her Son on behalf of humanity.',
        price: 28.00,
    },
    iconofcrucifixion: {
        title: 'Icon of the Crucifixion',
        image: '/icons/iconofcrucifixion.jpg',
        description: 'The Icon of the Crucifixion portrays the moment of Christ’s sacrifice on the Cross, surrounded by the Theotokos and the Apostle John. It captures the profound sorrow and love inherent in the Passion.\n\nThis icon is central to Orthodox devotion during Holy Week, inviting the faithful to meditate on Christ’s suffering for humanity’s salvation and to unite their own sufferings with His.',
        price: 33.00,
    },
    archangelmichael: {
        title: 'Archangel Michael',
        image: '/icons/archangelmichael.jpg',
        description: 'Archangel Michael is the leader of the heavenly hosts and a powerful protector against evil and spiritual warfare. He is often depicted as a warrior with a sword, symbolizing his role in defending God’s kingdom.\n\nVenerated throughout Orthodoxy, Archangel Michael is called upon for protection, guidance, and strength in times of trial. His icon inspires courage and faith in the battle against sin and darkness.',
        price: 26.00,
    },

    prayerrope33: {
        title: "Prayer Rope (33 knots)",
        image: "/others/33knot.jpg",
        description: "This traditional woolen prayer rope with 33 knots is used in the Jesus Prayer, a central practice in Orthodox spirituality. The number 33 symbolizes the years of Christ’s earthly life.\n\nThe prayer rope aids in focusing the mind and heart during prayer, fostering a deepening relationship with God through repeated invocation of Jesus’ name. It is a treasured tool for monks and laypeople alike.",
        price: 12.00,
    },
    prayerrope100: {
        title: "Prayer Rope (100 knots)",
        image: "/others/100knot.jpg",
        description: "The 100-knot prayer rope is designed for extended prayer and meditation, allowing the faithful to practice the Jesus Prayer for longer periods. It represents perseverance and dedication in spiritual life.\n\nUsed widely in monastic settings, this prayer rope helps cultivate inner stillness and continual remembrance of God, which are foundational to Orthodox asceticism and prayer.",
        price: 20.00,
    },
    incensebyzantine: {
        title: "Incense - Byzantine Blend",
        image: "/others/incense.jpg",
        description: "This high-quality incense features a rich, aromatic Byzantine fragrance traditionally used in Orthodox worship. Incense symbolizes the prayers of the faithful rising to heaven and the sanctification of the space.\n\nIts blend evokes the ancient liturgical heritage of Byzantium, enhancing the sensory experience of worship and creating an atmosphere of reverence and holiness.",
        price: 8.50,
    },
    charcoaltablets: {
        title: "Charcoal Tablets (Box)",
        image: "/others/charcoal.jpg",
        description: "Quick-lighting charcoal tablets are essential for burning incense at home or in church. They provide a steady, clean heat source that allows the incense to release its full fragrance.\n\nThese tablets facilitate traditional Orthodox rituals and personal prayer practices, helping to create a sacred environment conducive to worship and contemplation.",
        price: 6.00,
    },
    woodencross: {
        title: "Orthodox Wall Cross (Wooden)",
        image: "/others/cross.jpg",
        description: "This hand-carved wooden wall cross is designed for prayer corners, a traditional space in Orthodox homes dedicated to worship and reflection. The cross serves as a constant reminder of Christ’s sacrifice and love.\n\nCrafted with care, it embodies the spiritual heritage of Orthodoxy and invites families to cultivate a home centered on faith and prayer.",
        price: 18.00,
    },
    beeswaxcandles: {
        title: "Pure Beeswax Candles",
        image: "/others/candles.jpg",
        description: "Candles made from pure beeswax are prized in Orthodox worship for their natural purity and symbolic light. The flame represents Christ as the Light of the World, illuminating spiritual darkness.\n\nThese candles are often used during liturgies, vigils, and personal prayer, enhancing the sacred atmosphere and reminding the faithful of the presence of God.",
        price: 30.00,
    },
    thewayofapilgrim: {
        title: "The Way of a Pilgrim",
        image: "/books/thewayofapilgrim.jpg",
        description: "This classic spiritual journey recounts the anonymous Russian pilgrim’s quest to understand the Jesus Prayer and attain ceaseless prayer. It is a foundational text in Orthodox spirituality, emphasizing humility and perseverance.\n\nThe book inspires readers to deepen their prayer life and embrace the transformative power of continual communion with God through the heart-centered Jesus Prayer.",
        price: 22.99,
    },
    orthodoxprayerbook: {
        title: "Orthodox Prayer Book",
        image: "/books/orthodoxprayerbook.jpg",
        description: "A compact and essential guide containing daily Orthodox prayers and services, this prayer book supports the faithful in maintaining a rhythm of prayer throughout the day. It includes prayers for various occasions and liturgical seasons.\n\nIdeal for both beginners and experienced believers, it fosters spiritual growth and connection to the Church’s rich prayer tradition.",
        price: 15.00,
    },
    ladderofdivineascent: {
        title: "The Ladder of Divine Ascent",
        image: "/books/theladderofdivineascent.jpg",
        description: "Written by St. John Climacus in the 7th century, The Ladder of Divine Ascent is a foundational text of Orthodox spirituality. It describes the spiritual journey as a ladder of thirty steps leading to theosis, or union with God.\n\nThis work has guided countless monastics and laypeople alike in their pursuit of holiness, offering practical advice on virtues, prayer, and overcoming passions.",
        price: 27.50,
    },
    woundedbylove: {
        title: "Wounded by Love: The Life and Wisdom of Elder Porphyrios",
        image: "/books/woundedbylove.jpg",
        description: "This book presents the beautiful and humble teachings of Elder Porphyrios, a modern Orthodox saint known for his deep love of God and people. His wisdom emphasizes healing through divine love and compassion.\n\nThrough stories and reflections, readers are invited to encounter the transformative power of grace and the path to spiritual healing in contemporary life.",
        price: 24.99,
    },
    orthodoxchurch: {
        title: "The Orthodox Church",
        image: "/books/theorthodoxchurch.jpg",
        description: "Written by Timothy Ware, this authoritative introduction to Eastern Christianity explores the history, theology, and practices of the Orthodox Church. It provides a clear and accessible overview for both newcomers and those seeking deeper understanding.\n\nThe book highlights the Church’s continuity with the early Christian tradition and its vibrant spiritual life, making it an indispensable resource for students and faithful alike.",
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
            <div className="product-actions mt-4 product-actions-left">
              <Row className="align-items-center">
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
                <Col xs="auto">
                  <Button 
                    variant="primary" 
                    className="product-add-btn-left" 
                    onClick={() => handleAddToCart(product)}>Add to Cart</Button>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;