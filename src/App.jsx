
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Product from './components/Product';
import Review from './components/Review';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import Transaction from './components/Transaction';
import Order from './components/Order';
import FeedBack from './components/FeedBack';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Address from './components/Address'

if (!localStorage.getItem("cart2")) {
  localStorage.setItem("cart2", JSON.stringify([]));
}
if (!localStorage.getItem("deliveryAddress")) {
  localStorage.setItem("deliveryAddress", JSON.stringify([]));
}

function Layout({ children }) {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Product />} />
          <Route path="/review" element={<Review />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<Cart />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/transaction/:price/:quantity/:orderType" element={<Transaction />} />
          <Route path="/order-confirmation" element={<Order />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/address/:price" element={<Address></Address>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
