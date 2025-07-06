import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';
import { useState } from 'react';

// STATIC IMAGE IMPORTS
import storeImg from '/others/george-shop.jpg';
import featuredBibleImg from '/books/orthodox-bible.jpg';
import featuredPantocratorImg from '/icons/pantocrator.jpg';
import featuredKomboskiniImg from '/others/komboskini.jpg';

function Home() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    details: ''
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      handleCloseModal();
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <img
            src={storeImg}
            className="hero-background-img"
            alt="Store"
          />
          <div className="hero-text-overlay">
            <h1>Welcome to the St. Elias Cathedral's <br />Online Bookstore</h1>
            <p>The only Orthodox shop located in Ottawa for handpicked Orthodox books, sacred icons, and devotional treasures for the faithful.</p>
            <div className="hero-buttons">
              <Link to="/books">Books</Link>
              <Link to="/icons">Icons</Link>
              <Link to="/other">Other</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <Container className="location-container container mt-5 mb-5">
        <Row>
          <Col md={5} className="location-desc">
            <h2 className="location-heading">Where are we located?</h2>
            <p>
              Currently located in the basement of the Saint Elias Antiochian Orthodox Cathedral.
              You can either place your orders online for delivery or in-store pickup.
              <br />
              You can also stop by for a chat with our delightful store clerk.
            </p>
            <ul className="time-list">
              <li className="time-item">Open Sundays from 12:15p.m to 1:00p.m</li>
              <li className="time-item">
                <Button variant="link" style={{ padding: 0, textDecoration: "none", color: "black" }} onClick={handleOpenModal}>
                  Can also open upon request (<i>Click for more details</i>)
                </Button>
              </li>
            </ul>
          </Col>

          <Col md={7}>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.0881424470576!2d-75.69125782373123!3d45.36721637107248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce06173c848c77%3A0xf326e5de9de13fcf!2sSt.%20Elias%20Antiochian%20Orthodox%20Cathedral!5e0!3m2!1sen!2sca!4v1751672721352!5m2!1sen!2sca"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Featured Section */}
      <section className="featured-section">
        <h2>Featured Selections</h2>
        <div className="featured-grid">
          {[
            {
              title: 'Orthodox Study Bible',
              image: featuredBibleImg,
              link: 'studybible'
            },
            {
              title: 'Icon of Christ Pantocrator',
              image: featuredPantocratorImg,
              link: 'pantocrator'
            },
            {
              title: 'Prayer Rope (Komboskini)',
              image: featuredKomboskiniImg,
              link: 'prayerrope33'
            },
          ].map((item, index) => (
            <div key={index} className="featured-card">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <div className="featured-card-button">
                <Button href={`/product/${item.link}`}>Learn more</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request In-Store Opening</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="contactName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="contactNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="(613) 731-1111"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="requestDetails">
              <Form.Label>Request Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your request..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
            </Form.Group>
          </Form>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem', color: '#555' }}>
            Once submitted, we will be in contact with you shortly to discuss a date and time that works for you.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;