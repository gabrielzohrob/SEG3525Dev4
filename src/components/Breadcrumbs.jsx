import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import './Breadcrumbs.css';



// Replace this with your real product map
const productTitles = {
  studybible: 'Orthodox Study Bible',
  thewayofapilgrim: 'The Way of a Pilgrim',
  orthodoxprayerbook: 'Pocket Prayer Book',
  ladderofdivineascent: 'The Ladder of Divine Ascent',
  woundedbylove: 'Wounded by Love',
  orthodoxchurch: 'The Orthodox Church',
  pantocrator: 'Icon of Christ Pantocrator',
  theotokosvladimir: 'Theotokos of Vladimir',
  georgethetrophybearer: 'St. George the Trophy-Bearer',
  holytrinityrublev: 'Holy Trinity (Rublev)',
  stnicholasthewonderworker: 'St. Nicholas',
  theotokoskazan: 'Theotokos of Kazan',
  iconofresurrection: 'Resurrection of Christ',
  iconofnativity: 'Icon of the Nativity',
  seraphimofsarov: 'St. Seraphim of Sarov',
  paisios: 'St. Paisios the Athonite',
  mosestheblack: 'St. Moses the Black',
  iconoftransfiguration: 'Transfiguration of Christ',
  joyofallsorrow: 'Theotokos Joy of All Who Sorrow',
  iconofcrucifixion: 'Icon of the Crucifixion',
  archangelmichael: 'Archangel Michael',
  prayerrope33: 'Prayer Rope (33 knots)',
  prayerrope100: 'Prayer Rope (100 knots)',
  incensebyzantine: 'Incense - Byzantine Blend',
  charcoaltablets: 'Charcoal Tablets',
  woodencross: 'Orthodox Wall Cross',
  beeswaxcandles: 'Pure Beeswax Candles',
};

const productCategoryMap = {
  studybible: 'books',
  thewayofapilgrim: 'books',
  orthodoxprayerbook: 'books',
  ladderofdivineascent: 'books',
  woundedbylove: 'books',
  orthodoxchurch: 'books',
  pantocrator: 'icons',
  theotokosvladimir: 'icons',
  georgethetrophybearer: 'icons',
  holytrinityrublev: 'icons',
  stnicholasthewonderworker: 'icons',
  theotokoskazan: 'icons',
  iconofresurrection: 'icons',
  iconofnativity: 'icons',
  seraphimofsarov: 'icons',
  paisios: 'icons',
  mosestheblack: 'icons',
  iconoftransfiguration: 'icons',
  joyofallsorrow: 'icons',
  iconofcrucifixion: 'icons',
  archangelmichael: 'icons',
  prayerrope33: 'other',
  prayerrope100: 'other',
  incensebyzantine: 'other',
  charcoaltablets: 'other',
  woodencross: 'other',
  beeswaxcandles: 'other',
};

const getBreadcrumbLabel = (segment, index, pathSegments) => {
  if (pathSegments[0] === "product" && index === 1) {
    return productTitles[segment] || segment;
  }

  if (pathSegments[0] === "books" && index === 1) {
    return decodeURIComponent(segment); // for filter
  }

  const breadcrumbNameMap = {
    'books': 'Books',
    'icons': 'Icons',
    'other': 'Other Items',
    'product': 'Product',
  };

  return breadcrumbNameMap[segment] || segment;
};

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('subcategory');

  if (pathnames.length === 0) return null;

  return (
    <nav className="breadcrumbs">
    <Link to="/">Home</Link>
    {pathnames.map((segment, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = getBreadcrumbLabel(segment, index, pathnames);

        return (
            <span key={to}>
              {' / '}
              {(() => {
                if (
                  ['books','icons','other'].includes(pathnames[0]) &&
                  filter &&
                  index === 0
                ) {
                  // Clear filter: link back to bare category
                  return <Link to={to}>{label}</Link>;
                }
                if (isLast) {
                  return label;
                }
                if (segment === 'product') {
                  // Link to the real category page instead of '/product'
                  const productId = pathnames[1];
                  const category = productCategoryMap[productId] || 'other';
                  const categoryLabelMap = { books: 'Books', icons: 'Icons', other: 'Other Items' };
                  const categoryLabel = categoryLabelMap[category];
                  return <Link to={`/${category}`}>{categoryLabel}</Link>;
                }
                return <Link to={to}>{label}</Link>;
              })()}
            </span>
        );
    })}
    {filter && ['books', 'icons', 'other'].includes(pathnames[0]) && (
        <span> / {decodeURIComponent(filter)}</span>
    )}
    </nav>
  );
};

export default Breadcrumbs;