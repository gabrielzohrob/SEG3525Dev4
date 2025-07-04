import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ backgroundColor: '#f7eddc', fontFamily: 'Georgia, serif' }}>
      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem',
        backgroundColor: '#0c1f1a',
        color: '#f7eddc',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '2.8rem' }}>Welcome to the St. Elias Orthodox Store</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem', maxWidth: '600px', margin: 'auto' }}>
          Handpicked Orthodox books, sacred icons, and devotional treasures for the faithful.
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link
            to="/books"
            style={{
              backgroundColor: '#d6a85c',
              color: '#0c1f1a',
              padding: '0.75rem 1.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '8px',
            }}
          >
            Books
          </Link>
          <Link
            to="/icons"
            style={{
              backgroundColor: '#d6a85c',
              color: '#0c1f1a',
              padding: '0.75rem 1.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '8px',
            }}
          >
            Icons
          </Link>
          <Link
            to="/other"
            style={{
              backgroundColor: '#d6a85c',
              color: '#0c1f1a',
              padding: '0.75rem 1.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
              borderRadius: '8px',
            }}
          >
            Other
          </Link>
        </div>
      </section>

      {/* Featured Section */}
      <section style={{
        padding: '3rem 2rem',
        textAlign: 'center',
        color: '#0c1f1a',
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Featured Selections</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            {
              title: 'Orthodox Study Bible',
              image: 'https://m.media-amazon.com/images/I/71cNqubdLGL._AC_UF1000,1000_QL80_.jpg',
            },
            {
              title: 'Icon of Christ Pantocrator',
              image: 'https://www.uncutmountainsupply.com/images/P/ICON1005%20CHRIST%20PANTOCRATOR%20LG.jpg',
            },
            {
              title: 'Prayer Rope (Komboskini)',
              image: 'https://www.orthodoxmonasteryicons.com/cdn/shop/products/100-Knot-Black-Wool-Prayer-Rope_1024x.jpg',
            },
          ].map((item, index) => (
            <div key={index} style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: '100%', borderRadius: '8px', height: '280px', objectFit: 'cover' }}
              />
              <h3 style={{ marginTop: '1rem', fontSize: '1.1rem' }}>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
