import React from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import './Breadcrumbs.css';


// Replace this with your real product map
const productTitles = {
  ladderofdivineascent: "The Ladder of Divine Ascent",
  studybible: "Orthodox Study Bible",
  pantocrator: "Icon of Christ Pantocrator",
  // ...add more
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
            {<Link to={to}>{label}</Link>}
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