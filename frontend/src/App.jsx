import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import { StoreContext } from './Context/StoreContext';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { token, checkTokenExpiration } = useContext(StoreContext);

  // Check token expiration on app load
  useEffect(() => {
    if (!token) {
      setShowLogin(true); // Show login if no token
    } else {
      checkTokenExpiration(); // Check if token is expired
    }
  }, [token, checkTokenExpiration]);
  

  return (
    <Router>
      <ToastContainer />
      {/* Render the LoginPopUp inside Router to ensure proper behavior */}
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
