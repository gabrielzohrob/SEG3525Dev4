import NavigationBar from './navbar.jsx';
import Breadcrumbs from './Breadcrumbs.jsx';
import { Outlet } from 'react-router-dom';
import { HashRouter, Routes, Route} from 'react-router-dom';

import Home from '../pages/home.jsx';
import Books from '../pages/books.jsx';
import Icons from '../pages/icons.jsx';
import Other from '../pages/other.jsx';
import Cart from '../pages/cart.jsx';
import ProductPage from '../pages/product.jsx'
import Checkout from '../pages/checkout.jsx'


export default function Router(){
    const Layout = () => {
        return(
            <>
                <NavigationBar />
                <Breadcrumbs />
                <Outlet />
            </>
        )
    }

    const BrowserRoutes = () => {

        return(
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/books" element={<Books />} />
                        <Route path="/icons" element={<Icons />} />
                        <Route path="/other" element={<Other />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/product/:id" element={<ProductPage />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Route>
                </Routes>
            </HashRouter>
        )
    }

    return(
        <BrowserRoutes />
    )
}