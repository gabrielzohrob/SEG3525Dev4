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
    studybible: {
        title: 'Orthodox Study Bible',
        image: studyBibleImg,
        description: 'The Orthodox Study Bible stands as a comprehensive guide to understanding the richness of Eastern Christian tradition. It combines the literal translation of the Old Testament and the New Testament with commentary drawn from the Church Fathers, liturgical texts, and modern scholarship, making it an indispensable resource for both personal study and congregational teaching.\n\nWith extensive footnotes, cross-references, and articles on doctrinal themes, this volume invites readers to delve deeper into the spiritual heritage of Orthodoxy. Its elegant design and durable binding ensure that it will remain a treasured companion for years to come.',
        price: 49.99
    },
    thewayofapilgrim: {
        title: 'The Way of a Pilgrim',
        image: theWayOfAPilgrimImg,
        description: 'The Way of a Pilgrim is a timeless spiritual classic that recounts the journey of an anonymous Russian pilgrim in search of the secret of continuous prayer. As he travels across towns and monasteries, he learns the Jesus Prayer – a simple yet profound mantra of “Lord Jesus Christ, have mercy on me” – and strives to integrate it into every moment of his life.\n\nBeyond its narrative charm, this text offers deep insights into the practice of contemplative prayer, illustrating how even mundane tasks can become acts of worship. Its inspiring message resonates with seekers of all faiths who yearn for a closer communion with the Divine.',
        price: 22.99
    },
    orthodoxprayerbook: {
        title: 'A Pocket Prayer Book for Orthodox Christians',
        image: orthodoxPrayerBookImg,
        description: 'This perennially popular pocket-size book contains the standard daily personal prayers of Orthodox Christians, as well as prayers for many special needs and circumstances. It includes concise spiritual helps and factual lists to guide the faithful through everyday and extraordinary moments of life.\n\nA helpful guide is provided for preparing for confession, along with prayers for preparation for Holy Communion, and it includes the full text of the Divine Liturgy of St. John Chrysostom. Prepared by the Antiochian Orthodox Christian Archdiocese, it is perfectly suited for private devotion, travel, and daily use.',
        price: 15.00
    },
    ladderofdivineascent: {
        title: 'The Ladder of Divine Ascent',
        image: ladderOfDivineAscentImg,
        description: 'The Ladder of Divine Ascent, written by St. John Climacus in the seventh century, outlines thirty steps toward spiritual perfection, from renunciation of worldly attachments to the summit of divine love. Each step presents a virtue to cultivate and a vice to overcome, with vivid imagery and practical counsel that continues to guide monastics and laypeople today.\n\nSt. John’s profound insight into the human condition and his compassionate tone make this work both challenging and comforting. Readers will find themselves inspired to climb higher in prayer, humility, and self-denial, discovering the transformative power of grace.',
        price: 27.50
    },
    woundedbylove: {
        title: 'Wounded by Love',
        image: woundedByLoveImg,
        description: 'In Wounded by Love, Met. Anthony Bloom explores the paradox of suffering as a pathway to divine intimacy. Drawing on his experiences as a bishop and spiritual father, he offers reflections on how personal trials can strip away ego and open the heart to God’s healing presence.\n\nThrough meditations on prayer, community, and the sacraments, he demonstrates that wounds of the soul and body can become sources of spiritual renewal. His compassionate voice encourages readers to embrace vulnerability and to discover strength in Christ’s enduring love.',
        price: 24.99
    },
    orthodoxchurch: {
        title: 'The Orthodox Church',
        image: orthodoxChurchImg,
        description: 'Alexander Schmemann’s The Orthodox Church is a foundational introduction to the history, theology, and spiritual life of Eastern Christianity. Written with clarity and warmth, it traces the Church’s development from the apostolic era through the Byzantine age and into the modern world.\n\nWith chapters on worship, doctrine, and contemporary challenges, Schmemann illuminates the distinctive call of the Orthodox tradition to communion, liturgical beauty, and transformative faith. This book remains essential for anyone seeking to understand the heart and soul of Orthodoxy.',
        price: 25.00
    },


    pantocrator: {
        title: 'Icon of Christ Pantocrator',
        image: pantocratorImg,
        description: 'The Icon of Christ Pantocrator, one of the most revered images in Orthodox iconography, depicts Christ as both judge and savior, holding the Gospel and offering a blessing. Its bold lines, deep colors, and inscrutable gaze invite the contemplative viewer into a living encounter with the eternal Word.\n\nCrafted according to ancient canons, this icon serves as a focal point for prayer and meditation. Whether displayed in a home chapel or a parish nave, it reminds the faithful of Christ’s abiding presence and sovereign love.',
        price: 30.00
    },
    theotokosvladimir: {
        title: 'Theotokos of Vladimir',
        image: theotokosVladimirImg,
        description: 'The Theotokos of Vladimir, also known as Our Lady of Vladimir, is one of the most celebrated Marian icons, dating back to the 12th century. Its gentle tilt of the Mother’s head toward the Christ Child conveys a tender intimacy, while its rich gold leaf background evokes the glory of heaven.\n\nEsteemed as a protector of Russia and a symbol of compassionate intercession, this icon has inspired countless pilgrims. A faithful reproduction brings that same sense of sacred presence to any devotional space.',
        price: 28.00
    },
    georgethetrophybearer: {
        title: 'St. George the Trophy-Bearer',
        image: georgeTheTrophyImg,
        description: 'St. George the Trophy-Bearer icon portrays the martyrdom and unwavering faith of the soldier-saint who stood firm in the face of persecution. Clad in armor and holding a cross, his serene countenance belies the trials he endured for Christ.\n\nThis image encourages believers to stand courageously for their convictions and to trust God’s victory over suffering. Its dynamic composition and symbolic elements make it a striking addition to any icon corner.',
        price: 25.00
    },
    holytrinityrublev: {
        title: 'Holy Trinity (Rublev)',
        image: holyTrinityImg,
        description: 'Andrei Rublev’s Holy Trinity is a masterpiece of theological poetry in paint, depicting the three angels who visited Abraham as a symbol of the Triune God. Its harmonious composition, delicate hues, and profound symbolism express the unity and mutual love of the Father, Son, and Holy Spirit.\n\nRevered for its spiritual depth, this icon invites viewers into a silent liturgy of interior prayer. A high-quality reproduction captures Rublev’s transcendent vision for personal devotion.',
        price: 32.00
    },
    stnicholasthewonderworker: {
        title: 'St. Nicholas',
        image: stNicholasImg,
        description: 'St. Nicholas the Wonderworker, beloved for his generosity and miracles, is often depicted blessing children and sailors, reflecting his role as protector of the vulnerable. His icon shows him vested in bishop’s robes, holding the Gospels with a pastor’s staff.\n\nThis representation inspires acts of charity and care for those in need. Placing this icon in a home or church fosters a spirit of giving and compassion.',
        price: 26.00
    },
    theotokoskazan: {
        title: 'Theotokos of Kazan',
        image: theotokosKazanImg,
        description: 'Theotokos of Kazan is an iconic image revered as a miracle-working icon that has a storied history of deliverance and protection. Its warm color palette and serene expressions convey the Mother’s loving gaze upon her children.\n\nKnown for countless accounts of healing and defense against adversity, this icon encourages the faithful to seek Mary’s intercession in times of trial. A exacting reproduction offers a tangible link to centuries of devotion.',
        price: 28.00
    },
    iconofresurrection: {
        title: 'Resurrection of Christ',
        image: resurrectionImg,
        description: 'The Resurrection icon vividly portrays Christ breaking the bonds of death, surrounded by figures from the Old Testament whom He liberates from Hades. The dynamic gesture and radiant mandorla symbolize the victory of life over death.\n\nRich in theological symbolism, this icon serves as a proclamation of hope and renewal, especially celebrated during Pascha. Its presence in a worship space reminds believers of the promise of resurrection in their own lives.',
        price: 35.00
    },
    iconofnativity: {
        title: 'Icon of the Nativity',
        image: nativityImg,
        description: 'The Nativity icon unites multiple scenes of Christ’s birth: the Virgin Mary reclining, the shepherds adoring the infant, and the Magi presenting gifts. Each element, from the cave’s darkness to the star overhead, points to the mystery of God becoming man.\n\nOverflowing with narrative detail and symbolic meaning, this icon invites meditation on the Incarnation and the coexistence of heaven and earth. It brings the joy of Christmas into daily prayer.',
        price: 33.00
    },
    seraphimofsarov: {
        title: 'St. Seraphim of Sarov',
        image: seraphimImg,
        description: 'St. Seraphim of Sarov, known for his asceticism and joyous spirituality, is often shown in the forest, sitting on a rock and deep in prayer. His gentle smile and compassionate eyes reflect his teaching: “Acquire the spirit of peace, and a thousand souls around you will be saved.”\n\nThis icon encourages the pursuit of inner stillness and the presence of God in everyday life. It serves as a reminder that holiness is accessible to all through humility and prayer.',
        price: 27.00
    },
    paisios: {
        title: 'St. Paisios the Athonite',
        image: paisiosImg,
        description: 'St. Paisios the Athonite, a modern-day desert father, is celebrated for his prophetic gifts and profound humility. His icon often shows him in simple monastic garb, holding a prayer rope and gazing heavenward in contemplation.\n\nHis life story of compassion for the poor and healing of souls continues to inspire pilgrims. This depiction invites believers to embrace simplicity and trust in God’s providence.',
        price: 29.00
    },
    mosestheblack: {
        title: 'St. Moses the Black',
        image: mosesImg,
        description: 'St. Moses the Black, once an outlaw and thief, found redemption through Christ and became a desert monk known for his powerful humility and nonviolence. His icon captures his peaceful demeanor and the transformation of a hardened heart into one of prayer.\n\nThis image encourages hope in God’s mercy and the possibility of radical conversion. It stands as a testament to the transformative power of grace.',
        price: 27.00
    },
    iconoftransfiguration: {
        title: 'Transfiguration of Christ',
        image: transfigurationImg,
        description: 'The Transfiguration icon reveals Christ’s divine glory as He stands between Moses and Elijah on Mount Tabor, His garments shining like light. The apostles Peter, James, and John are shown in awe, shielding their eyes.\n\nThis scene symbolizes the revelation of Jesus’ heavenly nature and foreshadows His resurrection. It invites believers to seek spiritual transformation and the light of divine presence.',
        price: 34.00
    },
    joyofallsorrow: {
        title: 'Theotokos Joy of All Who Sorrow',
        image: joyOfAllSorrowImg,
        description: 'The Joy of All Who Sorrow icon depicts Mary with outstretched arms, offering comfort to those burdened by life’s challenges. Beneath her, figures representing humanity look upward in hope and trust.\n\nThis compassionate image assures the faithful of Mary’s intercession and the consolation found in Christ. It is especially beloved in times of grief and hardship.',
        price: 28.00
    },
    iconofcrucifixion: {
        title: 'Icon of the Crucifixion',
        image: crucifixionImg,
        description: 'The Crucifixion icon portrays Christ on the cross, flanked by His mother and the beloved disciple, capturing the depth of divine sacrifice. The darkened sky and solemn figures underscore the gravity of His atoning death.\n\nThis powerful image calls believers to meditate on the mystery of salvation and to unite their own sufferings with Christ’s. It remains central to Good Friday observances and personal devotion.',
        price: 33.00
    },
    archangelmichael: {
        title: 'Archangel Michael',
        image: archangelMichaelImg,
        description: 'Archangel Michael, the leader of the heavenly hosts, is depicted in full armor, wielding a spear and shield as he vanquishes evil. His determined gaze and dynamic posture evoke courage and divine protection.\n\nAs a guardian and intercessor, Michael’s image encourages the faithful to stand firm against spiritual adversity. It is often placed at entryways to sanctify and guard spaces.',
        price: 26.00
    },




    prayerrope33: {
        title: 'Prayer Rope (33 knots)',
        image: rope33Img,
        description: 'The 33‑knot Prayer Rope provides a tactile guide for the Jesus Prayer, with each knot representing one repetition. Its compact size makes it ideal for personal prayer, allowing the user to keep their focus on each invocation of Christ’s name.\n\nCrafted from durable wool or silk, it symbolizes the labor of the ascetic life and the unbroken chain of prayer. It serves as a faithful companion on the spiritual path.',
        price: 12.00
    },
    prayerrope100: {
        title: 'Prayer Rope (100 knots)',
        image: rope100Img,
        description: 'With 100 knots, this larger Prayer Rope accommodates longer sessions of contemplative prayer, encouraging deeper immersion in the Jesus Prayer. Each knot invites steadfast attention and spiritual perseverance.\n\nOften used in monastic settings, it can also enrich personal devotion. The rope’s sturdy construction and graceful drape make it both functional and aesthetically pleasing.',
        price: 20.00
    },
    incensebyzantine: {
        title: 'Incense - Byzantine Blend',
        image: incenseImg,
        description: 'Our Byzantine Blend Incense combines frankincense, myrrh, and aromatic resins to create a fragrance that evokes the ancient liturgies of the Orthodox Church. Its rich, sweet smoke fills the air, lifting prayers heavenward and symbolizing the sanctification of worship.\n\nHandcrafted according to traditional recipes, it burns cleanly and long, making it perfect for home prayer corners and church sanctuaries alike. Each stick carries centuries of spiritual heritage.',
        price: 8.50
    },
    charcoaltablets: {
        title: 'Charcoal Tablets',
        image: charcoalImg,
        description: 'Charcoal Tablets are essential for burning loose incense, providing a steady, high-heat source that gently releases fragrant resins. Each tablet is formulated for even ignition and minimal ash, ensuring a clean burning experience.\n\nPackaged in a resealable tin, they are convenient for both liturgical use and personal devotion. Their reliable performance makes them a staple in any prayer kit.',
        price: 6.00
    },
    woodencross: {
        title: 'Orthodox Wall Cross',
        image: crossImg,
        description: 'This Orthodox Wall Cross is crafted from solid wood and hand-painted with traditional iconographic details. Its durable construction and vivid colors make it a striking focal point for home prayer corners and church walls.\n\nThe cross bears the engraved inscriptions of the Crucifixion and Resurrection, reminding viewers of Christ’s victory over death. It arrives ready to hang, transforming any space into a place of reverence.',
        price: 18.00
    },
    beeswaxcandles: {
        title: 'Pure Beeswax Candles',
        image: candlesImg,
        description: 'Our Pure Beeswax Candles emit a warm, golden light and a gentle honeyed aroma, reminiscent of monastic chapels. Made from 100% beeswax, they burn cleanly and drip minimally, offering hours of uninterrupted devotion.\n\nPackaged in bundles of twelve, they are ideal for daily prayer, liturgical services, and meditation. Their natural composition connects users to the earth’s bounty and the beauty of simplicity.',
        price: 30.00
    }
}

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